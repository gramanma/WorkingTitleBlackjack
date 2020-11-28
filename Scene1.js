class Scene1 extends Phaser.Scene{
    constructor(){
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

        //cardslots
        for(i=0; i < 12; i++){
            userCardSlots[i] =  this.add.sprite(250 + i*25,450, "backflip")
            dealerCardSlots[i] = this.add.sprite(250 + i*25,250, "backflip")
        }
           
        for(i=0; i< 12 ; i++){
            userCardSlots[i].visible=false
            dealerCardSlots[i].visible=false
        }
      
         roundResultText = this.add.text(config.width / 2, config.height / 2, "gameOVer", { fontSize: '20px', fill: '#fff' });
         roundResultText.visible = false;
        //TODO: Add buttons for raising and lowering the bet.

        dealButton = this.add.image(710, 350, 'dealButton').setScale(.6);
        //will have to set Interactive after hand is dealt and the buttons should be enabled
        dealButton.on('pointerdown', () => this.deal(deck))
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

        dealButton.setInteractive({useHandCursor: true});
        dealButton.clearAlpha();
        
      // this.deal(deck);
     //  this.enableButtons();

    }

    flip(card,face){
        try{
        console.log(card);
        console.log(face);
        const timeline = this.tweens.timeline(
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
    }catch(err){
        console.log(err.message);
    }
    }
    
    

     deal(array) {
        userHand = [];
        dealerHand = [];
        
        for(i=0; i < 12 ; i++){
            userCardSlots[i].setTexture('backflip');
            dealerCardSlots[i].setTexture('backflip');
            userCardSlots[i].visible=false;
            dealerCardSlots[i].visible=false;
        }
    
        //Selects four cards the same way they would come off of a deck.
        let usercard1 = array.shift();
        let usercard2 = array.shift();
      
        let dealercard1 = array.shift();
        let dealercard2 = array.shift();
    
        userCardSlots[0].visible=true;
        userCardSlots[1].visible=true;
        dealerCardSlots[0].visible=true;
        dealerCardSlots[1].visible=true;

        this.flip(userCardSlots[0],usercard1);
        this.flip(userCardSlots[1],usercard2);
        this.flip(dealerCardSlots[0],dealercard1);
   
        //Push alternating cards to the user hand;
        userHand.push(usercard1);
        userHand.push(usercard2);
      
        //Push alternating cards to the dealer hand.
        dealerHand.push(dealercard1);
        dealerHand.push(dealercard2);

        console.log("User hand:" + userHand);
        console.log("Dealer hand: " + dealerHand);
        this.enableButtons();
    }
     
    enableButtons(){
        hitButton.setInteractive({useHandCursor: true});
        stayButton.setInteractive({useHandCursor: true});
     
        hitButton.clearAlpha();
        stayButton.clearAlpha();
       
     }

    //Handles the 'hit' input on button click
     hitClick(){
         
       userHand.push(draw(deck));
       console.table(userHand);
       userCardSlots[userHand.length-1].visible=true;
       this.flip(userCardSlots[userHand.length-1],userHand[userHand.length-1])
 
       userCardValue = checkTotal(userHand);
       console.log('New User CardTotal = '+ userCardValue);
       if(checkTotal(userHand) > 21){
            this.buttonsDisabled();
            setTimeout(this.stayClick(),5000);
           
       }
       if(checkTotal(userHand) === 21){
        this.buttonsDisabled();
        setTimeout(this.stayClick(),2000);
       }
     
    }

     dealClick(){
         //reset the visibility of card slots

      this.deal(deck);
     }
    
     

    //Handles the 'stay' input on button click
     stayClick(){
        this.buttonsDisabled();
      //  console.log(dealerCardSlots[1]);
       
        console.log("stay click");
        console.table(dealerHand);
        dealerCardSlots[dealerHand.length - 1].visible=true;
        this.flip(dealerCardSlots[1],dealerHand[1]);
        console.log("after flip");
        setTimeout(this.dealerdecision,5000);
        // if (checkTotal(dealerHand) < 16) {
        //     // setTimeout(this.dealerhit, 1000)
        //     // let flag=false;
        //     // //need to loop dealer drawing cards until over 16 or bust
        //     // do {
        //     //     //draw a card
              
        //     //     if(checkTotal(dealerHand) >= 16){
        //     //         //dealer stays
        //     //         flag=true;
        //     //     }             
        //     //   }
        //     //   while (flag==false);
        // }else{
        //     console.log("dealer stays");
        // }
        
   
    }
    
    dealerDraw(){
        dealerHand.push(draw(deck));
        dealerCardSlots[dealerHand.length-1].visible=true;
        console.log("here");
        flip(dealerCardSlots[dealerHand.length-1],dealerHand[dealerHand.length-1])
    }

    dealerdecision(){
        console.log("dealer decision");
       if (checkTotal(dealerHand) >= 16) {
           //dealer stays
           console.log(determineWinner());
           return;
       }
           //inform the user of the dealers score and if they will take a card or not
           //have to add a delay to slow down the process for the user
           this.dealerDraw()
          
           //  console.log(determineWinner());
      
    }

    


       //disables buttons
      buttonsDisabled(){
    //     console.log('disablingButtons');
         hitButton.alpha = 0.3;
         stayButton.alpha = 0.3;
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
    
}