//----------------------------Get Async Data from Controller / Model--------------------------------------------


async function getData() {
  const response = await fetch('/meine_pollen', {
    method: 'POST'
  })
  const result = await response.json();
  return result;
}

//----------------------------Factor Data for Graphic--------------------------------------------


function doGetData(){
  history.pushState({Page: "Meine Pollen"}, "", "/Meine_Pollen");
  var d = new Array;
  nonGraphOff();
  getData().then(result => {
      var a = new Array();
      var b = new Array();
      var c;
      for (i in result) {
        for (j in result[i]) {
          a.push(j);
          b.push(result[i][j]);
        }
        a.shift();
        c = b.shift();
        d.push(a,);
        d.push(b);
        d.push(c);
        a = [];
        b = [];
        c = "";
      }
      plotGraph(d);   
    });
    return true;
  }  

//----------------------------Clear Index Page--------------------------------------------


function nonGraphOff(){
  document.getElementById("div1").style.display = "none";
  document.getElementById("withGraphOut_0").style.display = "none";
  document.getElementById("withGraphOut_1").style.display = "none";
//  document.getElementsByTagName('H1')[0].innerHTML = "Meine Pollen";
  document.getElementsByTagName('H1')[0].innerHTML = "My Pollen";
}


//----------------------------Display Graphics--------------------------------------------


function plotGraph(d){
  for (i in d[0]){
    if (d[0][i] == "Quercus_ilex"){ d[0][i] = "Quercus ilex" } 
    d[0][i] = translatePolle(d[0][i], "ld");
  }
  
  var trace1 = {
    x: d[0],
    y: d[1],
    name: translateFeeling(d[2]),
    type: 'bar'
  };
  
  if (d.length > 3) {
    for (i in d[3]){
      if (d[3][i] == "Quercus_ilex"){ d[3][i] = "Quercus ilex" } 
      d[3][i] = translatePolle(d[3][i], "ld"); 
    }    
    var trace2 = {
      x: d[3],
      y: d[4],
      name: translateFeeling(d[5]),
      type: 'bar'
    };
  }
  
  if (d.length > 6){
    for (i in d[6]){
      if (d[6][i] == "Quercus_ilex"){ d[6][i] = "Quercus ilex" } 
      d[6][i] = translatePolle(d[6][i], "ld"); 
    }    

    var trace3 = {
      x: d[6],
      y: d[7],
      name: translateFeeling(d[8]),
      type: 'bar'
    };
  }

  if (trace3 != undefined){
    var data = [trace1, trace2, trace3];
  } else if (trace2 != undefined){
    var data = [trace1, trace2];
  } else {
    var data = [trace1];
  }
  
  //var layout = {barmode: 'group',  title: 'Durchschnittliche Pollen pro m³'};
  var layout = {barmode: 'group',  title: 'average pollen per m³'};
  Plotly.newPlot("SC", data, layout);
}