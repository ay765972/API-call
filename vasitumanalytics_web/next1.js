function clearPage() {
    var headings = document.getElementsByClassName("p");
    Array.prototype.forEach.call(headings, function(val, idx) {
        val.innerHTML = "";
        val.innerText = "";
    });

    var myData = document.getElementsByClassName("mydata");
    Array.prototype.forEach.call(myData, function(val, idx) {
        val.innerHTML = "";
        val.innerText = "";
    });
}

showList = function () {

    // clear the page
    clearPage();
    
    var d1 = new Date(document.getElementById("startDate").value).getTime();
    var token = localStorage.getItem("REST-AUTH-TOKEN");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            for (var j = 0; j < response.length; j++) {
                // document.getElementsByClassName("p")[j].innerHTML = "";
                document.getElementsByClassName("p")[j].innerHTML = response[j].msg;
                var ol = document.createElement("ul");
                ol.classList.add("list-group")
                if (response[j].infos) {
                    for (var i = 0; i < response[j].infos.length; i++) {
                        var li = document.createElement("li");
                        li.classList.add("list-group-item")
                        li.appendChild(document.createTextNode(response[j].infos[i].name));
                        var mybr = document.createElement('br');
                        li.appendChild(mybr);
                        li.appendChild(document.createTextNode(response[j].infos[i].email));
                        ol.appendChild(li);
                        var mybr = document.createElement('br');
                        ol.appendChild(mybr);
                    }
                    // document.getElementsByClassName("mydata")[j].innerHTML = "";
                    document.getElementsByClassName("mydata")[j].appendChild(ol)
                }
            }

        }
    };
    xhttp.open("GET", "http://vasitumanalytics-server.herokuapp.com/v1/analytics/time/" + d1 + "", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhttp.setRequestHeader("REST-AUTH-TOKEN", token);
    xhttp.send();
};