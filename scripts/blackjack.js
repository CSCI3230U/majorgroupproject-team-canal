$(document).ready(function(){
    var deck = [2,3,4,5,6,7,8,9,10,10,10,10,11,
        2,3,4,5,6,7,8,9,10,10,10,10,11,
        2,3,4,5,6,7,8,9,10,10,10,10,11,
        2,3,4,5,6,7,8,9,10,10,10,10,11];
    
    var playerHand;
    var dealerHand;
    
    function drawRandomCard(deck){
        var randomIndex = Math.floor(deck.length * Math.random());
        return deck[randomIndex];
    }
    
    function startGame(){
        playerHand = [drawRandomCard(deck),drawRandomCard(deck)];
        dealerHand = [drawRandomCard(deck),drawRandomCard(deck)];
    }
    
    function getHandValue(hand){
        var sum =0;
        for (var i=0;i<hand.length;i++){
            sum +=hand[i];
        }
        return sum;
    }
    
    startGame();
    
    function hit(){
        playerHand.push(drawRandomCard(deck));
        console.log('new player hand: ' + playerHand);
        if (getHandValue(playerHand) > 21){
            document.getElementById("game-status").innerHTML = "BUST!";
        }
    }
    
    document.getElementById("player-hand").innerHTML = playerHand;
    document.getElementById("player-hand-value").innerHTML = getHandValue(playerHand);
    document.getElementById("dealer-hand").innerHTML = dealerHand;
    document.getElementById("dealer-hand-value").innerHTML = getHandValue(dealerHand);
    
})