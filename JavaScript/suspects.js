function RenderSuspects() {
    basicHeader()

    let main = body.querySelector("main");

    body.style.backgroundImage = `url('Bilder/istockphoto-1462731789-640x640.jpg')`;
    body.style.backgroundSize = "cover";

    let evenOrOdd = 0;

    main.innerHTML = `
        <div class="suspects"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
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
                <div id ="suspectPicture"></div>
                <div id ="NameAndAge"></div>
            `;
        } else {
            SuspectxBox.classList.add("even");
            SuspectxBox.querySelector("#PicNameAndAge").innerHTML = `
                <div id ="NameAndAge"></div>
                <div id ="suspectPicture"></div>
            `;
        }


        let pic = SuspectxBox.querySelector("#suspectPicture");
        pic.style.backgroundImage = `url('${clue.image}')`;
        pic.style.height = "105px";
        pic.style.width = "105px";
        pic.style.backgroundSize = "cover";
        pic.style.borderRadius = "50px";


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
