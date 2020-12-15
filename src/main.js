import m404Promise from '/src/m404.js'
import c911Promise from '/src/c911.js'
import c3010Promise from '/src/c3010.js'

var api = "192.168.26.192:3000"
var impressoras = [{"id":"0","modelo":"C3010","ip":"192.168.31.122"},{"id":"1","modelo":"C3010","ip":"192.168.31.187"},{"id":"2","modelo":"C3010","ip":"192.168.31.158"},{"id":"3","modelo":"C911","ip":"192.168.31.118"},{"id":"4","modelo":"M404","ip":"192.168.31.125"}]
var molelos = ['C3010','C911'];
var cardsElement = document.getElementById('cards');
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
			novocard(newImp.id)
			c3010Promise(newImp.ip)
				.then(function(response){	
					
					//cardsVetor.push(response)
					Atualiza(newImp.id,response)
				})
		}else if(newImp.modelo == "C911"){
			novocard(newImp.id)
			c911Promise(newImp.ip)
				.then(function(response){	
					Atualiza(newImp.id,response)
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


function novocard(id){
	//divCard
	var divcardElement = document.createElement('a')
	divcardElement.setAttribute('class','card')
	divcardElement.setAttribute('id',id)

	//textoCaregando
	var carregandoText = document.createTextNode("Carregando...")

	divcardElement.appendChild(carregandoText)
	cardsElement.appendChild(divcardElement)	
}
/*function blur(estado,id){
	var divcardElement = document.getElementById(id)
	if(estado==true){	
		divcardElement.style.filter = "blur(2px)"
	}else if(estado == false){
		divcardElement.style.filter = "blur(0px)"
	}
	
}*/


function Atualiza(id,impressora){
	//divCard
	var divcardElement = document.getElementById(id)
	divcardElement.innerHTML='';
	divcardElement.setAttribute('href','http://'+impressora.ip)
	divcardElement.setAttribute('target','_blank')
	/*divcardElement.addEventListener("mouseover",function(event){
		blur(true,id)
	})
	divcardElement.addEventListener("mouseout",function(event){
		blur(false,id)
	})*/

	//Nome
	var divnomeElement = document.createElement('div')
	divnomeElement.setAttribute('class','nomecetor')
	var nomeText = document.createTextNode(impressora.local)

	divnomeElement.appendChild(nomeText)

	//Nomeimp
	var divnomeimpElement = document.createElement('div')
	divnomeimpElement.setAttribute('class','nomeimp')
	var nomeText = document.createTextNode(impressora.nome)

	divnomeimpElement.appendChild(nomeText)
	
	//ip
	var divipElement = document.createElement('div')
	divipElement.setAttribute('class','impip')
	var ipText = document.createTextNode(impressora.ip)

	divipElement.appendChild(ipText)

	//linha
	var divlinhaElement = document.createElement('div')
	divlinhaElement.setAttribute('class','linha')
	
	
	//black
	var divpogressbarbElement = document.createElement('div')
	divpogressbarbElement.setAttribute('class','pogressbarb')
	divpogressbarbElement.style.width = impressora.black+"%";
	/*if(impressora.black < 30){
		divpogressbarbElement.style.color = "black";
	}*/
	var porcentagemb = document.createTextNode(impressora.black+"%")

	divpogressbarbElement.appendChild(porcentagemb)

	//blackShadow
	var divshadowbElement = document.createElement('div')
	divshadowbElement.setAttribute('class','shadowb')
	

	//cyan
	var divpogressbarcElement = document.createElement('div')
	divpogressbarcElement.setAttribute('class','pogressbarc')
	divpogressbarcElement.style.width = impressora.cyan+"%";
	var porcentagemc = document.createTextNode(impressora.cyan+"%")

	divpogressbarcElement.appendChild(porcentagemc)
	
	//cyanShadow
	var divshadowcElement = document.createElement('div')
	divshadowcElement.setAttribute('class','shadowc')
	
	//magenta
	var divpogressbarmElement = document.createElement('div')
	divpogressbarmElement.setAttribute('class','pogressbarm')
	divpogressbarmElement.style.width = impressora.magenta+"%";
	var porcentagemm = document.createTextNode(impressora.magenta+"%")
	

	divpogressbarmElement.appendChild(porcentagemm)
	//magentaShadow
	var divshadowmElement = document.createElement('div')
	divshadowmElement.setAttribute('class','shadowm')

	//yellow
	var divpogressbaryElement = document.createElement('div')
	divpogressbaryElement.setAttribute('class','pogressbary')
	divpogressbaryElement.style.width = impressora.yellow+"%";
	var porcentagemy = document.createTextNode(impressora.yellow+"%")

	divpogressbaryElement.appendChild(porcentagemy)

	//magentaShadow
	var divshadowyElement = document.createElement('div')
	divshadowyElement.setAttribute('class','shadowy')
	

	divcardElement.appendChild(divnomeElement)
	divcardElement.appendChild(divnomeimpElement)
	divcardElement.appendChild(divipElement)
	divcardElement.appendChild(divlinhaElement)
	divcardElement.appendChild(divshadowbElement)
	divcardElement.appendChild(divpogressbarbElement)
	divcardElement.appendChild(divshadowcElement)
	divcardElement.appendChild(divpogressbarcElement)
	divcardElement.appendChild(divshadowmElement)
	divcardElement.appendChild(divpogressbarmElement)
	divcardElement.appendChild(divshadowyElement)
	divcardElement.appendChild(divpogressbaryElement)
	
		
}

var lecadastradas = function(){
 	impressoras.forEach(imp => {
		if(imp.modelo=="C3010"){
			novocard(imp.id)
			c3010Promise(imp.ip,api)
				.then(function(response){	
					
					//cardsVetor.push(response)
					Atualiza(imp.id,response)
				})
		}else if(imp.modelo == "C911"){
			novocard(imp.id)
			c911Promise(imp.ip,api)
				.then(function(response){	
					
					//cardsVetor.push(response)
					Atualiza(imp.id,response)
				})
		}else if(imp.modelo == "M404"){
			novocard(imp.id)
			m404Promise(imp.ip,api)
				.then(function(response){	
					
					//cardsVetor.push(response)
					Atualiza(imp.id,response)
				})
		}
	});
}


selecionaImp()
lecadastradas()
btnCadastro()
adicionaIMP()






