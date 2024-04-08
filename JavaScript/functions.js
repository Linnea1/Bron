async function fetching(URL, method, body) {
    let response = await fetch(URL, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return response;
}



function basicHeader() {
    let user = JSON.parse(localStorage.getItem("user"));

    document.querySelector("header").innerHTML = ` 
        <div id="profilePicture" class="icon"></div>
    `;

    document.querySelector("#profilePicture").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;

    document.querySelector("#profilePicture").addEventListener("click", e => {
        // newState();
        RenderUserPage(user);
    });

}

function swapStyleSheet(styleSheet) {
    document.getElementById("styles").setAttribute("href", styleSheet);
}