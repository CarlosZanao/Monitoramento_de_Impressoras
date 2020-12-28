import axios from "axios";
import * as montaTela from '/src/montaTela.js'

//axios
const api = axios.create({
	baseURL: "http://192.168.26.192:3303/api",
  });

var impressoras = [{"id":"0","modelo":"c3010","ip":"192.168.31.122","tipo":"color"},{"id":"1","modelo":"c3010","ip":"192.168.31.187","tipo":"color"},{"id":"2","modelo":"c3010","ip":"192.168.31.158","tipo":"color"},{"id":"3","modelo":"c911","ip":"192.168.31.118","tipo":"color"},{"id":"4","modelo":"m404","ip":"192.168.31.125","tipo":"pb"},{"id":"5","modelo":"e50145","ip":"192.168.31.228","tipo":"pb"},{"id":"6","modelo":"e52645","ip":"192.168.31.168","tipo":"pb"}]
var molelos = ['C3010','C911'];
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

/*function adicionaIMP(){
	var inputModelo = document.getElementById('inputmodelo')
	var inputIP = document.getElementById("inputIP")
	var btnAddimp = document.getElementById("btnAddimp")
	btnAddimp.addEventListener("click",function(event){
		var newImp = {
			"id":impressoras.length,
			"modelo":inputModelo.getAttribute("value"),
			"ip":inputIP.value
		}
		
		if(newImp.modelo=="C3010"){
			montaTela.novocard(newImp.id)
			c3010Promise(newImp.ip)
				.then(function(response){	
					
					//cardsVetor.push(response)
					montaTela.Atualiza(newImp.id,response)
				})
		}else if(newImp.modelo == "C911"){
			montaTela.novocard(newImp.id)
			c911Promise(newImp.ip)
				.then(function(response){	
					montaTela.Atualiza(newImp.id,response)
				})
				.catch(function(response){
					console.log(response)
				})
		}
		console.log(teste)
	})
}*/

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

var lecadastradas = function(){
 	impressoras.forEach(imp => {
		montaTela.novocard(imp.id)
		api.post("imp/",{"imp":{"modelo":`${imp.modelo}`,"ip":imp.ip}})
			.then(function(response){	
				montaTela.Atualiza(imp.id,response.data.imp,imp.tipo)
				//console.log(imp.id,response.data.imp,imp.tipo)
			})
			.catch((err) => {
				console.error("Ocorreu um erro ao obter dados da impressora "+ err);
				});
	});
}


selecionaImp()
lecadastradas()
btnCadastro()
//adicionaIMP()