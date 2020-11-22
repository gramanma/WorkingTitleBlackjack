let player_score = 0;  
let dealer_score = 0;
let player_hand=["2D","7C","TS"];
let dealer_hand=["KS","8H"];
let facecards = ["T","K","Q","J"];

function checkTotal(hand){
    let total=0;
    hand = hand.sort();
    let first_ace = false;
        hand.forEach(element => {
            var first_char = element.substr(0,1);
            if(isNaN(first_char)){
                if(isFaceCard(element)){total+=10;}
                if(isAce(element)){
                    total+= first_ace==true ? 1 : 11;
                }
            }else{
                total+=parseInt(first_char);
            }
        });
        return total;
    }
    
function determineWinner(){
    //rules are applied top down

    //dealer has blackjack-dealer wins
    if(dealer_hand.length===2 && hasFaceCard(dealer_hand) && hasAce(dealer_hand)){
        return "Dealer Wins";
    }
    player_score=checkTotal(player_hand);
   
    //player has five cards without passing 21 - player wins
    if(player_hand.length==5){
        return "Player Wins";
    }

    dealer_score = checkTotal(dealer_hand);
    //player and dealer have same total - dealer wins all ties
    if(parseInt(dealer_score) >= parseInt(player_score)){
        return "Dealer Wins";
    }

     //player greater than dealer - player wins
     if(parseInt(player_score) > parseInt(dealer_score)){
        return "Player Wins";
    }
}
function isAce(card){
    return card.substr(0,1)==="A" ? true : false;
}
function hasAce(hand){
     hand.forEach(element => {
        if(isAce(element)){return true;}
     });
     return false;  
}

function isFaceCard(card){
    return facecards.includes(card.element.substr(0,1)) ? true : false;
}
function hasFaceCard(hand){
    hand.forEach(element => {
        if(isFaceCard(element)){return true;}
     });
     return false;   
};


    
