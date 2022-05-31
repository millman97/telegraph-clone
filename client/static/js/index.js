const siteBackendUrl = `http://localhost:3000`;

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
  fetch(`${siteBackendUrl}/${id}`)
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
      let postData = Object.values(data)[0].toString().replace('(', '').replace(')', '').split(',');
      window.location.href = `${window.location.href}#${postData[0]}`;
      window.location.reload();
    })
    .catch(console.warn);
}

function displayPost(p) {
  document.querySelector("#displayTitle").textContent = p.title;
  document.querySelector("#displayAuthor").textContent = p.author;
  document.querySelector("#displayBody").textContent = p.body;
  document.querySelector("#postWrapper").style.display = 'grid';
}
