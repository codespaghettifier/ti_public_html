function sendRequest() {
  var myDiv = document.getElementById("MyDivElement");
  var info = document.getElementById('info').value ;    
  var url = "../../cgi-bin/ajax_form.py" ;
  url += "?info=" + info;  
  var txt ='';
  var info ='';
  fetch(url)
    .then(response => { 
            response.text().then( data => {
              // console.log(data);
              myDiv.innerHTML += data ;
            }) ;
            //for (let [key, value] of response.headers) {
            //  txt += `${key} = ${value} <br/>`;
            //  // console.log(`${key} = ${value} <br/>`);             
            //} 
            myDiv.innerHTML += txt  ;
    })
    .catch(error => console.log("Błąd: ", error)); 
}
