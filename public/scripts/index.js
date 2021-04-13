window.onload=function(){


    var hitbutton=document.getElementById("hit");
    var standbutton=document.getElementById("stand");
    var resetbutton=document.getElementById("reset");
    var startbutton=document.getElementById("start");

    var score=0;
    var dealerScore = 0;
    var dealer_back_Card;
    var number_array=[];
    var number_array2=[];
    var number2;
    var isGameOver = false;
    var isHit = false;

    let score1 = document.getElementById("score1");
    let score2 = document.getElementById("score2");


    
    startbutton.onclick=function(){
        $('#hit').css("visibility","visible");
        $('#stand').css("visibility","visible");
        $('.score').css("visibility","visible");
        number2=generaterandomnumber();
        while(true){
            if(number_array2.indexOf(number2)==-1){
                number_array2.push(number2);
                break;
            }
            else{
                number2=generaterandomnumber();
            }
        }
        var dealer_cards=document.getElementById("dealer_cards");
             dealer_back_Card=document.createElement("img");
             dealer_back_Card.src="image/back.jpg";
             dealer_back_Card.setAttribute("width","80px");
             dealer_cards.appendChild( dealer_back_Card);
             var dealer_card_number=document.createElement("img");
             dealer_card_number.src="image/card%20("+number2+").jpg";
             dealer_card_number.setAttribute("width","80px");
             dealer_cards.appendChild(dealer_card_number);
             dealerScore=numbertoscore(number2,dealerScore);
             score2.textContent=dealerScore;
             
    }

    hitbutton.onclick=function(){
        if(isGameOver == false){

            if(isHit == false){
                var number2=generaterandomnumber();
                    while(true){
                        if(number_array2.indexOf(number2)==-1){
                            number_array2.push(number2);
                            break;
                        }
                        else{
                            number2=generaterandomnumber();
                        }
                    }

                    dealerScore = numbertoscore(number2,dealerScore);
            }


            var number=generaterandomnumber();
           
            while(true){
                if(number_array.indexOf(number)==-1){
                    number_array.push(number);
                    break;
                }
                else{
                    number=generaterandomnumber();
                }
                
            }
            var player_cards=document.getElementById("player_cards");
            var card_number=document.createElement("img");
            card_number.src="image/card%20("+number+").jpg";
            card_number.setAttribute("width","80px");
            player_cards.appendChild(card_number);
            score=numbertoscore(number,score);

            //check is the score of the player is not greater than 21. if true then print that the play bust
            //else keep the game going
            if(score>21){
                //createDialoguebox();
                console.log("Player looses!");
                score1.textContent = "BUST!";
                isGameOver = true;
            }else{
                score1.textContent = score;
            }

            console.log(player_cards.children[0].src);
            console.log(player_cards.children[0].src[36]);
            console.log(player_cards.children[0].src[37]);

            console.log(number_array);
        }

        isHit = true;

    }

    standbutton.onclick=function(){
        if(isGameOver == false){
            var dealer_cards=document.getElementById("dealer_cards");
            removeChildren(dealer_cards);
            // var dealer_card_number=document.createElement("img");
            // dealer_card_number.src="image/card%20("+number2+").jpg";
            // dealer_card_number.setAttribute("width","80px");
            // dealer_cards.appendChild(dealer_card_number);
            
            while(dealerScore<17){
                var number2=generaterandomnumber();
                    while(true){
                        console.log(number2);
                        if(number_array2.indexOf(number2)==-1){
                            number_array2.push(number2);
                            break;
                        }
                        else{
                            number2=generaterandomnumber();
                        }
                    }
                    dealerScore=numbertoscore(number2,dealerScore);
                    
            }
            score2.textContent=dealerScore;
            
            for (let i = 0; i < number_array2.length; i++){
                console.log(number_array2[i]);
                var dealer_card_number=document.createElement("img");
                dealer_card_number.src="image/card%20("+number_array2[i]+").jpg";
                dealer_card_number.setAttribute("width","80px");
                dealer_cards.appendChild(dealer_card_number);
            }

            console.log("Dealer score is: " + dealerScore);
            console.log("Player score is: " + score);

            if ((dealerScore > score) && (dealerScore<=21)){
                score1.textContent = "DEALER WINS!";
            }else if(dealerScore == score){
                score1.textContent = "TIE GAME!";
            }else{
                score1.textContent = "PLAYER WINS!";
            }
        }
    
    }

    resetbutton.onclick=function(){
        var dealer_cards=document.getElementById("dealer_cards");
        removeChildren(dealer_cards);
        var player_cards=document.getElementById("player_cards");
        removeChildren(player_cards);
        number_array = [];
        number_array2 = [];
        dealerScore=0;
        number2=generaterandomnumber();
        while(true){
            if(number_array2.indexOf(number2)==-1){
                number_array2.push(number2);
                break;
            }
            else{
                number2=generaterandomnumber();
            }
        }

        dealerScore=numbertoscore(number2,dealerScore);
        score2.textContent=dealerScore;
        var dealer_cards=document.getElementById("dealer_cards");
             var dealer_card_number=document.createElement("img");
             dealer_card_number.src="image/back.jpg";
             dealer_card_number.setAttribute("width","80px");
             dealer_cards.appendChild(dealer_card_number);
             var dealer_card_number=document.createElement("img");
             dealer_card_number.src="image/card%20("+number2+").jpg";
             dealer_card_number.setAttribute("width","80px");
             dealer_cards.appendChild(dealer_card_number);
        let score1 = document.getElementById("score1");
        score = 0;
        
        isGameOver = false;
        isHit = false;
        score1.textContent = "";
    }

}

function generaterandomnumber(){
    var random_number=Math.floor((Math.random() * 52) + 1);
    return random_number;
}
//this is the update function that assigns the value of the new score 
function numbertoscore(number,score){
    if(3<=number&&number<=20){
        score=score+10;
    }
    else if(number<4 || number == 52){
        score=score+11
    }
    else if(20<=number&&number<=23){
        score=score+9
    }
    else if(24<=number&&number<=27){
        score=score+8
    }
    else if(28<=number&&number<=31){
        score=score+7
    }
    else if(32<=number&&number<=35){
    score=score+6
    }
    else if(36<=number&&number<=39){
        score=score+5
    }
    else if(40<=number&&number<=43){
        score=score+4
    }
    else if(44<=number&&number<=47){
        score=score+3
    }
    else if(48<=number&&number<=51){
        score=score+2
    }
    else{
        score=score;
    }
    return score;
}
function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


