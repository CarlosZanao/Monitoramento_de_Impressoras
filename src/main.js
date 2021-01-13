import axios from "axios";
import * as montaTela from '/src/montaTela.js'

//axios
const api = axios.create({
	baseURL: "http://192.168.26.192:3303/api/",
  });

var molelos = ['C3010','C911',"M404","M428","E50145","E52645","M5360",];
var visivel = false


function selecionaImp(){
	
    molelos.forEach(modelo => {
		var inputModelo = document.getElementById('inputmodelo')
		var dropdownC = document.getElementById("imps")

		var aElemente =document.createElement('a')
		aElemente.addEventListener("click",function(event) {
			inputModelo.setAttribute("value",modelo)
		})
		aElemente.style.float = "left"

		var modeloText = document.createTextNode(modelo)

		aElemente.appendChild(modeloText)
		dropdownC.appendChild(aElemente)
	});
}


function adicionaIMP(){
	var inputModelo = document.getElementById('inputmodelo')
	var inputIP = document.getElementById("inputIP")
	var btnAddimp = document.getElementById("btnAddimp")
	var tipo = "pb"
	var modelo = null
	btnAddimp.addEventListener("click",function(event){
		switch (inputModelo.getAttribute("value")) {
			case "C3010":
				modelo = "c3010"
				tipo = "color"
				break;
			case "C911":
				modelo = "c911"
				tipo = "color"
				break;
			case "M404":
				modelo = "m404"
				tipo = "pb"
				break;
			case "M428":
				modelo = "m428"
				tipo = "pb"
				break;
			case "E50145":
				modelo = "e50145"
				tipo = "pb"
				break;
			case "E52645":
				modelo = "e52645"
				tipo = "pb"
				break;
			case "M5360":
				modelo = "m5360"
				tipo = "pb"
				break;
			default:
				break;
		}

		api.post("imp/addimpressora",{"id":"0","modelo":modelo,"ip":inputIP.value,"tipo":tipo})
		.then(function(response){
			lecadastradas(true)
		})
		.catch((err) => {
			console.error("Não foi possivel cadastrar a impressora")
			alert("Não foi possivel cadastrar a impressora ("+err+")")
		});
	})
}

function btnCadastro(){
	var addBtn = document.getElementById("addbtn")
	addBtn.addEventListener("click",function(event){
		mostraForm(visivel)
		if(visivel == false){
			visivel = true
		}else{
			visivel = false
		}
	})
}

function mostraForm(valor){
	var addIp = document.getElementById("ipAdd")
	if(valor == false){
		addIp.style.display = "block"
	}else{
		addIp.style.display = "none"
	}	
}

var lecadastradas = function(add){
	if(add == true){
		var i =0
		api.get("imp/impressoras")
		.then(function(response){
			i = response.data.length - 1
			const imp = response.data[i];
			montaTela.novocard(imp.id)
			// request para cada impressora
			api.post("imp/",{"imp":{"modelo":`${imp.modelo}`,"ip":imp.ip}})
			.then(function(response){	
				montaTela.Atualiza(imp.id,response.data.imp,imp.tipo)
			})
			.catch((err) => {
				console.error("Ocorreu um erro ao obter dados da impressora ("+imp.ip+") "+ err);
				montaTela.erroMsg(imp.id,imp.ip)
			});
				
		})
		.catch((err) => {
			console.error("Não foi possivel obter a lista de impressoras a partir da API: "+err)
		});

	}else{
	//requeste lista de impressoras 
	api.get("imp/impressoras")
	.then(function(response){
		for (let i = 0; i < response.data.length; i++) {
			const imp = response.data[i];
			montaTela.novocard(imp.id)
			// request para cada impressora
			api.post("imp/",{"imp":{"modelo":`${imp.modelo}`,"ip":imp.ip}})
			.then(function(response){	
				montaTela.Atualiza(imp.id,response.data.imp,imp.tipo)
			})
			.catch((err) => {
				console.error("Ocorreu um erro ao obter dados da impressora ("+imp.ip+") "+ err);
				montaTela.erroMsg(imp.id,imp.ip)
			});
		}	
	})
	.catch((err) => {
		console.error("Não foi possivel obter a lista de impressoras a partir da API: "+err)
	});
	}
}


selecionaImp()
lecadastradas()
btnCadastro()
adicionaIMP()



