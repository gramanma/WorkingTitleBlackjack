var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
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

var game = new Phaser.Game(config);

    function preload () {

        
        this.load.image('tabletop', 'assets/tabletop.png');
        this.load.image('cardback', 'assets/redback.png');
        this.load.image('hitButton','assets/hit_button.png');
        this.load.image('stayButton','assets/stay_button.png');
        freshDeck();
        deck.forEach(element => {
            this.load.image(element, 'assets/' + element + '.png');
        });

        deck = shuffleDeck(deck);
     

        //Give the player a starting cash amount;
        cashAmount = 100;

        //temporary testing function  feel free to delete or remove
       setTimeout(function(){simulateDealing();},4000);
      }
    

    function create() {
        this.add.image(400, 300, 'tabletop');
        this.add.image(120, 150, 'cardback');

        //TODO: Add buttons for raising and lowering the bet.

        hitButton = this.add.image(730, 450, 'hitButton').setScale(.6);
        //will have to set Interactive after hand is dealt and the buttons should be enabled
        hitButton.on('pointerdown', () => hitClick())
        .on('pointerout', () => enterButtonRestState(hitButton))
        .on('pointerover', () => enterButtonHoverState(hitButton))
        .alpha = 0.2;
        //properties will be changed after hand dealt
        //will have to set back to these values when buttons are disabled

        stayButton = this.add.image(730, 520, 'stayButton').setScale(.6);
         //will have to set Interactive after hand is dealt and the buttons should be enabled
        stayButton.on('pointerdown', () => stayClick())
        .on('pointerout', () => enterButtonRestState(stayButton))
        .on('pointerover', () => enterButtonHoverState(stayButton))
        .alpha = 0.2;
        //properties will be changed after hand dealt
        //will have to set back to these values when buttons are disabled


       
       
       
        // this.input.mouse.disableContextMenu();

        // this.input.on('pointerup', function (pointer) {

        //     if (pointer.leftButtonReleased())
        //     {
               
        //     }
        // }

      //  deck.forEach(element =>{
       // console.log(element);
      //  });
    //    this.add.image(140, 170, '2C');
     //   this.add.image(140, 370, '2D');
    }

    function update () {
        var pointer = this.input.activePointer;
    }

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

    //temporary testing function feel free to replace
    function simulateDealing(){
        deal(deck);
        console.log('Activating Buttons');
        hitButton.setInteractive({useHandCursor: true});
        hitButton.clearAlpha();
        stayButton.setInteractive({useHandCursor: true});
        stayButton.clearAlpha();
    }

    //Draw a card from the array and remove it after it is selected.
    function draw(array) {
        var selectedIndex = array.shift(); //Removed first element in array and selects it.
        console.log("Drawn Card: " + selectedIndex); //Log the drawn card.
        return selectedIndex;
    }

    //Deal 2 cards from the deck to player and dealer.
    function deal(array) {
        
        //Selects four cards the same way they would come off of a deck.
        card1 = array.shift();
        card2 = array.shift();
        card3 = array.shift();
        card4 = array.shift();

        //Push alternating cards to the user hand;
        userHand.push(card1);
        userHand.push(card3);

        //Push alternating cards to the dealer hand.
        dealerHand.push(card2);
        dealerHand.push(card4);

        console.log("User hand:" + userHand);
        console.log("Dealer hand: " + dealerHand);
    }

    //Handles the 'hit' input on button click
    function hitClick(){
       //in progress
        //console.log(hitButton.height);
    }
    
    //Handles the 'stay' input on button click
    function stayClick(){
        // in progress
        //console.log(stayButton.height);

         //Determine if the dealer will take extra cards or stayt when the user clicks stay button.
        if (dealerCardValue >= 16) {
            //Make dealer hit.
        } else {
            draw(deck); //Make dealer draw.
        }

    }

    function enterButtonHoverState(button){
        button.setScale(.8);
    }

    function enterButtonRestState(button){
        button.setScale(.6);
     }

    //Increased the betAmount var by 10.
    function increaseBet() {
        if (!this.cardsDealt) {
            if (betAmount >= cashAmount) {
                console.log('Did not increase bet amount, player has insufficient funds.');
            } else {
                betAmount = betAmount + 10;
                console.log('Current bet amount: (increased)' + betAmount);
            }
        } else {
            console.log('Did not increase bet amount, cards already dealt.');
        }       
    }

    //Decreases the betAmount var by 10.
    function deceaseBet () {
        if (!this.cardsDealt) {
            if ((betAmount === 0)) {
                console.log('Did not decrease bet amount, player cannot bet less than 0.');
            } else {
                betAmount = betAmount - 10;
                console.log('Current bet amount: (decreased)' + betAmount);
            }
        } else {
            console.log('Did not decrease bet amount, cards already dealt.');
        } 
    }



    