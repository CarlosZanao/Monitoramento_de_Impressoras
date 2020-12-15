export {Atualiza,novocard};

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

function novocard(id){
    //divCard
    var cardsElement = document.getElementById('cards');
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