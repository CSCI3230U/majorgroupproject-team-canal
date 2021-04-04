window.onload=function(){
    var hitbutton=document.getElementById("hit");
    var score=0;
    var number_array=[];
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

        var player_cards=document.getElementById("player_cards");
        var card_number=document.createElement("img");
        card_number.src="image/card%20("+number+").jpg";
        card_number.setAttribute("width","80px");
        player_cards.appendChild(card_number);
        
        if(3<=number&&number<=20){
            score=score+10;
        }
        else if(number<4){
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


    }

}
function generaterandomnumber(){
    var random_number=Math.floor((Math.random() * 52) + 1);
    return random_number;
}