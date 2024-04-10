function RenderClues() {
    document.querySelector("main").innerHTML = `
    <div class="clues"></div>
    <nav class="sticky-nav">${stickyNav()}</nav>
    `;

    let main = body.querySelector("main");

    main.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    main.style.backgroundSize = "cover";

   CLUES.forEach(clue => {
       
        if(clueUnlocked(clue.id)){
            let clueBox = document.createElement("div");
            document.querySelector(".clues").append(clueBox)
            clueBox.setAttribute("class", "clueBox unlocked")
            clueBox.innerHTML = `
            <p>${clue.title}</p>
            <p id="info">${clue.text}</p>
            <div id ="cluePicture"></div>
            
            `;
        }else{
            let clueBox = document.createElement("div");
            document.querySelector(".clues").append(clueBox)
            clueBox.setAttribute("class", "clueBox locked")
            clueBox.innerHTML = `
            <div class="overlay"></div>
            <p>Lås upp ledtråden</p>
            `;
        }
   });

    function clueUnlocked(clueId){
        user.clues.forEach(clue => {
            if(clueId===clue){
                return true
            }
        });
    }
    
}