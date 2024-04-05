function renderStartPage() {
    //User is a guest before logging in
    if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify({
            "username": "Guest",
            "guest": true
        }))
    }

    // // swapStyleSheet("css/start.css");
    // document.querySelector("header").innerHTML = `
    //     <div class=image></div>
    // `;
    let main = document.querySelector("main");

    main.innerHTML = `
        <h2>Bron</h2>
        <p id=message></p>
        <button id="login" onclick="renderLoginPage()">Logga in</button>
        <button id="register" onclick="renderRegisterPage()">Skapa ett konto</button> 
    `;
}