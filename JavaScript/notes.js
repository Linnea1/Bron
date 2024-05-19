
async function RenderNotes() {

    main.classList.add("slide-up");

    let user = JSON.parse(localStorage.getItem("user"));

    stopExecution = true;
    basicHeader()
    swapStyleSheet("css/notes.css");

    resetButtons()

    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;
    document.querySelector("#notes").style.opacity = 0;
    document.querySelector("main").style.height = "100%";

    let resourse = await fetching(`api/functions.php?user=${user.username}`);
    let firstresponse = await resourse.json()


    main.innerHTML = `
        <div class="bigBox">
            <h1> ANTECKNINGAR </h1>
            <p id="infoText"></p>
            <div id="noteBox"></div>
            <textarea id="story" name="story" rows="auto" cols="auto"></textarea>
            <button> SPARA </button>
        </div>
    `;

    console.log(firstresponse.notes);
    if (firstresponse.notes !== "") {
        RenderInsideNotes(firstresponse)
    }

    if (firstresponse.notes.length === 0) {
        document.querySelector("#infoText").textContent = "Här kan du samla alla dina tankar och anteckningar. Inga anteckningar ännu."
    } else {
        document.querySelector("#infoText").textContent = ""
    }

    main.querySelector("button").addEventListener("click", async (e) => {

        let text = main.querySelector("textarea").value;

        const date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (minute < 10) {
            minute = `0${minute}`;
        }

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${day}/${month}/${year}`;
        let timeAndDate = `${currentDate}, ${hour}:${minute}`;

        if (text !== "") {

            let newNote = {
                user: user.username,
                content: {
                    timeDate: timeAndDate,
                    content: text,
                    id: 0
                }
            }

            let response = await fetching("api/functions.php", "POST", newNote);
            let resourse = await response.json();

            if (response.ok) {
                let updatedResource = await fetching(`api/functions.php?user=${user.username}`);
                let updatedResponse = await updatedResource.json();
                document.getElementById("noteBox").innerHTML = "";
                RenderInsideNotes(updatedResponse);

                if (user.notes.length === 0) {
                    document.querySelector("#infoText").textContent = ""
                }

                main.querySelector("textarea").value = "";


                let localUser = {
                    "username": updatedResponse.username,
                    "email": updatedResponse.email,
                    "pfp": updatedResponse.pfp,
                    "firstTime": updatedResponse.firstTime,
                    "done": updatedResponse.done,
                    "userId": updatedResponse.userId,
                    "notes": updatedResponse.notes,
                    "clues": updatedResponse.clues
                }

                window.localStorage.setItem("user", JSON.stringify(localUser));

                if (updatedResponse.notes.length === 0) {
                    document.querySelector("#infoText").textContent = "Här kan du samla alla dina tankar och anteckningar. Inga anteckningar ännu."
                } else {
                    document.querySelector("#infoText").textContent = ""
                }
            }
        }

    })

}



async function RenderInsideNotes(response) {

    let user = JSON.parse(localStorage.getItem("user"));

    if (user.notes.length == 0) {
        document.querySelector("#infoText").textContent = "Här kan du samla alla dina tankar och anteckningar. Inga anteckningar ännu."
    }
    console.log(user.notes);

    for (const note of response.notes) {

        let divdom = document.createElement("div");
        document.getElementById("noteBox").append(divdom)
        divdom.classList.add("note")
        divdom.dataset.id = note.id;
        divdom.innerHTML = `
            <div id="text"></div>
            <img src="Bilder/remove.png">
        `;

        for (const index in note) {
            let p = document.createElement("p");
            divdom.querySelector("#text").append(p);
            switch (index) {
                case "content":
                    p.style.fontWeight = "normal";
                    p.style.margin = "0px";
                    break;
                case "timeDate":
                    p.style.fontWeight = "bold";
                    p.style.margin = "0px 0px 5px 0px";
                    break;
                case "id":
                    p.remove()
                    break;
            }

            p.innerHTML = `${note[index]}`;
        }

        divdom.querySelector("img").addEventListener("click", async e => {
            let id = JSON.parse(e.target.parentNode.dataset.id)
            let chosenNote = {
                user: user.username,
                id: id
            }

            let response = await fetching("api/functions.php", "DELETE", chosenNote);
            let resourse = await response.json();

            if (response.ok) {
                let updatedResource = await fetching(`api/functions.php?user=${user.username}`);
                let updatedResponse = await updatedResource.json();
                document.getElementById("noteBox").innerHTML = "";
                RenderInsideNotes(updatedResponse);
                console.log(updatedResponse);

                main.querySelector("textarea").value = "";

                let localUser = {
                    "username": updatedResponse.username,
                    "email": updatedResponse.email,
                    "pfp": updatedResponse.pfp,
                    "firstTime": updatedResponse.firstTime,
                    "done": updatedResponse.done,
                    "userId": updatedResponse.userId,
                    "notes": updatedResponse.notes,
                    "clues": updatedResponse.clues
                }

                window.localStorage.setItem("user", JSON.stringify(localUser));

                if (updatedResponse.notes.length === 0) {
                    document.querySelector("#infoText").textContent = "Här kan du samla alla dina tankar och anteckningar. Inga anteckningar ännu."
                } else {
                    document.querySelector("#infoText").textContent = ""
                }
            }
        })
    }
}