/*Write a function called countdown that accepts a number as a parameter and every 
1000 milliseconds decrements the value and console.logs it. Once the value is 0 it should log “DONE!” and stop.*/

function countDown(num){
    //calls function every 1000 millisec
    let count =setInterval(function(){
        num--;
        //outputs done when num = 0
        if(num = 0){
            clearInterval(count);
            console.log("DONE!");
        }
        //countsdown until 0
        else{
            console.log(num);
        }
    }, 1000 )
}