var check = document.getElementById('answer_send');
var fr = document.forms['fr'];
var score = 0;
let scoreView = document.querySelector(".score");
scoreView.textContent=score;

check.onclick = function() {
    score=0;
    for(var i = 0; i < tpg.length; i++) {
        
        if(fr[i+"_a"].value == fr[i+"_u"].value) {
            fr[i+"_c"].value = "O";
            document.getElementById("check_"+i).style.background="green";
            score++;
        } else {
            fr[i+"_c"].value = "X";
            document.getElementById("check_"+i).style.background="red";
        }
    }
    
    event.preventDefault();
    console.log(score);
    scoreView.textContent=score;
}