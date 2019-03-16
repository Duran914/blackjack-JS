// deck of cards object 
let deck = {
    "playingCards/2_of_clubs.png": 2, "playingCards/2_of_diamonds.png": 2, "playingCards/2_of_hearts.png": 2, "playingCards/2_of_spades.png":2,
    "playingCards/3_of_clubs.png": 3, "playingCards/3_of_diamonds.png": 3, "playingCards/3_of_hearts.png": 3, "playingCards/3_of_spades.png": 3,
    "playingCards/4_of_clubs.png": 4, "playingCards/4_of_diamonds.png": 4, "playingCards/4_of_hearts.png": 4, "playingCards/4_of_spades.png": 4,
    "playingCards/5_of_clubs.png": 5, "playingCards/5_of_diamonds.png": 5, "playingCards/5_of_hearts.png": 5, "playingCards/5_of_spades.png": 5,
    "playingCards/6_of_clubs.png": 6, "playingCards/6_of_diamonds.png": 6, "playingCards/6_of_hearts.png": 6, "playingCards/6_of_spades.png": 6,
    "playingCards/7_of_clubs.png": 7, "playingCards/7_of_diamonds.png": 7, "playingCards/7_of_hearts.png": 7, "playingCards/7_of_spades.png": 7,
    "playingCards/8_of_clubs.png": 8, "playingCards/8_of_diamonds.png": 8, "playingCards/8_of_hearts.png": 8, "playingCards/8_of_spades.png": 8,
    "playingCards/9_of_clubs.png": 9, "playingCards/9_of_diamonds.png": 9, "playingCards/9_of_hearts.png": 9, "playingCards/9_of_spades.png": 9,
    "playingCards/10_of_clubs.png": 10, "playingCards/10_of_diamonds.png": 10, "playingCards/10_of_hearts.png": 10, "playingCards/10_of_spades.png": 10,
    "playingCards/jack_of_clubs.png": 10, "playingCards/jack_of_diamonds.png": 10, "playingCards/jack_of_hearts.png": 10, "playingCards/jack_of_spades.png": 10,
    "playingCards/queen_of_clubs.png": 10, "playingCards/queen_of_diamonds.png": 10, "playingCards/queen_of_hearts.png": 10, "playingCards/queen_of_spades.png": 10,
    "playingCards/king_of_clubs.png": 10, "playingCards/king_of_diamonds.png": 10, "playingCards/king_of_hearts.png": 10, "playingCards/king_of_spades.png": 10,
    "playingCards/ace_of_clubs.png": 0, "playingCards/ace_of_diamonds.png": 0, "playingCards/ace_of_hearts.png": 0, "playingCards/ace_of_spades.png": 0 
}

// Globals 
let displayCards = document.querySelector('#cards-delt'); // player cards 
let dealerDisplayCards = document.querySelector('#dealer-cards-delt') // dealer cards
let cardIcons = Object.keys(deck); // array of deck keys
let playerHand = [] // player hand
let dealerHand = [] // dealer hand
let playerSum = 0; // player sum of cards
let dealerSum = 0; // dealer sum of cards
let outcome = document.querySelector("#game-outcome"); // game outcome 
let aceValues = 0;  // ace(s) values

// deals random card & checks for duplicates
function dealCard(){
    let nextCard = cardIcons[[Math.floor(Math.random()*cardIcons.length)]];
        if(playerHand.includes(nextCard) || dealerHand.includes(nextCard)){
        console.log(nextCard);
        console.log("Duplicate Card!"); 
        nextCard = cardIcons[[Math.floor(Math.random()*cardIcons.length)]] 
        console.log("Card from IF loop " + nextCard);
            while (playerHand.includes(nextCard) || dealerHand.includes(nextCard)) {
                nextCard = cardIcons[[Math.floor(Math.random()*cardIcons.length)]] 
            console.log("Card from WHILE loop " + nextCard); 
            }
        }

        if(nextCard == "playingCards/ace_of_clubs.png" || nextCard == "playingCards/ace_of_spades.png" || nextCard == "playingCards/ace_of_diamonds.png" || nextCard == "playingCards/ace_of_hearts.png"){
            console.log("ACE CARD");
            // templete with ace input
            displayCards.innerHTML += `
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="Deltcards" style="position: absolute">
                    <img src="${nextCard}" height="225" width="200">
                        <div class='aceCard'>
                            <span>What ace value?</span>
                            <input class="form-control" id="ace-value" placeholder="1 or 11">
                            <button class="btn btn-sm btn-success aceCardSubmit" onclick="getAceValue()">Submit</button>
                        </div>
                </div>
            </div>`;
            // disables game buttons until ace value is given
            document.querySelector("#deal-card-btn").disabled = true;
            document.querySelector("#stand-btn").disabled = true;
     }
     else{
        //  templete for card
    displayCards.innerHTML += `
    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="Deltcards DeltcardsAn">
            <img src="${nextCard}" height="225" width="200">
        </div>
    </div>`;
     }
playerHand.push(nextCard);
playerCardSum();
checkBust();
}

// Deals initial cards to player
function dealCards(){
    if(playerHand.length < 2){
        for (let i = 0; i < 2; i++) {
            dealCard()  
        }
    }
    else if (playerHand.length >= 2) {
        // deals single card
        dealCard()
    } 
console.log(playerHand);
}

dealCards();

// Deals dealer cards
function dealDealercards(){
    for (let i = 0; i < 2; i++) {
    let nextCard = cardIcons[[Math.floor(Math.random()*cardIcons.length)]];
        if(playerHand.includes(nextCard) || dealerHand.includes(nextCard)){
        console.log(nextCard);
        console.log("Duplicate Card!"); 
        nextCard = cardIcons[[Math.floor(Math.random()*cardIcons.length)]] 
        console.log("Card from IF loop " + nextCard);
            while (playerHand.includes(nextCard) || dealerHand.includes(nextCard)) {
                nextCard = cardIcons[[Math.floor(Math.random()*cardIcons.length)]] 
            console.log("Card from WHILE loop " + nextCard); 
            }
        }
    dealerHand.push(nextCard)
}
    dealerCardSum();

    dealerDisplayCards.innerHTML =`
        <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="Deltcards">
            <img src="playingCards/cardBack.png" height="228" width="200">
        </div>
    </div>
    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="Deltcards">
            <img src=${dealerHand[1]} height="225" width="200">
        </div>
    </div>`;
}
dealDealercards();
setDealAceValue()

// GENERATE SUMS FOR DEALER AND PLAYER

function playerCardSum(){
    playerSum = 0;
    for (const card in playerHand) {
        playerSum += deck[playerHand[card]]   
    }
    if (aceValues > 0) {
        playerSum += aceValues
    }
    console.log("Player cards Sum: " + playerSum);
}

function dealerCardSum(){
    dealerSum = 0;
    for (const card in dealerHand) {
        dealerSum += deck[dealerHand[card]]   
    }
    console.log("Dealer cards Sum: " + dealerSum);
}

// Reveal dealer card when "stand" button is clicked
function revealDealerCards(){
    dealerDisplayCards.innerHTML =`
    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="Deltcards">
           <h1><img src="${dealerHand[0]}" height="250" width="250"></h1>
        </div>
    </div>
    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
        <div class="Deltcards">
            <h1><img src=${dealerHand[1]} height="250" width="250"></h1>
        </div>
    </div>`;
}

// Check bust(playerSum greater than 21)
function checkBust(){
    if(playerSum > 21){
        outcome.innerHTML = "Bust! You Lose!";
        resetGame();
    }
}

// Determine winner 
function gameDecison(){
    revealDealerCards();
    if (playerSum > dealerSum && playerSum <= 21) {
        outcome.innerHTML = "You Win!";
    }
    else if(playerSum < dealerSum && dealerSum <= 21){
        outcome.innerHTML = "You Lose!";
    }
    else{
        outcome.innerHTML = "Its a tie!";
    }
    resetGame()
}

function resetGame(){
        // Templete for reset button
        document.querySelector("#game-buttons").innerHTML = `
        <div class="col-md-4">
            <button class="btn btn-primary" onclick="location.reload()">Play Again?</button>
        </div>`;
}

// determines ace value for dealer
function setDealAceValue(){
    console.log(dealerHand);
    
    if(dealerHand.includes("playingCards/ace_of_clubs.png") || dealerHand.includes("playingCards/ace_of_spades.png") || dealerHand.includes("playingCards/ace_of_diamonds.png") || dealerHand.includes("playingCards/ace_of_hearts.png")){
        if (dealerSum == 0) {
            dealerSum += 2
        }
        else{
            if (dealerSum > 10) {
                dealerSum += 1
            }else{
                dealerSum += 11
            }       
        console.log("dealer Sum with ace value added: " + dealerSum);
        }
    }
}

function getAceValue() {
    let aceValue = document.querySelector("#ace-value").value;
    if (aceValue == 1 || aceValue == 11) {
        // playerSum += Number(aceValue);
        aceValues += Number(aceValue)
        playerCardSum(); // set player sum when ace card is drawn 
        console.log("Player sum with entered Ace value:" + playerSum);
        document.querySelector(".aceCard").remove();
        document.querySelector("#deal-card-btn").disabled = false;
        document.querySelector("#stand-btn").disabled = false;
    }
    else{
        let banner = document.createElement("div");
        banner.className = "warningBanner"
        banner.innerHTML = 'Please enter 1 or 11!';
        document.querySelector(".aceCard").appendChild(banner);

    // remove banner after 3s
    setTimeout(() => {
        document.querySelector('.warningBanner').remove();
        }, 3000);
    }
}