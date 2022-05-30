const siteBackendUrl = `https://localhost:3000`;

document.addEventListener("DOMContentLoaded", init);

function init() {
  const postForm = document.querySelector("form");
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
console.log("hello");

function getPost() {}

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
    })
    .catch(console.warn);
}

function displayPost(p) {
  document.querySelector("#displayTitle").value = p.title;
  document.querySelector("#displayAuthor").value = p.author;
  document.querySelector("#displayBody").value = p.body;
  document.querySelector("#formWrapper").style.display = none;
  document.querySelector("#postWrapper").style.display = grid;
}
