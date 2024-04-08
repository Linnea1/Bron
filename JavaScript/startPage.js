function renderStartPage() {
    let main = document.querySelector("main");

    main.innerHTML = `
        <h2>Bron</h2>
        <p id=message></p>
        <button id="login" onclick="renderLoginPage()">Logga in</button>
        <button id="register" onclick="renderRegisterPage()">Skapa ett konto</button> 
    `;
}