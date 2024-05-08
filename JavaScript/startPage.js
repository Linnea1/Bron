function renderStartPage() {

    swapStyleSheet("css/startPage.css");
    document.querySelector(".wrapper").style.backgroundColor = "none";
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/bluredBackground.png')`;

    body.style.backgroundSize = "cover";
    document.querySelector(".sticky-nav").style.opacity = 0;
    document.querySelector("#notes").style.opacity = 0;
    document.querySelector(".wrapper").style.height = "100vh";
    document.querySelector(".wrapper").style.paddingBottom = "0px";
    document.querySelector(".sticky-nav").style.height = "0px";

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