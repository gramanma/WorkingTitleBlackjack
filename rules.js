let player_score = 0;  
let dealer_score = 0;

let facecards = ["T","K","Q","J"];

/*
checkTotal(array,'' or 1)
    if checkTotal result is > 21, call checkTotal a second time 
    and pass in 1 for ace_value to see if counting aces as 1 still
    results in a value over 21
*/

function checkTotal(hand,ace_value){
    let total=0;
    hand = hand.sort();
    let first_ace = false;
        hand.forEach(element => {
            var first_char = element.substr(0,1);
            if(isNaN(first_char)){
                if(isFaceCard(element)){total+=10;}
                if(isAce(element)){
                    if(!isNaN(ace_value)){
                        total += parseInt(ace_value);
                    }else{
                        total += first_ace==true ? 1 : 11;
                        if(first_ace==false){first_ace=true;}
                    }
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
    if(dealerHand.length===2 && hasFaceCard(dealerHand) && hasAce(dealerHand)){
        return "Dealer Wins";
    }
    player_score=checkTotal(userHand);
   
    //player has five cards without passing 21 - player wins
    if(userHand.length==5){
        return "Player Wins";
    }

    dealer_score = checkTotal(dealerHand);
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
    return facecards.includes(card.substr(0,1)) ? true : false;
}
function hasFaceCard(hand){
    hand.forEach(element => {
        if(isFaceCard(element)){return true;}
     });
     return false;   
};


    
