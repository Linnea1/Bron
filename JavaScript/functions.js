async function fetching(URL, method, body) {
    let response = await fetch(URL, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return response;
}



function basicHeader() {
    // let user = JSON.parse(localStorage.getItem("user"));

    document.querySelector("header").innerHTML = ` 
        <div id="profilePicture" class="icon"></div>
    `;

    let user = JSON.parse(localStorage.getItem("user"));
    document.querySelector("#profilePicture").style.backgroundImage = `url('${user.pfp}')`;

    document.querySelector("#profilePicture").addEventListener("click", e => {
        // newState();
        RenderUserPage();
    });

}

function swapStyleSheet(styleSheet) {
    document.getElementById("styles").setAttribute("href", styleSheet);
}


function popUp(prompt) { // pop up
    document.querySelector("#loading").classList.add("hidden");
    document.querySelector("#popUpWindow").innerHTML = `
         <p id="prompt"></p>
    `;

    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#prompt").textContent = prompt;

    let button = document.createElement("button");
    button.textContent = "OK";
    button.classList = "OK";
    document.querySelector("#popUpWindow").append(button);
    document.querySelector(".OK").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
    document.querySelector("#popUpBackground").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
}

function logout() {
    localStorage.clear();
    renderStartPage();
    location.reload();
}