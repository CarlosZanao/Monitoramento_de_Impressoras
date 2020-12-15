export default function m404Promise(ip,api){
	return new Promise(function(resolve, reject){
		var m404 = {}
		var url = "http://"+api+"/"+ip+"/DevMgmt/ConsumableConfigDyn.xml";//Sua URL
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url);
		xhttp.send(null);
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				// Typical action to be performed when the document is ready:
				var html = xhttp.responseText;
				var porcentagem = html.match(/<dd:ConsumablePercentageLevelRemaining>\d*/g)
				var porcentagem = porcentagem[0].replace(/<dd:ConsumablePercentageLevelRemaining>/,"")
				
				resolve(m404 = {
					"local":"local",
					"nome":"nome",
					"ip":ip,
					"black":porcentagem,
				})
				//console.log(m404)
			
			}
		};			
});
}
