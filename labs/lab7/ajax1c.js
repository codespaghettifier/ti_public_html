function sendRequest() {
  fetch("../../cgi-bin/TI_2020Z/ajax_hello.py")
    // .then(response => {console.log(response);})
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert(data);
     }) 
    .catch(error => console.log("Błąd: ", error));   
}
