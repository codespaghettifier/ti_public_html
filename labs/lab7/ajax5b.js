function sendRequest() {
  const xhr = new XMLHttpRequest();
  var myDiv = document.getElementById("MyDivElement");
  var info = document.getElementById('info').value ;    
  var url = "../../cgi-bin/ajax_form.py" ;
  var data = encodeURI("info=" + info) ;
 
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     
  xhr.addEventListener("load", e => {
    if ( xhr.status == 200 )  {
         response = xhr.response;
         myDiv.innerHTML += response + "<br/>";
         // myDiv.innerHTML += xhr.getAllResponseHeaders() + "<br />" ;
    }
  })
       
  xhr.addEventListener("progress", e => {
     myDiv.innerHTML += "Status zadania: " + xhr.readyState + " (progress) <br/>" ;  
  });
  
  xhr.addEventListener("error", e => {
    alert("Nie udało się nawiązać połączenia");
  });
 
  xhr.send(data);
}
