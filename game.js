var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Scene1]
};

let deck=[];
let player_hand=[];
let dealer_hand=[];

//will grab currency specified from local storage
let currency = localStorage.getItem("currencySymbol");

//Bet amount for player
let betAmount = 0;

//Current amount of money for player.
let cashAmount = 0;

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

//
let roundResultText;

let number_of_hits=0;


let userslot1;
let userslot2;
let dealerslot1;
let dealerslot2 ;
let userslot3;
let userslot4 ;
let dealerslot3;
let dealerslot4;
let userslot5;
let userslot6 ;
let dealerslot5;
let dealerslot6;
let userslot7 ;
let userslot8 ;
let dealerslot7 ;
let dealerslot8 ;
let userslot9 ;
let userslot10 ;
let dealerslot9 ;
let dealerslot10 ;
let userslot11 ;
let userslot12 ;
let dealerslot11 ;
let dealerslot12;

var game = new Phaser.Game(config);

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


    