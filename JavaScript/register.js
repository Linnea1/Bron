function renderRegisterPage() {

    swapStyleSheet("css/register.css");

    main.innerHTML = `
    <h2 class="title">Bron</h2>
        <div id="infoText">
            <h2> Registrera </h2>
        </div>

        <form id="registerForm">
            <label> Email</label>
            <input type=text id=email>
            <label> Användarnamn</label>
            <input type=text id=username>
            <label> Lösenord</label>
            <input type=password id=password>
        </form>

        <p id=message></p>

        <div class="buttons">
            <button id="register" type=submit>Registrera</button>
            <div id="login"> Har du ett konto? Logga in  <span> här </span> </div>
        </div>

    `;

    let ButtonForLogin = main.querySelector("#login");
    ButtonForLogin.addEventListener("click", renderLoginPage);

    let RegisterButton = main.querySelector("#register");
    RegisterButton.addEventListener("click", async function (event) {
        event.preventDefault();
        let emailInput = main.querySelector("#email").value;
        let usernameInput = main.querySelector("#username").value;
        let passwordInput = main.querySelector("#password").value;
        let message = main.querySelector("#message");

        try {
            let body = {
                email: emailInput,
                username: usernameInput,
                password: passwordInput,

            };

            let response = await fetching("api/register.php", "POST", body);
            let data = await response.json();

            if (response.ok) {
                message.innerHTML = `The user ${data.username} was successfully added!`;
                user = data;
            } else {
                message.innerHTML = `<span>${data.message}</span>.`;
            }
        } catch (error) {
            message.textContent = `${error.message}`;
        }
    });
}