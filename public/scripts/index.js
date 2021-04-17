//golbal variables 
var resultsData = [];

window.onload=function(){

    let test = [3, 51, 23,17];
    let testCount = 0;
    let start = 0;

    var hitbutton=document.getElementById("hit");
    var standbutton=document.getElementById("stand");
    var resetbutton=document.getElementById("reset");
    var startbutton=document.getElementById("start");
    var databutton=document.getElementById("data");

    var score=0;
    var dealerScore = 0;
    var dealer_back_Card;
    var number_array=[];
    var number_array2=[];
    var dealerCards = [];
    var number2;
    var isGameOver = false;
    var isHit = false;
    var isDataShown = false;

    let score1 = document.getElementById("score1");
    let score2 = document.getElementById("score2");


    
    startbutton.onclick=function(){
        if (start == 0){
            $('#hit').css("visibility","visible");
            $('#stand').css("visibility","visible");
            $('.score').css("visibility","visible");
            number2=generaterandomnumber();
            while(true){
                if(number_array2.indexOf(number2)==-1){
                    number_array2.push(number2);
                    dealerCards.push(number2);
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
                dealerScore=numbertoscore(number2,dealerScore, number_array2);
                score2.textContent=dealerScore;
            start = 1;
        }
    }

    hitbutton.onclick=function(){
        if(isGameOver == false){

            if(isHit == false){
                var number2=generaterandomnumber();
                    while(true){
                        if(number_array2.indexOf(number2)==-1){
                            number_array2.push(number2);
                            dealerCards.push(number2);
                            break;
                        }
                        else{
                            number2=generaterandomnumber();
                        }
                    }

                    dealerScore = numbertoscore(number2,dealerScore, number_array2);
            }


            var number=0;
            number=test[testCount];
            number=generaterandomnumber();
           
            while(true){
                if(number_array.indexOf(number)==-1){
                    number_array.push(number);
                    break;
                }
                else{
                    number=test[testCount];
                    number=generaterandomnumber();
                    
                }
                
            }
            var player_cards=document.getElementById("player_cards");
            var card_number=document.createElement("img");
            card_number.src="image/card%20("+number+").jpg";
            card_number.setAttribute("width","80px");
            player_cards.appendChild(card_number);
            score=numbertoscore(number,score, number_array);

            //check is the score of the player is not greater than 21. if true then print that the play bust
            //else keep the game going
            if(score>21){
                //createDialoguebox();
                resultsData.push("L");
                console.log("Player looses!");
                score1.textContent = "BUST!";
                isGameOver = true;
            }else if(score ==21){
                resultsData.push("W");
                score1.textContent = "PLAYER WINS";
                isGameOver = true;
            }else{
                score1.textContent = score;
            }

            // console.log(player_cards.children[0].src);
            // console.log(player_cards.children[0].src[36]);
            // console.log(player_cards.children[0].src[37]);

            // console.log(number_array);
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
                            dealerCards.push(number2);
                            break;
                        }
                        else{
                            number2=generaterandomnumber();
                        }
                    }
                    dealerScore=numbertoscore(number2,dealerScore, number_array2);
                    
            }
            score2.textContent=dealerScore;
            
            for (let i = 0; i < dealerCards.length; i++){
                console.log(number_array2[i]);
                var dealer_card_number=document.createElement("img");
                dealer_card_number.src="image/card%20("+dealerCards[i]+").jpg";
                dealer_card_number.setAttribute("width","80px");
                dealer_cards.appendChild(dealer_card_number);
            }

            console.log("Dealer score is: " + dealerScore);
            console.log("Player score is: " + score);

            if ((dealerScore > score) && (dealerScore<=21)){
                score1.textContent = "DEALER WINS!";
                resultsData.push("L");
            }else if(dealerScore == score){
                score1.textContent = "TIE GAME!";
                resultsData.push("T");
            }else{
                score1.textContent = "PLAYER WINS!";
                resultsData.push("W");
            }
        }
    
    }

    resetbutton.onclick=function(){
        if (start == 1){
            var dealer_cards=document.getElementById("dealer_cards");
            removeChildren(dealer_cards);
            var player_cards=document.getElementById("player_cards");
            removeChildren(player_cards);
            number_array = [];
            number_array2 = [];
            dealerCards = [];
            dealerScore=0;
            number2=generaterandomnumber();
            while(true){
                if(number_array2.indexOf(number2)==-1){
                    number_array2.push(number2);
                    dealerCards.push(number2);
                    break;
                }
                else{
                    number2=generaterandomnumber();
                }
            }

            dealerScore=numbertoscore(number2,dealerScore, number_array2);
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

    //display data
    databutton.onclick=function(){
        if(isDataShown==true){
            $('#chart').css("visibility","hidden");
            isDataShown = false;
        }else{
            $('#chart').css("visibility","visible");
            isDataShown = true;
        }

        let avg = getVictoryFrequencies(resultsData);
        drawChart(avg);
    }


}

function generaterandomnumber(){
    var random_number=Math.floor((Math.random() * 52) + 1);
    return random_number;
}
//this is the update function that assigns the value of the new score 
function numbertoscore(number,score, cards){
    if(4<=number&&number<=19){
        score=score+10;
    }
    else if(number<4 || number == 52){
        score = score + 11;
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

    if (score > 21){
        for (let i = 0; i < cards.length; i++){
            if (score > 21){
                if (cards[i]<4 || cards[i] == 52){
                    cards[i] = 100;
                    score = score - 10;
                }
            }
        }
    }

    return score;
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getVictoryFrequencies(data){

    let numWs = 0;
    let numLs = 0;
    let numTs = 0;

    for (let i=0;i<data.length;i++){
        if (data[i] == 'W'){
            numWs++;
        }else if (data[i] == 'L'){
            numLs++;
        }else if (data[i] == 'T'){
            numTs++;
        }
    }

    return [
        {"type":'Player Wins',"frequency":numWs/data.length},
        {"type":'Dealer Wins',"frequency":numLs/data.length},
        {"type":'Tie Game',"frequency":numTs/data.length},
    ];

}
 
function drawChart(data) {

    const margin = 50;
    const width = 800;
    const height = 500;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    d3.select("svg").remove();

    const colourScale = d3.scaleLinear()
                            .domain([978, 2188])
                            .range(['cyan', 'blue']);

    const xScale = d3.scaleBand() // discrete, bucket
                        .domain(data.map((data) => data.type))
                        .range([0, chartWidth])
                        .padding(0.3);

    const yScale = d3.scaleLinear()
                        .domain([0, 1])
                        .range([chartHeight, 0]);

    let svg = d3.select("#chart")
                    .append('svg')
                        .attr('width', width)
                        .attr('height', height);

    // title
    svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin)
            .attr('text-anchor', 'middle')
            .attr("font-weight","bold")
            .text('Blackjack Winning Distribution');

    svg.append("text")
            .attr("class", "x label")
            .attr("x", width/2)
            .attr("y", height - 6)
            .attr("text-anchor", "middle")
            .attr("font-weight","bold")
            .text("Wins, Losses and Ties");
    
    svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -200)
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("font-weight","bold")
            .attr("transform", "rotate(-90)")
            .text("Frequency(%)");


    // create a group (g) for the bars
    let g = svg.append('g')
                    .attr('transform', `translate(${margin}, ${margin})`);

    // y-axis
    g.append('g')
        .call(d3.axisLeft(yScale));

    // x-axis
    g.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));


    let rectangles = g.selectAll('rect')
        .data(data)
        .enter()
            .append('rect')
                .attr('x', (data) => xScale(data.type))
                .attr('y', (data) => chartHeight)
                .attr('width', xScale.bandwidth())
                .attr('height', (data) => 0)
                .attr('fill', (data) => colourScale(data.frequency))


    rectangles.transition()
        .ease(d3.easeElastic)
        .attr('height', (data) => chartHeight - yScale(data.frequency))
        .attr('y', (data) => yScale(data.frequency))
        .duration(1000)
        .delay((data, index) => index * 50);
}


