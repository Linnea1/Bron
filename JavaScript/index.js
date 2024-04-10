
// let user;
// //Stay on page if reload
// if (localStorage.getItem("state")) {
//     let view = JSON.parse(localStorage.getItem("state"));

//     state = view.state;
//     eval(view.function);
// }

let main = document.querySelector("main");
let body = document.querySelector("body");

if (localStorage.getItem("user")) {
    //RenderOptions();
    renderStartPage();
} else {
    renderStartPage();
}
