export default function c3010Promise(ip,api){
	return new Promise(function(resolve, reject){
		var c3010 = {}
		var url ="http://"+api+"/"+ip+"/sws/app/information/home/home.json";//Sua URL
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url);
		xhttp.send(null);
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				// Typical action to be performed when the document is ready:
				var json = xhttp.responseText;
				json = json.split(",")
				var local = json[8].replace(/location: "/g,'')
				local = local.replace(/"/g,'')
				var nome = json[6].match(/PRN.../)
				var ip = json[10].replace(/ip_addr: "/g,'')
				ip = ip.replace(/"/g,'')
				var black = json[18].replace(/\D/gim, '')
				var cyan = json[22].replace(/\D/gim, '')
				var magenta = json[26].replace(/\D/gim, '')
				var yellow = json[30].replace(/\D/gim, '')
				
			
				resolve(c3010 = {
					"local":local,
					"nome":nome,
					"ip":ip,
					"black":black,
					"cyan":cyan,
					"magenta":magenta,
					"yellow":yellow,
				})
				
			}
		};			
});
}