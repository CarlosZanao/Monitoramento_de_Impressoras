export default function c911Promise(ip,api){
	return new Promise(function(resolve, reject){
		var c911 = {}
		var url = "http://"+api+"/"+ip+"/status.htm";//Sua URL
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url);
		xhttp.send(null);
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				// Typical action to be performed when the document is ready:
				var html = xhttp.responseText;
				var filtro = html.match(/width="180">.*/g)
				var local = filtro[2].replace(/width="180">/,"")
				local = local.replace(/<\/td>/,"")
				var nome = filtro[0].replace(/width="180">/,"")
				nome = nome.replace(/<\/td>/,"")
				
				var toners = html.match(/<font id="smsz">\d\d/g)
				
				for (let index = 0; index < 4; index++) {
					toners[index] = toners[index].match(/\d\d/g)	
				}
				resolve(c911 = {
					"local":local,
					"nome":nome,
					"ip":ip,
					"black":toners[3],
					"cyan":toners[0],
					"magenta":toners[1],
					"yellow":toners[2],
				})
			
			}
		};			
});
}