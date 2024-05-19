function RenderSuspects(value) {
    basicHeader()
    stopExecution = true;
    document.querySelector("#notes").style.opacity = 1;
    let user = JSON.parse(localStorage.getItem("user"));
    document.querySelector("main").style.height = "84vh";

    if (user.pfp !== "") {
        document.querySelector("#profilePicture").style.backgroundImage = `url('${user.pfp}')`;
    } else {
        document.querySelector("#profilePicture").style.backgroundImage = `url('Bilder/userIconPic.jpg')`;
    }
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;

    let evenOrOdd = 0;

    if (value) {

        main.classList.add("slide-left");
        setTimeout(() => {

            main.innerHTML = `
                <h1>MISSTÄNKTA</h1>
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
                        <div id ="NameAndAge">
                            <p id="name"></p>
                            <p id="age"></p>
                            <p id="relationship"></p>
                            <p id="security"></p>
                        </div>
                    `;
                } else {
                    SuspectxBox.classList.add("even");
                    SuspectxBox.querySelector("#PicNameAndAge").innerHTML = `
                        <div id ="NameAndAge">
                            <p id="name"></p>
                            <p id="age"></p>
                            <p id="relationship"></p>
                            <p id="security"></p>
                        </div>
                        <p id ="suspectPicture"></p>
                    `;
                }

                let pic = SuspectxBox.querySelector("#suspectPicture");
                pic.style.backgroundImage = `url('${clue.image}')`;
                pic.style.height = "105px";
                pic.style.width = "105px";
                pic.style.backgroundSize = "cover";
                pic.style.borderRadius = "8%";

                for (const index in clue) {
                    if (index === "suspectId" || index === "image" || index === "guilty") {
                        continue;
                    }

                    switch (index) {
                        case "name":
                            SuspectxBox.querySelector("#name").innerHTML += `
                                <h2 id="${index}">${clue[index]} </h2>
                             `;
                            break;

                        case "age":
                            SuspectxBox.querySelector("#age").innerHTML += `
                               <span> Ålder: </span> ${clue[index]}
                            `;
                            break;

                        case "text":
                            SuspectxBox.querySelector("#text").innerHTML += `
                                <p id="${index}">${clue[index]} </p>
                            `;
                            break;
                    }


                }
                SuspectxBox.querySelector("#security").innerHTML += ` <span> Pers.nr: </span> ${clue.securityNumber}`;
                SuspectxBox.querySelector("#relationship").innerHTML += `<span> Status: </span> ${clue.relationship}`;

            });

            main.classList.remove("slide-left");

        }, 300);
    } else {

        main.innerHTML = `
            <h1>MISSTÄNKTA</h1>
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
                        <div id ="NameAndAge">
                            <p id="name"></p>
                            <p id="age"></p>
                            <p id="relationship"></p>
                            <p id="security"></p>
                        </div>
                    `;
            } else {
                SuspectxBox.classList.add("even");
                SuspectxBox.querySelector("#PicNameAndAge").innerHTML = `
                        <div id ="NameAndAge">
                            <p id="name"></p>
                            <p id="age"></p>
                            <p id="relationship"></p>
                            <p id="security"></p>
                        </div>
                        <p id ="suspectPicture"></p>
                    `;
            }
            let pic = SuspectxBox.querySelector("#suspectPicture");
            pic.style.backgroundImage = `url('${clue.image}')`;
            pic.style.height = "105px";
            pic.style.width = "105px";
            pic.style.backgroundSize = "cover";
            pic.style.borderRadius = "8%";

            for (const index in clue) {
                if (index === "suspectId" || index === "image" || index === "guilty") {
                    continue;
                }

                switch (index) {
                    case "name":
                        SuspectxBox.querySelector("#name").innerHTML += `
                            <h2 id="${index}">${clue[index]} </h2>
                         `;
                        break;

                    case "age":
                        SuspectxBox.querySelector("#age").innerHTML += `
                           <span> Ålder: </span> ${clue[index]}
                        `;
                        break;

                    case "text":
                        SuspectxBox.querySelector("#text").innerHTML += `
                            <p id="${index}">${clue[index]} </p>
                        `;
                        break;
                }


            }
            SuspectxBox.querySelector("#security").innerHTML += ` <span> Pers.nr: </span> ${clue.securityNumber}`;
            SuspectxBox.querySelector("#relationship").innerHTML += `<span> Status: </span> ${clue.relationship}`;

        });
    }
    resetButtons()
    document.querySelector(".fa-person").classList.add("current-page");
    document.querySelector(".text-suspects").classList.add("current-page");
}
