function RenderClues() {
    document.querySelector("main").innerHTML = `
    <div class="clues"></div>
    <nav class="sticky-nav">${stickyNav()}</nav>
    `;

   CLUES.forEach(clue => {
        let clueBox = document.createElement("div");
        document.querySelector(".clues").append(clueBox)
        clueBox.setAttribute("id", "clueBox")
        clueBox.innerHTML = `
            <p>${clue.title}</p>
            <p id="info">${clue.text}</p>
            <div id ="cluePicture"></div>
            
        `;
   });
    
    function clueUnlocked(){

    }
    
}