import m404Promise from '/src/m404.js'
import c911Promise from '/src/c911.js'
import c3010Promise from '/src/c3010.js'
import * as montaTela from '/src/montaTela.js'

var api = "192.168.26.192:3000"
var impressoras = [{"id":"0","modelo":"C3010","ip":"192.168.31.122"},{"id":"1","modelo":"C3010","ip":"192.168.31.187"},{"id":"2","modelo":"C3010","ip":"192.168.31.158"},{"id":"3","modelo":"C911","ip":"192.168.31.118"},{"id":"4","modelo":"M404","ip":"192.168.31.125"}]
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

function adicionaIMP(){
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

var lecadastradas = function(){
 	impressoras.forEach(imp => {
		if(imp.modelo=="C3010"){
			montaTela.novocard(imp.id)
			c3010Promise(imp.ip,api)
				.then(function(response){	
					
					//cardsVetor.push(response)
					montaTela.Atualiza(imp.id,response,imp.modelo)
				})
		}else if(imp.modelo == "C911"){
			montaTela.novocard(imp.id)
			c911Promise(imp.ip,api)
				.then(function(response){	
					
					//cardsVetor.push(response)
					montaTela.Atualiza(imp.id,response,imp.modelo)
				})
		}else if(imp.modelo == "M404"){
			montaTela.novocard(imp.id)
			m404Promise(imp.ip,api)
				.then(function(response){	
					
					//cardsVetor.push(response)
					montaTela.Atualiza(imp.id,response,imp.modelo)
				})
		}
	});
}


selecionaImp()
lecadastradas()
btnCadastro()
adicionaIMP()






