function renderLoginPage() {
    swapStyleSheet("css/login.css");
    let main = document.querySelector("main");
    main.innerHTML = `

        <h2 class="title">Bron</h2>
        <div>
            <div id="infoText">
                <h2> Logga in </h2>
            </div>

            <form id="loginForm">
                <label> Användarnamn</label>
                <input type=text id=username>
                <label> Lösenord</label>
                <input type=password id=password>
            </form>

            <p id=message></p>

            <div class="buttons">
                <button id="login">Logga in</button>
                <div id=register>Är du ny här? Registrera dig <span> här </span> </div>
            </div>
        </div>
    `;

    // go to register
    main.querySelector("#register").addEventListener("click", renderRegisterPage);

    let loginForm = main.querySelector("#loginForm");
    let username = main.querySelector("#username");
    let password = main.querySelector("#password");

    main.querySelector("#login").addEventListener("click", async function (event) {
        event.preventDefault();
        let errorMessage = main.querySelector("#message");

        let body = {
            username: username.value,
            password: password.value,
        };

        // trying to log in...
        try {
            let response = await fetching("api/login.php", "POST", body);
            let data = await response.json();

            data.password = password.value; // add password

            if (!response.ok) {
                errorMessage.innerHTML = `<span>${data.message}</span>.`; // error message
            } else {
                // add to local storage
                window.localStorage.setItem("user", JSON.stringify(data));
                user = data;
                // logged in! (adding function later)
                RenderIntro()
            }
        } catch (error) { // if something went wrong
            errorMessage.textContent = `Error: ${error.message}`;
        }
    });
}