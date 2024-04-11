
let main = document.querySelector("main");
let body = document.querySelector("body");

if (localStorage.getItem("user")) {
    RenderOptions();
    // renderStartPage();
} else {
    renderStartPage();
}
