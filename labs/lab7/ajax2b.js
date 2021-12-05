function sendRequest() {
  const xhr = new XMLHttpRequest();
  var myDiv = document.getElementById("MyDivElement");
  myDiv.innerHTML += "Status zadania: " + xhr.readyState + "<br/>" ;
  xhr.open("GET", "../../cgi-bin/ajax_hello.py", true);
  myDiv.innerHTML += "Status zadania: " + xhr.readyState + "<br/>" ;  
  xhr.addEventListener("load", e => {
    if (xhr.readyState == 1) {
           myDiv.innerHTML += "Status zadania: 1 (laduje)<br/>" ;
    } 
    else if (xhr.readyState == 2) {
           myDiv.innerHTML += "Status zadania: 2 (zaladowany)<br/>" ;
    }
    else if (xhr.readyState == 3) {
           myDiv.innerHTML += "Status zadania: 3 (interaktywny)<br/>" ;
    }
    else if (xhr.readyState == 4) {
         if ( xhr.status == 200 )  {
             response = xhr.response;
             myDiv.innerHTML += "Status zadania: 4 (zakonczony)<br/>" ;
             myDiv.innerHTML += response ;
         }
    }
  })      
  xhr.addEventListener("progress", e => {
     myDiv.innerHTML += "Status zadania: " + xhr.readyState + " (progress) <br/>" ;  
  });
  
  xhr.addEventListener("error", e => {
    alert("Nie udało się nawiązać połączenia");
  });
 
  xhr.send();
}
