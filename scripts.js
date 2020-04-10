		
function onOff() {
	document
		.querySelector("#modal")
		.classList
		.toggle("hide")

	document
		.querySelector("body")
		.classList
		.toggle("hideScroll")


	document
		.querySelector("#modal")
		.classList
		.toggle("addScroll")		
		
}

function checkFields(event){

	const valuesToCheck = [
		"title",
		"image",
		"category",
		"description",
		"link",
	]

	const isEmpty = valuesToCheck.find(function(value){
		
		const checkifisstring = typeof event.target[value].value === "string"
		const checkifisempty = !event.target[value].value.trim()
		
		if(checkifisstring && checkifisempty){
			return true
		}

		if(isEmpty){
			event.preventDefault()
			alert("Por favor, preencha os campos, parceiro!")
		}
	})
}
