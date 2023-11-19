document.addEventListener("DOMContentLoaded", function(){

    const boardLength = 15;
    const boardLines = document.querySelectorAll(".board-line");
    const rollButton = document.getElementById("roll-button");
    const player1 = document.getElementById("player-1");
    const player2 = document.getElementById("player-2");

    const boardSize = 100;

    let playerPosition1={
        x:-1,
        y:0
    }
    let playerPosition2={
        x:-1,
        y:1
    }

    let nextPlayerLap=1;

  
    
    const diceList={
        1:"Avance 1",
        2:"Avance 2",
        3:"Avance 3",
        4:"Rejoue",
        5:"Change de côté",
        6:"Barque !",
    }
    
    function generateBoard(){
        boardLines.forEach((boardLine) =>{
            for (let i=0; i < boardLength+1; i++){
                const caseDiv = document.createElement("div");
                caseDiv.classList.add("case");
                boardLine.appendChild(caseDiv);
            }
        });
        colorPlank();
    }


    
    function colorPlank(){
        const line1 = document.getElementById("line-1");
        const line2 = document.getElementById("line-2");
        const casesLine1 = line1.querySelectorAll(".case");
        const casesLine2 = line2.querySelectorAll(".case");
    
        for (let i = 0; i < boardLength; i++){
            casesLine1[i].style.backgroundColor = "#E8AD67";
            casesLine2[i].style.backgroundColor = "#E8AD67";
        }
    }
    
    function getRandomDice (){
        let diceResult = Math.floor(Math.random()*6) + 1;
        let selectedValue = diceList[diceResult];
        console.log("Résultat du dé : " + selectedValue);
        return diceResult
    }

    function updateNextPlayerLap (){
        if (nextPlayerLap === 1){
            nextPlayerLap = 2;
        }
        else if (nextPlayerLap === 2){
            nextPlayerLap = 1;
        }
    }
    
    function updatePlayerPosition (diceValue){
        // 


        // Avance de 1
        if (diceValue === 1){
            playerPosition1.x += 1;
        }
        // Avance de 1
        if (diceValue === 2){
            playerPosition1.x += 2;
        }
        // Avance de 1
        if (diceValue === 3){
            playerPosition1.x += 3;
        }


        // Change GUI
        player1.style.left = (playerPosition1.x < 0 ? boardSize/2 : boardSize/2 + boardSize * playerPosition1.x).toString() + "px"; 
        player1.style.top = (boardSize/2).toString() + "px"; 

        player2.style.left = (playerPosition2.x < 0 ? boardSize/2 : boardSize/2 + boardSize * playerPosition2.x).toString() + "px"; 
        player2.style.top = (-boardSize/2).toString() + "px"; 
    }

    function updateLap() {
        let diceValue = getRandomDice();
        updatePlayerPosition(diceValue);

        updateNextPlayerLap();
    }

    generateBoard();
    updatePlayerPosition(0);
    rollButton.addEventListener("click", updateLap);
});