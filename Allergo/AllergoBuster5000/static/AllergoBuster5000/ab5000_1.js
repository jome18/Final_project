var po = new Array();
function saveData() {
	//po.forEach( (it1) => console.log(it1));
	console.log(po);
	saveData1(po);
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
					// if (RowHasValue) {ctr.style.display = 'block'};
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
	document.getElementById('btn1').style.display = 'block';
	return false;
}