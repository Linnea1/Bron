function renderStartPage() {

    swapStyleSheet("css/startPage.css");

    body.style.backgroundImage = `url('Bilder/firstBackground.png')`;
    body.style.backgroundSize = "cover";

    let main = document.querySelector("main");

    main.innerHTML = `

        <h2 class="title">Bron</h2>
        <div>
            <div id="infoText">
                <h2> Hjälp! </h2>
                <h3> Är du redo att hjälpa Saga att lösa mordet vid Casino Cosmopol? </h3>
                </div>
            <p id=message></p>
            <div class="buttons">
                <button id="login" onclick="renderLoginPage()">Logga in</button>
                <button id="register" onclick="renderRegisterPage()">Skapa ett konto</button> 
            </div>
        </div>
    `;
}