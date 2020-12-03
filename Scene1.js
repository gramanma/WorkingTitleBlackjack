class Scene1 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    preload() { 
        this.loadBlackjack(100);  
    }

    create(){
        
       
        this.add.image(400, 300, 'tabletop');
        this.add.image(80, 110, 'cardback');

        //cardslots
        for(i=0; i < 12; i++){
            userCardSlots[i] =  this.add.sprite(250 + i*25,450, "backflip");
            dealerCardSlots[i] = this.add.sprite(250 + i*25,250, "backflip");
        }
           
        for(i = 0; i < 12 ; i++){
            
            userCardSlots[i].visible = false;
            dealerCardSlots[i].visible = false;
        }
             
         roundResultText = this.add.text(540, 100, "", { fontSize: '20px', fill: '#fff' });
          
        

         this.scoreLabel = this.add.bitmapText(50, 550, "pixelFont", "Wallet: "  , 32);

         var person=JSON.parse(localStorage.getItem("blackjack_userDetails"));
        
        this.scoreLabel.text = "Wallet: \n" + person.currency + person.wallet;
                         
        this.betLabel = this.add.bitmapText(550, 440, "pixelFont", "Wallet: "  , 32);

        this.betLabel.text=person.currency + betAmount;


        currency=person.currency;
        //TODO: Add buttons for raising and lowering the bet.
      

        raiseBetButton= this.add.image(610, 450, 'raiseBet').setScale(.3) ;

        raiseBetButton.on('pointerdown', () => this.increaseBet())
        .on('pointerout', () => enterButtonRestState(raiseBetButton))
        .on('pointerover', () => enterButtonHoverState(raiseBetButton))
        .alpha = .2;

        lowerBetButton = this.add.image(520, 450, 'lowerBet').setScale(.3);

        lowerBetButton.on('pointerdown', () => this.deceaseBet())
        .on('pointerout', () => enterButtonRestState(lowerBetButton))
        .on('pointerover', () => enterButtonHoverState(lowerBetButton))
        .alpha = .2;

        
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
      //  this.add.text(75,500, "Wallet:", { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.add.text(550,325, "Bet", { font: "32px Arial", fill: "#ffffff", align: "center" });
      //  this.cashLabel =this.add.text(85,550, cashAmount, { font: "32px Arial", fill: "#ffffff", align: "center" });
     //   this.betLabel =this.add.text(550,375, betAmount, { font: "32px Arial", fill: "#ffffff", align: "center" });
      
       this.enableDealButton();
       
 

      // this.deal(deck);as
     //  this.enableButtons();

     
    }

    /**
     * @author mgraman (gramanma@mail.uc.edu).
     * @summary Loads all image assets, creates a fresh deck, and gives the player starting cash.
     * @argument startingCash the amount of cash you want the user to start with.
     */
    loadBlackjack(startingCash) {
        //Load images.
        this.load.image('tabletop', 'assets/Gametable.png');
        this.load.image('cardback', 'assets/cardback3.png');
        this.load.image('hitButton','assets/hit_button.png');
        this.load.image('stayButton','assets/stay_button.png');
        this.load.image('dealButton','assets/deal_button.png');
        this.load.image('backflip', 'assets/cardback3.png');
        this.load.image('dealButton','assets/hit_button.png');
        this.load.image('dealButton','assets/right-arrow.png');
        this.load.image('raiseBet','assets/right-arrow.png');
        this.load.image('lowerBet','assets/left-arrow.png');
        
        //Create fresh deck and deal it.
        freshDeck();
        deck.forEach(element => {
            this.load.image(element, 'assets/' + element + '.png');
        });
        deck = shuffleDeck(deck);   

        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        //Starting cash amount.
        
    }

    flip(card, face) {
        try {
            console.log(card);
            console.log(face);
            const timeline = this.tweens.timeline(
                {
                    onComplete: () => {
                        timeline.destroy();
                    }
                }
            );
    
            timeline.add({
                targets: card,
                scale:1.1,
                duration: 300
            });
            timeline.add({
                targets:card,
                scaleX:0,
                duration: 300,
                delay:200,
                onComplete: () => {
                    card.setTexture(face);
                }
            });
            timeline.add({
                targets: card,
                scaleX:1.1,
                duration: 300
            });
            timeline.add({
                targets: card,
                scale:1,
                duration: 300
            });
    
            timeline.play();
        }catch(err){
            console.log(err.message);
        }
    }
    
    /**
     * @author mgraman (mgraman@mail.uc.edu)
     * @param {*} array array which contains the deck of cards to be shuffled.
     * @summary this method emptys the user and dealer hand, sets textures for cards, and manages the hands for the dealer and user.
     */
    deal(array) {

        roundResultText.text="";
        userHand = [];
        dealerHand = [];
        
        for(i = 0; i < 12 ; i++){
            userCardSlots[i].setTexture('backflip');
            dealerCardSlots[i].setTexture('backflip');
            userCardSlots[i].visible = false;
            dealerCardSlots[i].visible = false;
        }
    
        //Selects four cards the same way they would come off of a deck.
        let usercard1 = array.shift();
        let usercard2 = array.shift();
        let dealercard1 = array.shift();
        let dealercard2 = array.shift();
    
        userCardSlots[0].visible = true;
        userCardSlots[1].visible = true;
        dealerCardSlots[0].visible =true;
        dealerCardSlots[1].visible = true;

        this.flip(userCardSlots[0],usercard1);
        this.flip(userCardSlots[1],usercard2);
        this.flip(dealerCardSlots[0],dealercard1);
   
        //Push alternating cards to the user hand;
        userHand.push(usercard1);
        userHand.push(usercard2);
      
        //Push alternating cards to the dealer hand.
        dealerHand.push(dealercard1);
        dealerHand.push(dealercard2);

        //For debugging purposes.
        console.log("User hand:" + userHand);
        console.log("Dealer hand: " + dealerHand);
        this.disableDealButton();
        this.enableButtons();
    }
     
    enableDealButton(){
        dealButton.setScale(.6);
        dealButton.setInteractive({useHandCursor: true});
        dealButton.clearAlpha();

        raiseBetButton.setScale(.6);
        lowerBetButton.setScale(.6);
        raiseBetButton.setInteractive({useHandCursor: true});
        lowerBetButton.setInteractive({useHandCursor: true});
        raiseBetButton.clearAlpha();
        lowerBetButton.clearAlpha();
    }

    disableDealButton(){
        dealButton.setScale(.6);
        dealButton.alpha = 0.3;
        dealButton.removeInteractive();

      

        raiseBetButton.setScale(.6);
        raiseBetButton.alpha = 0.3;
        raiseBetButton.removeInteractive();

        lowerBetButton.removeInteractive();
        lowerBetButton.alpha = 0.3;
        lowerBetButton.setScale(.6);

        
     }
    
    enableButtons(){
        hitButton.setScale(.6);
        stayButton.setScale(.6);
        
        hitButton.setInteractive({useHandCursor: true});
        stayButton.setInteractive({useHandCursor: true});
       
        hitButton.clearAlpha();
        stayButton.clearAlpha();

        
     }

    /**
     * @author mgraman (mgraman@mail.uc.edu)
     * @summary handles the event where the hit button gets clicked.
     */
    hitClick(){
         
       userHand.push(draw(deck));
       console.table(userHand);
       userCardSlots[userHand.length-1].visible=true;
       this.flip(userCardSlots[userHand.length-1],userHand[userHand.length-1]);
 
       userCardValue = checkTotal(userHand);
       console.log('New User CardTotal = '+ userCardValue);
       if(checkTotal(userHand) > 21){
           //check a second time counting aces as 1's
           if(checkTotal(userHand,1) > 21){
            this.buttonsDisabled();

            roundResultText.text= determineWinner();
            this.updateWalletDisplay();
            this.enableDealButton();          
           }
       }
    }

    dealClick(){
        //reset the visibility of card slots

      this.deal(deck);
    }
      
       /**
     * @author morganaj (morganaj@mail.uc.edu)
     * @summary handles the event where the stay button gets clicked.
     */

    dealerdecision(){
        var person;
        console.log("dealer decision");
        console.log(checkTotal(dealerHand));
        console.log(checkTotal(dealerHand,1));
   
        if(checkTotal(dealerHand) == 21){
            roundResultText.text=determineWinner();
                      
            this.updateWalletDisplay();
                  
            this.enableDealButton();    
            return;
        }
        if(checkTotal(dealerHand) > 21){
            if(checkTotal(dealerHand,1) > 21){
                roundResultText.text=determineWinner();
                          
                this.updateWalletDisplay();
                  
                this.enableDealButton();    
               
                return;
            }
        }else{
            if (checkTotal(dealerHand) < 16) {
               
                // if (checkTotal(dealerHand) < 16 && checkTotal(userHand) < 22) {
                    dealerHand.push(draw(deck));
                    console.log(dealerHand[dealerHand.length-1]);
                    dealerCardSlots[dealerHand.length-1].visible=true;
                    console.log("dealer hits");
                
                    this.flip(dealerCardSlots[dealerHand.length-1],dealerHand[dealerHand.length-1]);
                    this.time.addEvent({
                        delay: 1000,
                        callback: this.dealerdecision,
                        callbackScope: this,
                        loop: false
                      });

            }else{
                 //dealer stays
                 roundResultText.text=determineWinner();
                             
                    this.updateWalletDisplay();
                  
                    this.enableDealButton();    
                 return;
            }
        }   

    }


    // dealerdecision(){
    //     console.log("dealer decision");
    //     console.log(checkTotal(dealerHand));
    //     console.log(checkTotal(dealerHand,1));
    //     // for(x=1; x< 10; x++){
    //         if(checkTotal(dealerHand) > 21){
    //             if(checkTotal(dealerHand,1) > 21){
    //                 roundResultText.text=determineWinner();
                    
    //                 this.updateWalletDisplay();
                  
    //                 this.enableDealButton();    
    //                 return;
    //             }
    //         }else{
    //             if (checkTotal(dealerHand) >= 16) {
    //                 //dealer stays
    //                 roundResultText.text=determineWinner();
    //                 this.updateWalletDisplay();
    //                 this.enableDealButton(); 

    //                 return;
    //             }else{
                 
    //                     dealerHand.push(draw(deck));
    //                     dealerCardSlots[dealerHand.length-1].visible=true;
    //                     console.log(checkTotal(dealerHand));
                    
    //                     this.flip(dealerCardSlots[dealerHand.length-1],dealerHand[dealerHand.length-1]);
    //                     this.time.addEvent({
    //                         delay: 1000,
    //                         callback: this.dealerdecision,
    //                         callbackScope: this,
    //                         loop: false
    //                       });
                
    //             }
    //         }
           
           
    //    // }
    // }

    /**
     * @author mgraman (mgraman@mail.uc.edu)
     * @summary handles the event where the stay button gets clicked.
     */
    stayClick(){
        this.buttonsDisabled();
       
        console.table(dealerHand);
        dealerCardSlots[dealerHand.length - 1].visible=true;
        this.flip(dealerCardSlots[1],dealerHand[1]);

        this.time.addEvent({
            delay: 1000,
            callback: this.dealerdecision,
            callbackScope: this,
            loop: false
        });

    }
    
    //disables buttons
    buttonsDisabled(){
        hitButton.setScale(.6);
        stayButton.setScale(.6);
        
         hitButton.alpha = 0.3;
         stayButton.alpha = 0.3;
        
         hitButton.removeInteractive();
         stayButton.removeInteractive();
         
         lowerBetButton.setScale(.6);
        raiseBetButton.setScale(.6);
         lowerBetButton.alpha = 0.3;
         raiseBetButton.alpha = 0.3;
         raiseBetButton.removeInteractive();
         lowerBetButton.removeInteractive();
    }
     

    /**
    * @author mgraman (mgraman@mail.uc.edu)
    * @summary handles the increasing in bet amount.
    */
    increaseBet() {
        if (!this.cardsDealt) {
            if (betAmount >= cashAmount) {
                console.log('Did not increase bet amount, player has insufficient funds.');
            } else {
                betAmount = betAmount + 10;
                console.log('Current bet amount: (increased)' + betAmount);
               
                this.betLabel.text=currency + (betAmount)
                
            }
        } else {
            console.log('Did not increase bet amount, cards already dealt.');
        }       
    }

    /**
    * @author mgraman (mgraman@mail.uc.edu)
    * @summary handles the decreasing in bet amount.
    */
    deceaseBet() {
        if (!this.cardsDealt) {
            if ((betAmount === 0)) {
                console.log('Did not decrease bet amount, player cannot bet less than 0.');
            } else {
                betAmount = betAmount - 10;
                console.log('Current bet amount: (decreased)' + betAmount);
                this.betLabel.text=currency + (betAmount)
            }
        } else {
            console.log('Did not decrease bet amount, cards already dealt.');
        } 
    }

    updateWalletDisplay(){
       var person=JSON.parse(localStorage.getItem("blackjack_userDetails"));
       this.scoreLabel.text = "Wallet: " + person.currency + person.wallet;
    }
}