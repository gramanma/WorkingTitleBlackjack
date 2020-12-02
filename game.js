var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Scene1]
};

let deck=[];

//will grab currency specified from local storage
let currency = localStorage.getItem("currencySymbol");

//Bet amount for player
let betAmount = 10;
let betLabel = betAmount


//Current amount of money for player.
let cashAmount = 100;
let cashLabel = cashAmount


//Have the cards been dealt?
let cardsDealt = false;

//Value of the cards that the dealer and user have + initialiazation.
var userCardValue = 0;
var dealerCardValue = 0;

//Create empty arrays for the hands of the user and the dealer.
let userHand = [];
let dealerHand = [];

//so we can access buttons at a file level
let stayButton;
let hitButton;
let dealButton;
let raiseBetButton;
let lowerBetButton;

//
let roundResultText;

//used for UI
let userCardSlots = [];
let dealerCardSlots = [];

var game = new Phaser.Game(config);

 /**
     * @author morganaj (morganaj@mail.uc.edu).
     * @summary creates array of cards
     */
function freshDeck() {
    //setup deck array
    var suits = ["C", "D", "H", "S"];
    var pips = ["2" ,"3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
    for(x = 0; x < pips.length; x++){
        for(i = 0; i < suits.length; i++){
            deck.push(pips[x] + suits[i]);
        }
    }
}
 /**
     * @author morganaj (morganaj@mail.uc.edu).
     * @summary randomizes order of cards in deck array
     */
function shuffleDeck(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
 
function  enterButtonHoverState(button){
    button.setScale(.8);
}

 function enterButtonRestState(button){
    button.setScale(.6);
 }

 function  draw(array) {
    var selectedIndex = array.shift(); //Removed first element in array and selects it.
    console.log("Drawn Card: " + selectedIndex); //Log the drawn card.
    return selectedIndex;
}





    