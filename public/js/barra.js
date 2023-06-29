function search (params) {
    let input = document.getElementById("voice-search").value
    input=input.toLowerCase()
    let x = document.getElementById("libro")
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
  }