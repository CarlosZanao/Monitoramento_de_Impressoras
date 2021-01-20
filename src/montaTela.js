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
function animacaoBar(elemento,porcentagem,tipo){
    if(tipo == "pb"){
        var height = 7;
        setInterval(frame, 10);
        function frame() {
            if(porcentagem <= 0){
               elemento.style.backgroundColor= rgb(184, 180, 180);
               elemento.style.color = black;
            }
            if ((height*1.5) < (porcentagem*1.5)) {
                height++; 
                elemento.style.height = height*1.5+"px";
                elemento.style.marginTop = "-"+height*1.5+"px";
            }
        } 
    }else{
        var width = 0;
        setInterval(frame, 7);
        function frame() {
          if (width < porcentagem) {
            width++; 
            elemento.style.width = width + '%'; 
          }
        }
    }
}

function removeIMP(id){
	api.post("imp/rmimpressora",{"id":id})
	.then(function(response){
        
        var cardElement = document.getElementById(id)
        cardElement.style.opacit = "30%";
		var cardsElement = document.getElementById('cards');
		cardsElement.removeChild(cardElement)
	})
	.catch((err) => {
        console.error("Não foi possivel remover a impressora")
        alert("Não foi possivel remover a impressora ("+err+")")
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
        
        var porcentagemb = document.createTextNode(impressora.black+"%")

        divpogressbarbElement.appendChild(porcentagemb)

        animacaoBar(divpogressbarbElement,impressora.black,tipo)
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
        var porcentagemb = document.createTextNode(impressora.black+"%")
        
        divpogressbarbElement.appendChild(porcentagemb)
        animacaoBar(divpogressbarbElement,impressora.black,tipo)
        //blackShadow
        var divshadowbElement = document.createElement('div')
        divshadowbElement.setAttribute('class','shadowb')
        
        //cyan
        var divpogressbarcElement = document.createElement('div')
        divpogressbarcElement.setAttribute('class','pogressbarc')
        var porcentagemc = document.createTextNode(impressora.cyan+"%")

        divpogressbarcElement.appendChild(porcentagemc)
        animacaoBar(divpogressbarcElement,impressora.cyan,tipo)
        //cyanShadow
        var divshadowcElement = document.createElement('div')
        divshadowcElement.setAttribute('class','shadowc')
        
        //magenta
        var divpogressbarmElement = document.createElement('div')
        divpogressbarmElement.setAttribute('class','pogressbarm')
        var porcentagemm = document.createTextNode(impressora.magenta+"%")
    
        divpogressbarmElement.appendChild(porcentagemm)
        animacaoBar(divpogressbarmElement,impressora.magenta,tipo)
        //magentaShadow
        var divshadowmElement = document.createElement('div')
        divshadowmElement.setAttribute('class','shadowm')

        //yellow
        var divpogressbaryElement = document.createElement('div')
        divpogressbaryElement.setAttribute('class','pogressbary')
        var porcentagemy = document.createTextNode(impressora.yellow+"%")

        divpogressbaryElement.appendChild(porcentagemy)
        animacaoBar(divpogressbaryElement,impressora.yellow,tipo)
        //YellowShadow
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
