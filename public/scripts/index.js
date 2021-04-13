window.onload=function(){


    var hitbutton=document.getElementById("hit");
    var standbutton=document.getElementById("stand");
    var resetbutton=document.getElementById("reset");
    var startbutton=document.getElementById("start");

    var score=0;
    var dealerScore = 0;

    var number_array=[];
    var number_array2=[];

    var isGameOver = false;
    var isHit = false;

    let score1 = document.getElementById("score1");


    
    startbutton.onclick=function(){
        $('#hit').css("visibility","visible");
        $('#stand').css("visibility","visible");
        $('.pscore').css("visibility","visible");
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

                    dealerScore = updateScore(number2,dealerScore);
            

                    var dealer_card_number=document.createElement("img");
                    dealer_card_number.src="image/card%20("+number_array2[0]+").jpg";
                    dealer_card_number.setAttribute("width","80px");
                    dealer_cards.appendChild(dealer_card_number);
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

            // var dealer_cards=document.getElementById("dealer_cards");
            // var dealer_card_number=document.createElement("img");
            // dealer_card_number.src="image/back.jpg";
            // dealer_card_number.setAttribute("width","80px");
            // dealer_cards.appendChild(dealer_card_number);

            
            score = updateScore(number,score);

            //check is the score of the player is not greater than 21. if true then print that the play bust
            //else keep the game going
            if(score>21){
                //createDialoguebox();
                console.log("Player looses!");
                score1.textContent = "BUST!";
                isGameOver = true;
            }else{
                score1.textContent = "Score: " + score;
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

            while(dealerScore<17){
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

                    dealerScore = updateScore(number2,dealerScore);
            }

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
        let score1 = document.getElementById("score1");
        score = 0;
        dealerScore = 0;
        isGameOver = false;
        isHit = false;
        score1.textContent = "";
    }

}

function generaterandomnumber(){
    var random_number=Math.floor((Math.random() * 52) + 1);
    return random_number;
}


function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//this is the update function that assigns the value of the new score 
function updateScore(num,count) {
    if(3<=num&&num<=20){
        count=count+10;
    }
    else if(num<4 || num == 52){
        count=count+11
    }
    else if(20<=num&&num<=23){
        count=count+9
    }
    else if(24<=num&&num<=27){
        count=count+8
    }
    else if(28<=num&&num<=31){
        count=count+7
    }
    else if(32<=num&&num<=35){
        count=count+6
    }
    else if(36<=num&&num<=39){
        count=count+5
    }
    else if(40<=num&&num<=43){
        count=count+4
    }
    else if(44<=num&&num<=47){
        count=count+3
    }
    else if(48<=num&&num<=51){
        count=count+2
    }
    else{
        count=count;
    }

    return count;
}