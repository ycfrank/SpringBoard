/*Write a function called randomGame that selects a random number between 0 and 1 
every 1000 milliseconds and each time that a random number is picked, 
add 1 to a counter. If the number is greater than .75, stop the timer and console.log 
the number of tries it took before we found a number greater than .75*/

function randomGame(num){
    let counter;
    //calls function every 1000 millisec
    let count = setInterval(function() {
        //generate random num and add to counter
        let randNum = Math.random();
        counter++;
        //if random num greater than .75, stop and output number of tries
        if(randNum > .75){
            clearInterval(count);
            console.log("# of tries: " + count + " to get above .75");
        }
    }, 1000)
}