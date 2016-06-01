function showHint(str) {
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                
                var personObj = JSON.parse(xmlhttp.response);

                var fullName = personObj.map(function(a) {
                    return a.fullName;});

                var list = '';
                for(var i = 0; i < fullName.length; i++){
                    list+= '<hr>' + '<li>' + fullName[i] + '</li>';
                }

                if(!list){
                    var div = '<button onClick="toggleAdd()">' + "Jag vill också vara med i Patriks databas!" + 
                    '<br>' + '<small>' + "Den är rätt fräsch" + '</small>' + '</button>'
                    document.getElementById("txtHint").innerHTML = div;
                }else{
                document.getElementById("txtHint").innerHTML = list;
                }
            }
        };
        xmlhttp.open("GET", "/searchperson?name=" + str, true);
        xmlhttp.send();
    }
}

function toggleAdd(){
    var toggle = document.getElementById("hideshow");
    if(toggle.style.display == "none"){
        toggle.style.display = "block";
    }else{
        toggle.style.display = "none";
    }
}

