import axios from "axios";
import * as montaTela from '/src/montaTela.js'

//axios
const api = axios.create({
	baseURL: "http://192.168.26.192:3303/api/",
  });

const molelos = ['C3010','C911',"M404","M428","E50145","E52645","M5360",];
var visivel = false


function selecionaImp(){
	
    molelos.forEach(modelo => {
		let inputModelo = document.getElementById('inputmodelo');
		
		let option = document.createElement('option');
		option.setAttribute("value",modelo)
		
		let modeloText = document.createTextNode(modelo);
		
		option.appendChild(modeloText);
		inputModelo.appendChild(option);
	});
}

function adicionaIMP(){
	let inputModelo = document.getElementById('inputmodelo')
	let inputIP = document.getElementById("inputIP")
	let btnAddimp = document.getElementById("btnAddimp")
	let tipo = "pb"
	let modelo = null
	btnAddimp.addEventListener("click",function(event){
		let modeloSelecionado = inputModelo.options[inputModelo.selectedIndex].value;
		switch (modeloSelecionado) {
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
	let addBtn = document.getElementById("addbtn")
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
	let addIp = document.getElementById("ipAdd")
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



