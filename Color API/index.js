document.getElementById("button").addEventListener("click", function(){
    fetch("https://www.thecolorapi.com")
    .then(response => response.json())
    .then(data => console.log(data))
})