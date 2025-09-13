//codigo usando XMLHttpRequest
function CargaDocumento() {
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
 document.getElementById("demo").innerHTML =
 this.responseText;
 }
 };
 xhttp.open("GET", "ajax_info.txt", true);
 xhttp.send();
}


//codigo equivalente usando fetch
function CargaDocumento() {
 fetch("ajax_info.txt")
        .then(response => response.text())
        .then(data => {
            document.getElementById("demo").innerHTML= data;

        })
        .catch(error =>{
             document.getElementById("demo").innerHTML = "ocurrio un eror" + error
             console.log("error en fetch:" , error);
        });
 
}