"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _axios = _interopRequireDefault(require("axios"));

var montaTela = _interopRequireWildcard(require("/src/montaTela.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//axios
var api = _axios["default"].create({
  baseURL: "http://192.168.26.192:3303/api"
});

var impressoras = [{
  "id": "0",
  "modelo": "c3010",
  "ip": "192.168.31.122",
  "tipo": "color"
}, {
  "id": "1",
  "modelo": "c3010",
  "ip": "192.168.31.187",
  "tipo": "color"
}, {
  "id": "2",
  "modelo": "c3010",
  "ip": "192.168.31.158",
  "tipo": "color"
}, {
  "id": "3",
  "modelo": "c911",
  "ip": "192.168.31.118",
  "tipo": "color"
}, {
  "id": "4",
  "modelo": "m404",
  "ip": "192.168.31.125",
  "tipo": "pb"
}, {
  "id": "5",
  "modelo": "e50145",
  "ip": "192.168.31.228",
  "tipo": "pb"
}, {
  "id": "6",
  "modelo": "e52645",
  "ip": "192.168.31.168",
  "tipo": "pb"
}];
var molelos = ['C3010', 'C911'];
var visivel = false;

function selecionaImp() {
  molelos.forEach(function (modelo) {
    var inputModelo = document.getElementById('inputmodelo');
    var dropdownC = document.getElementById("imps");
    var aElemente = document.createElement('a');
    aElemente.addEventListener("click", function (event) {
      inputModelo.setAttribute("value", modelo);
    });
    aElemente.style["float"] = "left";
    var modeloText = document.createTextNode(modelo);
    aElemente.appendChild(modeloText);
    dropdownC.appendChild(aElemente);
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


function btnCadastro() {
  var addBtn = document.getElementById("addbtn");
  addBtn.addEventListener("click", function (event) {
    mostraForm(visivel);

    if (visivel == false) {
      visivel = true;
    } else {
      visivel = false;
    }
  });
}

function mostraForm(valor) {
  var addIp = document.getElementById("ipAdd");

  if (valor == false) {
    addIp.style.display = "block";
  } else {
    addIp.style.display = "none";
  }
}

var lecadastradas = function lecadastradas() {
  impressoras.forEach(function (imp) {
    montaTela.novocard(imp.id);
    api.post("imp/", {
      "imp": {
        "modelo": "".concat(imp.modelo),
        "ip": imp.ip
      }
    }).then(function (response) {
      montaTela.Atualiza(imp.id, response.data.imp, imp.tipo);
    })["catch"](function (err) {
      console.error("ops! ocorreu um erro" + err);
    });
  });
};

selecionaImp();
lecadastradas();
btnCadastro(); //adicionaIMP()
