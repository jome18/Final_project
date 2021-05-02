//-----------------------------------Get available Locations--------------------------------

function my_api3() {
	fetch('https://epin.lgl.bayern.de/api/locations', {method:'GET'})
		  .then(response => response.json())
		  .then(data => {
			  var itm, cln;
			  data.forEach( (item) => {my_api2(item)} );
					
		  })
		  .catch(error => { console.log('Error:', error) });
		  return false;
  }
  


//-----------------------------------Get Pollen Measurements OVerview for all Locations--------------------------------

function my_api2(inItem) {
 	var top3 = new Array();
	
	fetch('https://epin.lgl.bayern.de/api/measurements?locations=' + inItem.id, {method:'GET'})
		.then(response => response.json()) 
		.then(data => {
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
							nObj = new pollen(p, a);
							arr.forEach ( (item2) => {
								//console.log(item2.measure);
								if (item2.measure < a && !out) {
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

					itm = document.getElementById("cont1");
					cln = itm.cloneNode(true);
					cln.childNodes[1].childNodes[1].innerHTML = inItem.name;
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


//-----------------------------------Get Pollen Measurments for Single Location--------------------------------

function showLocation(inItem) {
	inItem.parentNode.parentNode.style.display = 'none';
	translatePlace(inItem.childNodes[1].innerHTML);
}


function translatePlace(name) {
	history.pushState({Page: name}, "", name);
	var returnId;
	fetch('https://epin.lgl.bayern.de/api/locations', {method:'GET'})
        .then(response => response.json())
        .then(data => {
			data.forEach( (item) => {
	
				if (item.name == name) {my_Api4(item)}
			} );				  
		})
        .catch(error => { console.log('Error:', error) });
        return false;
}


function my_Api4(inItem) {
	var d3 = new Date();
	document.getElementsByTagName('H1')[0].innerHTML = "Pollenflug in " + inItem.name + " - " + d3.toLocaleString();
	var d1, d2;
	var CardHasValue, RowHasValue;
	var gesamt;
	fetched = fetch('https://epin.lgl.bayern.de/api/measurements?locations=' + inItem.id, {method:'GET'})
		.then(response => response.json()) 
		.then(data => {
			data.measurements.forEach( (item1) => {
				CardHasValue = false;
				gesamt = 0;
				itm = document.getElementById("cont2");
				cln = itm.cloneNode(true);
				cln.childNodes[1].childNodes[1].innerHTML = translatePolle(item1.polle, "ld");
				//cln.childNodes[1].childNodes[1].style.display = 'block';
				item1.data.forEach((item2) => {					
					RowHasValue = true;
					try {
						li = cln.childNodes[1].childNodes[3].childNodes[3].childNodes[1];
						cli = li.cloneNode(true);
						d1 = new Date(item2.from*1000);
						d2 = new Date(item2.to*1000);
						cli.childNodes[1].innerHTML = d1.getHours() + " - " + d2.getHours();
						cli.childNodes[2].innerHTML = Math.round(item2.value);
						if (item2.value == 0) {
							RowHasValue = false
							} else {CardHasValue = true;
							gesamt = gesamt + Math.round(item2.value);
							}
					} catch {
						cli.childNodes[1].innerHTML = "No measurements available at the moment.";
					}
					li.insertAdjacentElement("beforebegin", cli);
					cli.style.display = 'block';
					cln.childNodes[1].childNodes[3].childNodes[3].lastElementChild.childNodes[2].innerHTML = gesamt;
				});	
				itm.insertAdjacentElement("afterend", cln);
				cln.childNodes[1].childNodes[3].childNodes[3].lastElementChild.childNodes[1].style.fontWeight = 'bold';
				cln.childNodes[1].childNodes[3].childNodes[3].lastElementChild.childNodes[2].classList.remove("bg-secondary");
				cln.childNodes[1].childNodes[3].childNodes[3].lastElementChild.childNodes[2].classList.add("bg-primary");
				
				if (CardHasValue) {cln.style.display = 'block';
					po.push(new pollen(item1.polle, gesamt))
				};
			});
			return false;
		})	
		.catch(error => {console.log('Error:', error)}
	)
	document.getElementById('div1').style.display = 'block';
	return false;
}