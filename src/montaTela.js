import axios from "axios";
export {Atualiza,novocard,erroMsg};
//axios
const api = axios.create({
	baseURL: "http://192.168.26.192:3303/api",
  });
/*function blur(estado,id){
	var divcardElement = document.getElementById(id)
	if(estado==true){	
		divcardElement.style.filter = "blur(2px)"
	}else if(estado == false){
		divcardElement.style.filter = "blur(0px)"
	}
	
}*/
function removeIMP(id){
	api.post("imp/rmimpressora",{"id":id})
	.then(function(response){
		var cardElement = document.getElementById(id)
		var cardsElement = document.getElementById('cards');
		cardsElement.removeChild(cardElement)
	})
	.catch((err) => {
		console.error("Não foi possivel remover a impressora")
	});

}
function btnDelete(estado,id){
	var divdeletBtnElement = document.getElementById("dell"+id)
	if(estado==true){	
		divdeletBtnElement.style.display = "block"
	}else if(estado == false){
		divdeletBtnElement.style.display = "none"
	}
	
}

function Atualiza(id,impressora,tipo){
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
    divcardElement.addEventListener("mouseover",function(event){
		btnDelete(true,id)
	})
	divcardElement.addEventListener("mouseout",function(event){
		btnDelete(false,id)
	})

    //excluir btn
    var divdeletBtnElement = document.createElement('a')
    divdeletBtnElement.setAttribute('class','deletebtn')
    divdeletBtnElement.setAttribute('id',"dell"+id)
    divdeletBtnElement.setAttribute('href','#')
    divdeletBtnElement.addEventListener("click",function(event){
		removeIMP(id)
    })
    var iconDelete = document.createElement('i')
    iconDelete.setAttribute('class','fas fa-times')

	divdeletBtnElement.appendChild(iconDelete)
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
    //add Elementos
    divcardElement.appendChild(divdeletBtnElement)
    divcardElement.appendChild(divnomeElement)
    divcardElement.appendChild(divnomeimpElement)
    divcardElement.appendChild(divipElement)
    divcardElement.appendChild(divlinhaElement)
    
	if(tipo == "pb"){
        //black
        var divpogressbarbElement = document.createElement('div')
        divpogressbarbElement.setAttribute('class','pogressbarbunica')
        divpogressbarbElement.style.height = impressora.black*1.5+"px";
        divpogressbarbElement.style.marginTop = "-"+impressora.black*1.5+"px";
        /*if(impressora.black < 30){
            divpogressbarbElement.style.color = "black";
        }*/
        var porcentagemb = document.createTextNode(impressora.black+"%")

        divpogressbarbElement.appendChild(porcentagemb)

        //blackShadow
        var divshadowbElement = document.createElement('div')
        divshadowbElement.setAttribute('class','shadowbunica')
        
        //Add Elementos 
        divcardElement.appendChild(divshadowbElement)
        divcardElement.appendChild(divpogressbarbElement)

	}else{
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
        
        //add elementos
        
        divcardElement.appendChild(divshadowbElement)
        divcardElement.appendChild(divpogressbarbElement)
        divcardElement.appendChild(divshadowcElement)
        divcardElement.appendChild(divpogressbarcElement)
        divcardElement.appendChild(divshadowmElement)
        divcardElement.appendChild(divpogressbarmElement)
        divcardElement.appendChild(divshadowyElement)
        divcardElement.appendChild(divpogressbaryElement)
    }	
}

function novocard(id){
    //divCard
    var cardsElement = document.getElementById('cards');
	var divcardElement = document.createElement('a')
	divcardElement.setAttribute('class','card')
	divcardElement.setAttribute('id',id)

    //textoCaregando
	var spanElement = document.createElement('span')
	spanElement.setAttribute('class','spnLoad')
	var carregandoText = document.createTextNode("Carregando...")

    spanElement.appendChild(carregandoText)
	divcardElement.appendChild(spanElement)
	cardsElement.appendChild(divcardElement)	
}
//mensagem de erro
function erroMsg(id,ip){
    //limpa Card
    var divcardElement = document.getElementById(id)
	divcardElement.innerHTML='';

    //textoErro
	var spanerroElement = document.createElement('span')
	spanerroElement.setAttribute('class','spnLoad')
    var erroText = document.createTextNode("Erro ao obter dados")
    
    //textoIP
	var spanipElement = document.createElement('span')
	spanipElement.setAttribute('class','spnLoad')
    var ipText = document.createTextNode("IP: "+ip)
    
    //br element
	var brElement = document.createElement('br')

    spanipElement.appendChild(ipText)
    spanerroElement.appendChild(erroText)
    divcardElement.appendChild(spanerroElement)	
    divcardElement.appendChild(brElement)	
    divcardElement.appendChild(spanipElement)
}
