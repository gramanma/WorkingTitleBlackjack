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

//
let roundResultText;

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

         roundResultText = this.add.text(config.width / 2, config.height / 2, "gameOVer", { fontSize: '20px', fill: '#fff' });
         roundResultText.visible = false;
        //TODO: Add buttons for raising and lowering the bet.

        hitButton = this.add.image(730, 450, 'hitButton').setScale(.6);
        //will have to set Interactive after hand is dealt and the buttons should be enabled
        hitButton.on('pointerdown', () => hitClick())
        .on('pointerout', () => enterButtonRestState(hitButton))
        .on('pointerover', () => enterButtonHoverState(hitButton))
        .alpha = .2;
        //properties will be changed after hand dealt
        //will have to set back to these values when buttons are disabled

        stayButton = this.add.image(730, 520, 'stayButton').setScale(.6);
         //will have to set Interactive after hand is dealt and the buttons should be enabled
        stayButton.on('pointerdown', () => stayClick())
        .on('pointerout', () => enterButtonRestState(stayButton))
        .on('pointerover', () => enterButtonHoverState(stayButton))
        .alpha = .2;
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
        //userCardValue = getHandTotal(userHand);
        //dealerCardValue = getHandTotal(dealerHand);
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
        userCardValue = checkTotal(userHand);
        console.log('User hand value = ' + userCardValue);
        dealerCardValue = checkTotal(dealerHand);
        console.log('Dealer hand value = ' + dealerCardValue);
        if(hasBlackJack(userHand) && hasBlackJack(dealerHand)){
            game.pause();
            console.log("I believe this is a tie");
        };
        if(hasBlackJack(userHand) && !hasBlackJack(dealerHand)){
            userWins("User had BlackJack!");
        };
        if(!hasBlackJack(userHand) && hasBlackJack(dealerHand)){
            dealerWins("Dealer had BlackJack!");
        };
        enableButtons();
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
       userHand.push(draw(deck));
       buttonsDisabled();
       setTimeout(function(){ 
        console.log('allowing card animation time');
           enableButtons(); 
       userCardValue = checkTotal(userHand);
       console.log('New User CardTotal = '+ userCardValue);
       if(userCardValue > 21){
        dealerWins('bust');
       }
       if(userCardValue === 21){
           stayClick();
           buttonsDisabled();
       }
        },2000);
    }
    
    //Handles the 'stay' input on button click
    function stayClick(){
        buttonsDisabled();
         setTimeout(function(){
             console.log('allowing card animation time');
        // in progress

        //dealerFlips his turned card if it is turned

         //Determine if the dealer will take extra cards or stay when the user clicks stay button.
        if (dealerCardValue >= 16) {
            dealerCardValue = checkTotal(dealerHand);
            //logic for dealers decision
            if(dealerShouldDraw(dealerHand)){
            console.log('dealer drawing');
            dealerHand.push(draw(deck));
            }
            else{
                console.log('dealer staying');
                determineWinnerNoBust();
            }
        } else {
            dealerHand.push(draw(deck)); //Make dealer draw.
            console.log('dealer drawing');
        }
        dealerCardValue = checkTotal(dealerHand);
        console.log('dealer CardTotal = '+ dealerCardValue);
        if(dealerCardValue > 21){
            userWins("dealer busted");
        }
        else{
            //will call this function over and over again until dealer busts or decides to not take a card
            stayClick();
        }
        },2000);
    }

    function enterButtonHoverState(button){
        button.setScale(.8);
    }

    function enterButtonRestState(button){
        button.setScale(.6);
     }
    
     function enableButtons(){
        hitButton.setInteractive({useHandCursor: true});
        stayButton.setInteractive({useHandCursor: true});
        hitButton.clearAlpha();
        stayButton.clearAlpha();
     }

     //disables buttons
     function buttonsDisabled(){
         console.log('disableingButtons');
         hitButton.alpha = 0.2;
         stayButton.alpha = 0.2;
         hitButton.removeInteractive();
         stayButton.removeInteractive();
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

    function getHandTotal(hand){
        var acesInHand = 0;
        var numberCard = /^[0-9]/;
        var total = 0;
        var c;
        for(c of hand){
            //if its an ace
            if(c[0] === "A"){
                acesInHand++;
            }
            //if its a number card
            else if(c[0].match(numberCard)){   
                total += parseInt(c[0], 10);
            }
            //if it is a face card that isnt an ace (or if it is a 10 aka "T")
            else{
                total += 10;
            }
        }
        if(acesInHand != 0){
        //aces logic here,  for now returning all aces as 1
        total += acesInHand;
        }
        return total;
    }
    
    //will hold the logic and answer for determining if the dealer will take another card or not
    function dealerShouldDraw(){
        //returning false for now
        //dealer wins all ties
        if(parseInt(userCardValue)<=parseInt(dealerCardValue)){
            return false;
        }
        //dealer has to stay on a 16 or better
        if(parseInt(userCardValue) > parseInt(dealerCardValue) && parseInt(dealerCardValue) < 16){
            return false;
        }
        return true;
    }

    //determineWinnerNoButs
    function determineWinnerNoBust(){
        userCardValue = getHandTotal(userHand);
        console.log('New User CardTotal = '+ userCardValue);
        dealerCardValue = getHandTotal(dealerHand);
        if (userCardValue === dealerCardValue){
            dealerWins('Dealer wins on a tie');
        }
        else if(userCardValue > dealerCardValue){
            userWins('User had a higher total than dealer');
        }
        else{
            dealerWins('Dealer had a higher total than user');
        }
    }

    //will immediately decide a winner if the user has a black jack
    function hasBlackJack(hand){
        var temporaryArray = [];
        var c;
        for(c of hand){
            temporaryArray.push(c[0]);
        }
        //checks to see if the two card hand has an ace and 10 value card
        if(temporaryArray.includes("A") 
        && (temporaryArray.includes("T") 
        || temporaryArray.includes("K") 
        || temporaryArray.includes("Q") 
        || temporaryArray.includes("T"))){
            return true;
        }
        else{
            return false;
        }
    }

    //will stop the round or game and notify the user that they have one
    function userWins(reason = "") {
        buttonsDisabled();
    // Display round result at center of the screen 
    roundResultText.text = reason;
    roundResultText.visible = true;
    roundResultText.setDepth(1);
    game.scene.pause("default"); 
    console.log("user has won the round: " + reason);
    }

    function dealerWins(reason = ""){
        buttonsDisabled();
        // Display round result at center of the screen 
        roundResultText.text = reason;
        roundResultText.visible = true;
        roundResultText.setDepth(1);
        game.scene.pause("default");
      
        console.log("dealer has won the round: " + reason);
    }



    