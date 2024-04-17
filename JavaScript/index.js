
let main = document.querySelector("main");
let body = document.querySelector("body");
let user = JSON.parse(window.localStorage.getItem("user"));

if (localStorage.getItem("user")) {
    RenderOptions();
    // renderStartPage();
} else {
    renderStartPage();
}
