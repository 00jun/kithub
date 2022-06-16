var check = document.getElementById('answer_send');
var fr = document.forms['fr'];

check.onclick = function() {
    
    for(var i = 0; i < tpg.length; i++) {
        
        if(fr[i+"_a"].value == fr[i+"_u"].value) {
            fr[i+"_c"].value = "O";
            document.getElementById("check_"+i).style.background="green";
        } else {
            fr[i+"_c"].value = "X";
            document.getElementById("check_"+i).style.background="red";
        }
    }
    
    event.preventDefault();
    
}