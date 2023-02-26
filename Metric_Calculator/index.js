let buttonClick = document.getElementById("convert-button")
let ValueStored
let Inputfield = document.getElementById("input-field")
let length = document.getElementById("length-h3")
let volume = document.getElementById("volume-h3")
let mass = document.getElementById("mass-h3")

buttonClick.addEventListener("click", function(){
    ValueStored = Inputfield.value
    length.innerText = `${ValueStored} meters = ${(ValueStored * 3.281).toFixed(2)} feet | ${ValueStored} feet = ${(ValueStored/3.281).toFixed(2)} meters`
    volume.innerText = `${ValueStored} litres = ${(ValueStored * 0.264).toFixed(2)} gallons | ${ValueStored} gallons = ${(ValueStored/0.264).toFixed(2)} litres`
    mass.innerText = `${ValueStored} kilos = ${(ValueStored * 2.204).toFixed(2)} pounds | ${ValueStored} pounds = ${(ValueStored/2.204  ).toFixed(2)} kilos`
})
