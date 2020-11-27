class Scene1 extends Phaser.Scene{
    ructor(){
        super("playGame");
    }

    preload(){
               
            this.load.image('tabletop', 'assets/Gametable.png');
            this.load.image('cardback', 'assets/cardback3.png');
            this.load.image('hitButton','assets/hit_button.png');
            this.load.image('stayButton','assets/stay_button.png');
            this.load.image('backflip', 'assets/cardback3.png');
            this.load.image('dealButton','assets/hit_button.png');
              
            freshDeck();
            deck.forEach(element => {
                this.load.image(element, 'assets/' + element + '.png');
            });
    
            deck = shuffleDeck(deck);
             
            //Give the player a starting cash amount;
            cashAmount = 100;
    }

    create(){
        this.add.image(400, 300, 'tabletop');
        this.add.image(80, 110, 'cardback');

        let initial_deal = [];
         userslot1 = this.add.sprite(250,450, "backflip")
         userslot2 = this.add.sprite(275,450, "backflip")
         dealerslot1 = this.add.sprite(250,250, "backflip")
         dealerslot2 = this.add.sprite(275,250, "backflip")
         userslot3 = this.add.sprite(300,450, "backflip")
         userslot4 = this.add.sprite(325,450, "backflip")
         dealerslot3 = this.add.sprite(300,250, "backflip")
         dealerslot4 = this.add.sprite(325,250, "backflip")
         userslot5 = this.add.sprite(350,450, "backflip")
         userslot6 = this.add.sprite(375,450, "backflip")
         dealerslot5 = this.add.sprite(350,250, "backflip")
         dealerslot6 = this.add.sprite(375,250, "backflip")
         userslot7 = this.add.sprite(400,450, "backflip")
         userslot8 = this.add.sprite(425,450, "backflip")
         dealerslot7 = this.add.sprite(400,250, "backflip")
         dealerslot8 = this.add.sprite(425,250, "backflip")
         userslot9 = this.add.sprite(450,450, "backflip")
         userslot10 = this.add.sprite(475,450, "backflip")
         dealerslot9 = this.add.sprite(450,250, "backflip")
         dealerslot10 = this.add.sprite(475,250, "backflip")
         userslot11 = this.add.sprite(500,450, "backflip")
         userslot12 = this.add.sprite(500,450, "backflip")
         dealerslot11 = this.add.sprite(500,250, "backflip")
         dealerslot12 = this.add.sprite(500,250, "backflip")

        initial_deal.push(userslot1)
        initial_deal.push(userslot2)
        initial_deal.push(dealerslot1)
        initial_deal.push(dealerslot2)
       
        userslot1.visible=false
        userslot2.visible=false
        dealerslot1.visible=false
        dealerslot2.visible=false
        userslot3.visible=false
        userslot4.visible=false
        dealerslot3.visible=false
        dealerslot4.visible=false
        userslot5.visible=false
        userslot6.visible=false
        dealerslot5.visible=false
        dealerslot6.visible=false
        userslot7.visible=false
        userslot8.visible=false
        dealerslot7.visible=false
        dealerslot8.visible=false
        userslot9.visible=false
        userslot10.visible=false
        dealerslot9.visible=false
        dealerslot10.visible=false
        userslot11.visible=false
        userslot12.visible=false
        dealerslot11.visible=false
        dealerslot12.visible=false

         roundResultText = this.add.text(config.width / 2, config.height / 2, "gameOVer", { fontSize: '20px', fill: '#fff' });
         roundResultText.visible = false;
        //TODO: Add buttons for raising and lowering the bet.

        dealButton = this.add.image(710, 350, 'dealButton').setScale(.6);
        //will have to set Interactive after hand is dealt and the buttons should be enabled
        dealButton.on('pointerdown', () => this.deal(deck,initial_deal))
        .on('pointerout', () => enterButtonRestState(dealButton))
        .on('pointerover', () => enterButtonHoverState(dealButton))
        .alpha = .2;

        hitButton = this.add.image(710, 450, 'hitButton').setScale(.6);
        //will have to set Interactive after hand is dealt and the buttons should be enabled
        hitButton.on('pointerdown', () => this.hitClick())
        .on('pointerout', () => enterButtonRestState(hitButton))
        .on('pointerover', () => enterButtonHoverState(hitButton))
        .alpha = .2;
        //properties will be changed after hand dealt
        //will have to set back to these values when buttons are disabled

        stayButton = this.add.image(710, 520, 'stayButton').setScale(.6);
         //will have to set Interactive after hand is dealt and the buttons should be enabled
        stayButton.on('pointerdown', () => this.stayClick())
        .on('pointerout', () => enterButtonRestState(stayButton))
        .on('pointerover', () => enterButtonHoverState(stayButton))
        .alpha = .2;
        //properties will be changed after hand dealt
        //will have to set back to these values when buttons are disabled
        this.add.text(350,100, "Dealer", { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.add.text(350,550, localStorage.getItem("userName"), { font: "32px Arial", fill: "#ffffff", align: "center" });

      // this.deal(deck);
       this.enableButtons();

    }

    flip2(card,idx){
        console.log(card);
         timeline = this.tweens.timeline(
            {
                onComplete: () => {
                    timeline.destroy()
                }
            }
        );

        timeline.add({
            targets: card,
            scale:1.1,
            duration: 300
        })
        timeline.add({
            targets:card,
            scaleX:0,
            duration: 300,
            delay:200,
            onComplete: () => {
                card.setTexture(face)
            }
        })
        timeline.add({
            targets: card,
            scaleX:1.1,
            duration: 300
        })
        timeline.add({
            targets: card,
            scale:1,
            duration: 300
        })

        timeline.play()

    }

    flip(card,face){
        console.log(card);
         timeline = this.tweens.timeline(
            {
                onComplete: () => {
                    timeline.destroy()
                }
            }
        );

        timeline.add({
            targets: card,
            scale:1.1,
            duration: 300
        })
        timeline.add({
            targets:card,
            scaleX:0,
            duration: 300,
            delay:200,
            onComplete: () => {
                card.setTexture(face)
            }
        })
        timeline.add({
            targets: card,
            scaleX:1.1,
            duration: 300
        })
        timeline.add({
            targets: card,
            scale:1,
            duration: 300
        })

        timeline.play()

    }
    
    enableButtons(){
        hitButton.setInteractive({useHandCursor: true});
        stayButton.setInteractive({useHandCursor: true});
        dealButton.setInteractive({useHandCursor: true});
        hitButton.clearAlpha();
        stayButton.clearAlpha();
        dealButton.clearAlpha();
     }

     deal(array, initial_deal) {
        userHand = [];
        dealerHand = [];
        //Selects four cards the same way they would come off of a deck.
        let usercard1 = array.shift();
        let usercard2 = array.shift();
        number_of_hits=2;
        let dealercard1 = array.shift();
        let dealercard2 = array.shift();

        for(var x=0; x<initial_deal.length; x++){
            initial_deal[x].visible=true;
           
        }
        this.flip(initial_deal[0],usercard1);
        this.flip(initial_deal[1],usercard2);
        this.flip(initial_deal[3],dealercard2);
        //Push alternating cards to the user hand;
        userHand.push(usercard1);
        userHand.push(usercard2);
      
        //Push alternating cards to the dealer hand.
        dealerHand.push(dealercard1);
        dealerHand.push(dealercard2);

        console.log("User hand:" + userHand);
        console.log("Dealer hand: " + dealerHand);
    }

    //Draw a card from the array and remove it after it is selected.
     draw(array) {
        var selectedIndex = array.shift(); //Removed first element in array and selects it.
        console.log("Drawn Card: " + selectedIndex); //Log the drawn card.
        return selectedIndex;
    }
   
    //Handles the 'hit' input on button click
     hitClick(){
       //in progress
       userHand.push(this.draw(deck));
       userslot3.visible=true;
       this.flip(userslot3,this.usercard3);
     //  this.buttonsDisabled()
      // setTimeout(function(){ 
       
      //  this.enableButtons()
       userCardValue = checkTotal(userHand);
       console.log('New User CardTotal = '+ userCardValue);
       if(userCardValue > 21){
       // dealerWins('bust');
       }
       if(userCardValue === 21){
           stayClick();
           this.buttonsDisabled()
       }
      //  },2000);
    }

     dealClick(){
      this.deal(deck);
     }
    
    //Handles the 'stay' input on button click
     stayClick(){
        this.buttonsDisabled()
     //   this.flip(card,dealerslot2)
        if (checkTotal(dealerHand) >= 16) {
            //dealer stays
            console.log(determineWinner())
        }else{
            
        }
        //  setTimeout(function(){
        //      console.log('allowing card animation time');
        // in progress

        //dealerFlips his turned card if it is turned
      //  this.flip(initial_deal[2],dealerslot2);

         //Determine if the dealer will take extra cards or stay when the user clicks stay button.
        // if (checkTotal(dealerHand) >= 16) {
        //    // dealerCardValue = checkTotal(dealerHand);
        //     //logic for dealers decision
        //     if(dealerShouldDraw(dealerHand)){
        //     console.log('dealer drawing');
        //     dealerHand.push(draw(deck));
        //     }
        //     else{
        //         console.log('dealer staying');
        //         determineWinnerNoBust();
        //     }
        // } else {
        //     dealerHand.push(draw(deck)); //Make dealer draw.
        //     console.log('dealer drawing');
        // }
        // dealerCardValue = checkTotal(dealerHand);
        // console.log('dealer CardTotal = '+ dealerCardValue);
        // if(dealerCardValue > 21){
        //     userWins("dealer busted");
        // }
        // else{
        //     //will call this function over and over again until dealer busts or decides to not take a card
        //     stayClick();
        // }
        // },2000);
    }
    
       //disables buttons
      buttonsDisabled(){
         console.log('disablingButtons');
         hitButton.alpha = 0.2;
         stayButton.alpha = 0.2;
         hitButton.removeInteractive();
         stayButton.removeInteractive();
     }
     

    //Increased the betAmount var by 10.
     increaseBet() {
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
     deceaseBet () {
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

     getHandTotal(hand){
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
     dealerShouldDraw(){
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
     determineWinnerNoBust(){
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
     hasBlackJack(hand){
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
     userWins(reason = "") {
        this.buttonsDisabled()
    // Display round result at center of the screen 
    roundResultText.text = reason;
    roundResultText.visible = true;
    roundResultText.setDepth(1);
    game.scene.pause("default"); 
    console.log("user has won the round: " + reason);
    }

     dealerWins(reason = ""){
        this.buttonsDisabled()
        // Display round result at center of the screen 
        roundResultText.text = reason;
        roundResultText.visible = true;
        roundResultText.setDepth(1);
        game.scene.pause("default");
      
        console.log("dealer has won the round: " + reason);
    }

    
    
     //temporary testing function feel free to replace
    //  simulateDealing(){
    //     this.deal(deck);
    //     console.log('Activating Buttons');
    //     userCardValue = checkTotal(userHand);
    //     console.log('User hand value = ' + userCardValue);
    //     dealerCardValue = checkTotal(dealerHand);
    //     console.log('Dealer hand value = ' + dealerCardValue);
    //     if(hasBlackJack(userHand) && hasBlackJack(dealerHand)){
    //         game.pause();
    //         console.log("I believe this is a tie");
    //     };
    //     if(hasBlackJack(userHand) && !hasBlackJack(dealerHand)){
    //         userWins("User had BlackJack!");
    //     };
    //     if(!hasBlackJack(userHand) && hasBlackJack(dealerHand)){
    //         dealerWins("Dealer had BlackJack!");
    //     };
    //     enableButtons();
    // }
}