(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const siteBackendUrl = `https://localhost:3000`;

document.addEventListener("DOMContentLoaded", init);

function init() {
    const postForm = document.querySelector("form")
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try{
            if(!e.target[0].value || !e.target[1].value || !e.target[2].value){
                throw new Error("The post contains no text content")
            } else{
                createPost(e.target[0].value, e.target[1].value, e.target[2].value);
            }
        } catch(err){
            console.error(err)
        }
    })
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
        .then(data => {
            getAllPosts(data)
        })
        .catch(console.warn);
}

function displayPost(p){
    document.querySelector('#displayTitle').value = p.title;
    document.querySelector('#displayAuthor').value = p.author;
    document.querySelector('#displayBody').value = p.body;
    document.querySelector('#formWrapper').style.display= none;
    document.querySelector('#postWrapper').style.display= grid;
}

},{}]},{},[1]);
