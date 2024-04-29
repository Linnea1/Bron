function RenderSuspects() {
    basicHeader()

    let user = JSON.parse(localStorage.getItem("user"));

    if (user.pfp !== "") {
        document.querySelector("#profilePicture").style.backgroundImage = `url('${user.pfp}')`;
    } else {
        document.querySelector("#profilePicture").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;
    }

    body.style.backgroundImage = `url('Bilder/istockphoto-1462731789-640x640.jpg')`;
    body.style.backgroundSize = "cover";

    let evenOrOdd = 0;

    main.innerHTML = `
        <h1>Misstänkta</h1>
        <div class="suspects"></div>
    `;

    SUSPECTS.forEach(clue => {
        let SuspectxBox = document.createElement("div");
        document.querySelector(".suspects").append(SuspectxBox)
        SuspectxBox.setAttribute("id", "suspectBox")
        SuspectxBox.innerHTML = `
            <div id="info">
                <div id ="PicNameAndAge">
                </div>
                <div id ="text"></div>
            </div>
        `;

        evenOrOdd++
        if (evenOrOdd %= 2) {
            SuspectxBox.classList.add("odd");
            SuspectxBox.querySelector("#PicNameAndAge").innerHTML = `
                <p id ="suspectPicture"></p>
                <div id ="NameAndAge"></div>
            `;
        } else {
            SuspectxBox.classList.add("even");
            SuspectxBox.querySelector("#PicNameAndAge").innerHTML = `
                <p id ="NameAndAge"></p>
                <div id ="suspectPicture"></div>
            `;
        }

        let pic = SuspectxBox.querySelector("#suspectPicture");
        pic.style.backgroundImage = `url('${clue.image}')`;
        pic.style.height = "105px";
        pic.style.width = "105px";
        pic.style.backgroundSize = "cover";
        pic.style.borderRadius = "50%";

        for (const index in clue) {
            if (index === "suspectId" || index === "image" || index === "guilty") {
                continue;
            }

            switch (index) {
                case "name":
                    SuspectxBox.querySelector("#NameAndAge").innerHTML += `
                        <h2 id="${index}">${clue[index]}, </h2>
                    `;
                    break;

                case "age":
                    SuspectxBox.querySelector("#NameAndAge").textContent += `
                        ${clue[index]} år
                    `;
                    break;

                case "text":
                    SuspectxBox.querySelector("#text").innerHTML += `
                    <p id="${index}">${clue[index]} </p>
                    `;
                    break;
            }

        }

    });
    resetButtons()
    document.querySelector(".fa-person").classList.add("current-page");
    document.querySelector(".text-suspects").classList.add("current-page");
}
