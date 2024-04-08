async function renderHomePage() {
    let user = JSON.parse(localStorage.getItem("user"));
    let username = user.username
   
    RenderSuspects()
}


function RenderSuspects() {
    document.querySelector("main").innerHTML = `
        <div class="suspects"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `;
    SUSPECTS.forEach(clue => {
        let SuspectxBox = document.createElement("div");
        document.querySelector(".suspects").append(SuspectxBox)
        SuspectxBox.setAttribute("id", "suspectBox")
        SuspectxBox.innerHTML = `
            <div id ="suspectPicture"></div>
            <div id="info"></div>
        `;

        console.log(clue.image);

        let pic = SuspectxBox.querySelector("#suspectPicture");
        pic.style.backgroundImage = `url('${clue.image}')`;
        pic.style.height = "50px";
        pic.style.width = "50px";
        pic.style.backgroundSize = "contain";

        for (const index in clue) {

            if (index === "suspectId" || index === "image" || index === "guilty") {
                continue;
            }

            console.log(index);
            if (index === "name") {
                SuspectxBox.querySelector("#info").innerHTML += `
                    <h2 id="${index}">${clue[index]} </h2>
                `;

            }
            SuspectxBox.querySelector("#info").innerHTML += `
             <p id="${index}">${clue[index]} </p>
            `;

            if (index === "age") {
                SuspectxBox.querySelector("#age").innerHTML = `
                    <p id="${index}">${clue[index]} år </p>
                `;
            }
        }

    });

    document
    .querySelector(".nav-home")
    .addEventListener("click", () => renderHomePage());
    document
    .querySelector(".nav-suspects")
    .addEventListener("click", () => RenderSuspects());
    document
    .querySelector(".nav-clues")
    .addEventListener("click", () => RenderClues());
   
}

