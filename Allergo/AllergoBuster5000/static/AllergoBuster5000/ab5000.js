document.addEventListener('DOMContentLoaded', function() {
	
	document.getElementById('cont1').style.display = 'none';
	document.getElementById('cont2').style.display = 'none';
	document.getElementById('btn1').style.display = 'none';
	
	var d = new Date();
	var h1 = document.getElementsByTagName('H1')[0];
	h1.innerHTML = "Pollenflug - " + d.toLocaleString();
	my_api3();
});


class pollen {
	constructor(name, measure) {
		this.name = name;
		this.measure = measure;
	}
	print() {
		console.log(this.name);
		console.log(this.measure);
	}
}


function showLocation(inItem) {
	inItem.parentNode.parentNode.style.display = 'none';
	//console.log(inItem.childNodes[1].innerHTML);
	translatePlace(inItem.childNodes[1].innerHTML);
}


function my_api2(inItem) {
 // console.log("Hello API2!");
	var top3 = new Array();
	
	fetch('https://epin.lgl.bayern.de/api/measurements?locations=' + inItem.id, {method:'GET'})
		.then(response => response.json()) 
		.then(data => {
//				console.log(data);
//				console.log(data.measurements.length);
				if (data.measurements.length == 0) {return false}
				var a = 0;
				var p = "";
				var out = false;
				var nObj;
				var arr = [new pollen("test", 0)];			
					data.measurements.forEach( (item) => {
						item.data.forEach( (dataItem) => {
							a = a + Math.round(dataItem.value);
							p = item.polle;
						});						
						if (a != 0 ) {
//							console.log(p + " " + a);
							nObj = new pollen(p, a);
//							nObj.print();
							arr.forEach ( (item2) => {
								//console.log(item2.measure);
								if (item2.measure < a && !out) {
	//								console.log("testen");
									arr.splice(arr.indexOf(item2), 0, nObj);
									out = true;
								}	
							});
						}					
						a = 0;
						out = false;
					});
					arr.sort();
					arr.pop();
/*					arr.forEach ( (item) => {
						item.print();
					});
					for (i = 0; i < 3; i++) {
						top3.push(arr[i]); 
						}		
*/
						
					itm = document.getElementById("cont1");
					cln = itm.cloneNode(true);
					//cln.firstElementChild.firstElementChild.innerHTML = item.name;
					cln.childNodes[1].childNodes[1].innerHTML = inItem.name;
//					cln.childNodes[1].childNodes[3].childNodes[1].innerHTML = item.name;
					try {
						cln.childNodes[1].childNodes[3].childNodes[5].childNodes[1].childNodes[1].childNodes[1].innerHTML = translatePolle(arr[0].name, "ld");
						cln.childNodes[1].childNodes[3].childNodes[5].childNodes[1].childNodes[1].childNodes[3].innerHTML = Math.round(arr[0].measure);
						cln.childNodes[1].childNodes[3].childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = translatePolle(arr[1].name, "ld");
						cln.childNodes[1].childNodes[3].childNodes[5].childNodes[1].childNodes[3].childNodes[3].innerHTML = Math.round(arr[1].measure);
						cln.childNodes[1].childNodes[3].childNodes[5].childNodes[1].childNodes[5].childNodes[1].innerHTML = translatePolle(arr[2].name, "ld");
						cln.childNodes[1].childNodes[3].childNodes[5].childNodes[1].childNodes[5].childNodes[3].innerHTML = Math.round(arr[2].measure);
					} catch {
						cln.childNodes[1].childNodes[3].childNodes[5].innerHTML = "No measurements available at the moment.";
					}
					itm.insertAdjacentElement("afterend", cln);
					cln.style.display = 'block';
		})			
		.catch(error => {
          console.log('Error:', error);
        })
        			
	return false;
		
}


function my_api3() {
 // console.log("Hello API3!");
  fetch('https://epin.lgl.bayern.de/api/locations', {method:'GET'})
        .then(response => response.json())
        .then(data => {
			var itm, cln;
			data.forEach( (item) => {my_api2(item)} );
				  
		})
        // Catch any errors and log them to the console
        .catch(error => { console.log('Error:', error) });
        // Prevent default submission
        return false;
}

//onmouseover="bigImg(this)" onmouseout="normalImg(this)

function translateMeLat(item) {
	item.innerHTML = translatePolle(item.innerHTML, "dl");
}

function translateMeDe(item) {
	item.innerHTML = translatePolle(item.innerHTML, "ld");
}

function translatePolle(name, direction) {
	var latName = ["Abies","Acer","Aesculus","Alnus","Ambrosia","Artemisia","Asteraceae","Betula","Carpinus","Castanea","Chenopodium","Corylus","Cruciferae","Cyperaceae","Erica","Fagus","Fraxinus","Fungus","Galium","Humulus","Impatiens","Juglans","Larix","Picea","Pinaceae","Pinus","Plantago","Platanus","Poaceae","Populus","Quercus","Quercus ilex","Rumex","Salix","Sambucus","Secale","Taxus","Tilia","Ulmus","Urtica","Varia"];
	var deName = ["Tanne","Ahorn","Rosskastanie","Erle","Ambrosia","Beifuß / Wermut","Korbblütler","Birke","Hainbuche","Kastanie","Gänsefüße","Hasel","Kreuzblütler","Sauergrasgewächse","Heidekräuter","Buche","Esche","Pilze","Labkräuter","Hopfen","Fleißige Lieschen","Walnus","Lärche","Fichte","Kieferngewächse","Kiefer","Wegeriche","Platane","Süßgräser","Pappel","Eiche","Steineiche","Ampfer","Weide","Holunder","Roggen","Eibe","Linde","Ulme","Brennessel","Varia"];
	if (direction == "ld") {
		if (latName.indexOf(name) !== -1) {
			return deName[latName.indexOf(name)];
		}		
	} else if (direction == "dl") {
		if (deName.indexOf(name) !== -1) {
			return latName[deName.indexOf(name)];
		}		
	} else {return false}
	return false;
}

function translatePlace(name) {
	var returnId;
	fetch('https://epin.lgl.bayern.de/api/locations', {method:'GET'})
        .then(response => response.json())
        .then(data => {
			data.forEach( (item) => {
				//console.log(item.name + " - " + name);
				if (item.name == name) {my_Api4(item)}
			} );				  
		})
        .catch(error => { console.log('Error:', error) });
        return false;
}
