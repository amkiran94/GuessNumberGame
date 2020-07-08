// Hinding the elements at the begining
document.getElementById("guess-num").style.display = "none";
document.getElementById("random-num").style.display = "none";
document.getElementById("guess-num-result").style.display = "none";
// Getting the informatiom from HTML Page
const generate = document.getElementById("btn-1");
const replay = document.getElementById("Re-play");
const guessedNumber= document.getElementById("rn-2");
const checkDigits = document.getElementById("checkAgain");

var correctGuess = 0;
var correctGuessInSequence = 0;

/**
 * Generates a random number and stores in the local storage.
 */
generate.addEventListener('click', function() {
    var number= Math.floor((Math.random()*1000000)+1);
    var storage = document.getElementById("rnd-n").innerText = number;
    localStorage.setItem('storedNumber', storage);
    document.getElementById("random-num").style.display = "block";
    document.getElementById("guess-num-result").style.display = "none";
    redirect();
    
});

// Contents changes after 10secs
function redirect(){
    setTimeout(function () { 
        document.getElementById("gen-random-num").style.display = "none"; 
        document.getElementById("guess-num").style.display = "block";
        document.getElementById("random-num").style.display = "none";
        document.getElementById("guess-num-result").style.display = "none";}, 10000); 
        
}

/**
 * Restarts the game.
 */ 
replay.addEventListener('click', function(){
    correctGuess = 0;
    correctGuessInSequence = 0;
    document.getElementById("gen-random-num").style.display = "block"; 
    document.getElementById("guess-num").style.display = "none";
    location.reload();
});

/**
 * Compares the numbers entered and the number generated.
 */
checkDigits.addEventListener('click', function() {
    // Checks if the input is empty and displays error
    if (guessedNumber.value === ''){
        alert("Please enter the number!");
        // document.getElementById("guess-num-result").style.display = "block";
        document.getElementById("crt").innerText = 0;
    } else{
        correctGuess = 0;
        correctGuessInSequence = 0;
        var guessedDigits = guessedNumber.value.toString().split('');
        var storedDigits = localStorage.getItem('storedNumber').split('');
        
        console.log(guessedDigits, storedDigits);

        //Compares each value
        guessedDigits.forEach(gd => {
            const index = storedDigits.indexOf(gd);
            if (index !== -1) {
                 /*Removes the compared value to avoid duplicate matching*/
                storedDigits.splice(index, 1);
                correctGuess++;
            }
        });

        /** To check if the gusses are in sequence */
        storedDigits = localStorage.getItem('storedNumber').split('');
        guessedDigits.forEach((gd, index) => {
            if (storedDigits[index] === gd) {
                correctGuessInSequence++;
            }
        });

        document.getElementById("guess-num-result").style.display = "block";
        document.getElementById("crt").innerText = correctGuess;
        document.getElementById("crt-in-seq").innerText = correctGuessInSequence;
        document.getElementById("crt-2").innerText = storedDigits.join("");

    }
});