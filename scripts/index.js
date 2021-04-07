window.onload=function(){


    var hitbutton=document.getElementById("hit");
    var standbutton=document.getElementById("stand");
    var resetbutton=document.getElementById("reset");
    var score=0;
    var dealerScore = 0;

    var number_array=[];
    var number_array2=[];

    hitbutton.onclick=function(){

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

        var player_cards=document.getElementById("player_cards");
        var card_number=document.createElement("img");
        card_number.src="image/card%20("+number+").jpg";
        card_number.setAttribute("width","80px");
        player_cards.appendChild(card_number);

        var dealer_cards=document.getElementById("dealer_cards");
        var dealer_card_number=document.createElement("img");
        dealer_card_number.src="image/back.jpg";
        dealer_card_number.setAttribute("width","80px");
        dealer_cards.appendChild(dealer_card_number);
        
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
        if(score>21){
            //createDialoguebox();
        }

        let score1 = document.getElementById("score1");
        score1.textContent = "Score: " + score;

        console.log(player_cards.children[0].src);
        console.log(player_cards.children[0].src[36]);
        console.log(player_cards.children[0].src[37]);

        console.log(number_array);



    }

    standbutton.onclick=function(){
        var dealer_cards=document.getElementById("dealer_cards");
        removeChildren(dealer_cards);



        for (let i = 0; i < number_array2.length; i++){
            console.log(number_array2[i]);
            var dealer_card_number=document.createElement("img");
            dealer_card_number.src="image/card%20("+number_array2[i]+").jpg";
            dealer_card_number.setAttribute("width","80px");
            dealer_cards.appendChild(dealer_card_number);
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