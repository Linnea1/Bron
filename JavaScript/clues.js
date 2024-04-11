function RenderClues() {

    let user = JSON.parse(localStorage.getItem("user"));

    swapStyleSheet("clues.css");
    document.querySelector("main").innerHTML = `
        <div class="clues"></div>
    `;

    console.log(user)

    let main = body.querySelector("main");

    main.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    main.style.backgroundSize = "cover";

    CLUES.forEach(clue => {

        if (clueUnlocked(clue.id)) {
            let clueBox = document.createElement("div");
            document.querySelector(".clues").append(clueBox)
            clueBox.setAttribute("class", "clueBox unlocked")
            clueBox.innerHTML = `
            <p>${clue.title}</p>
            <div id ="cluePicture" style="background-image: url('${clue.image}')"></div>
            <p id="info">${clue.shortText}</p>
            `;
        } else {
            let clueBox = document.createElement("div");
            document.querySelector(".clues").append(clueBox)
            clueBox.setAttribute("class", "clueBox locked")
            clueBox.innerHTML = `
            <div class="overlay"></div>
            <p>Lås upp ledtråden</p>
            `;
        }
    });

    function clueUnlocked(clueId) {
        let isUnlocked = false;
        user.clues.forEach(clue => {

            if (clueId === clue) {
                isUnlocked = true;
            }
        });
        return isUnlocked;
    }

}