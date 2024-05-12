
let main = document.querySelector("main");
let body = document.querySelector("body");
let user = JSON.parse(window.localStorage.getItem("user"));
let stopExecution=true;

if (localStorage.getItem("user")) {
    RenderOptions();
    // renderStartPage();
} else {
    renderStartPage();
}
