const siteBackendUrl = `https://localhost:3000`;

document.addEventListener("DOMContentLoaded", init);

function init() {
  let urlArray = window.location.href.split("#");
  if (urlArray.length > 1) {
    getPost(parseInt(urlArray[1]));
  } else {
    addPostForm();
  }
}

function addPostForm() {
  const postForm = document.querySelector("form");
  postForm.classList.remove("hidden");
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
        throw new Error("The post contains no text content");
      } else {
        createPost(e.target[0].value, e.target[1].value, e.target[2].value);
      }
    } catch (err) {
      console.error(err);
    }
  });
}

function getPost(id) {
  document.querySelector("#postWrapper").classList.remove("hidden");
  fetch(`${siteBackendUrl}#${id}`)
    .then((r) => r.json())
    .then((data) => {
      displayPost(data);
    });
}

function createPost(title, author, body) {
  let postData = {
    title: title,
    author: author,
    body: body,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${siteBackendUrl}`, options)
    .then((r) => r.json())
    .then((data) => {
      displayPost(data);
      window.location.href = `${window.location.href}#${data.id}`;
    })
    .catch(console.warn);
}

function displayPost(p) {
  document.querySelector("#displayTitle").value = p.title;
  document.querySelector("#displayAuthor").value = p.author;
  document.querySelector("#displayBody").value = p.body;

  document.querySelector("#postWrapper").style.display = grid;
}
