function speak(data) {
    const context = new AudioContext();
    context.decodeAudioData(data, buffer => {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
    });
}

function request_speaking(word){ //여기다 받아오고
    const xmlData = '<speak>' + word + '</speak>';
    $.ajax({
        url:'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize',
        method:"POST",
        data:xmlData,
        headers:{
            'Content-Type': 'application/xml',
            Authorization: `KakaoAK 8577b6ff738de95cbb9732af84eedbdf`,
        },
        xhrFields: {
            responseType: 'arraybuffer'
        }
    }).done(function(data) {
        speak(data);
    })
    // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
    .fail(function(xhr, status, errorThrown) {

    })
    // 
    .always(function(xhr, status) {

    });
}

var ak = "";
var aj = "";
var al = "";

var tpg = "";
var count = 0;


function get_tags() {
    const url = 'http://127.0.0.1:8000/api/create_tags';
    const method = 'POST';
    const selectFile = document.getElementById("image").files[0];
    var reader = new FileReader();
    // http://127.0.0.1:8000/api/create_tags

    var fr = document.forms['fr'];

    reader.onload = function()
    {
        $.ajax({
            type: method,
            // url: "http://127.0.0.1:8000/api/create_tags",
            url: "https://kimmjae2312.pythonanywhere.com/api/create_tags",
            // data: "image_url=" + escape("http://test-tam.pe.kr/test/suit.jpg"),
            data: {
                "image": reader.result
            },
            success: function (rtn) {
                console.log(rtn); // 여기다 처리
                tpg = rtn;
                // li 초기화
                $("#keyword_list").empty();
                count = 0;
                
                // li 추가
                for(var i = 0; i < rtn.length; i++) {
                    ak = rtn[i]; // ak = 동물
                    addList();
                }
                
                
            }
        });
    };

    reader.readAsDataURL(selectFile); 

}


function addList()  {
    var key_list = $("#keyword_list");
    
    var fr = document.forms['fr'];
    
    key_list.append("<li>");
    key_list.append("<img class='quiz_sound' src='./images/스피커.png' onclick=request_speaking(fr['"+count+"_a'].value)>");
    key_list.append("<input class='quiz' type='text' name='"+count+"_u' value=''>");
    key_list.append("<input class='quiz' type='hidden' name='"+count+"_a' value='"+ak+"'>");
    key_list.append("<input class='quiz_check' id='check_"+count+"' type='text' name='"+count+"_c' value=''>");
    /*
    <img src="/images/스피커.png" onclick="request_speaking(fr['0_a'].value)">
    */
    key_list.append("</li>");

    al = "";
    count += 1;
}