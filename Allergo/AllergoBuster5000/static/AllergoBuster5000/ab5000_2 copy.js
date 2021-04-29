function saveData1(poObjArray) {
    fetch('/saveData', {
      method: 'POST',
      body: JSON.stringify(poObjArray)
    })
  .then(response => response.json())
  .then(result => {
     // Print result
      console.log(result.Message);
      document.getElementById("btn1").innerHTML = result.Message;
  })  
}


function getData() {
  fetch('/meine_pollen', {
    method: 'POST'
  })
.then(response => response.json())
.then(result => {
    var a = new Array();
    var b = new Array();
    var c;        
    nonGraphOff();
    for (i in result) {
      for (j in result[i]) {
        a.push(j);
        console.log(j);
        b.push(result[i][j]);
        console.log(result[i][j]);
      }
      a.shift();
      c = b.shift();
      plotGraph(a, b, c);
      a = [];
      b = [];
      c = "";
    }
  }); 
  return true;
}



function nonGraphOff(){
  document.getElementById("div1").style.display = "none";
  document.getElementById("withGraphOut_0").style.display = "none";
  document.getElementById("withGraphOut_1").style.display = "none";
  document.getElementsByTagName('H1')[0].innerHTML = "Meine Pollen";
}

function translateFeeling(name){
  categories = {
    'SS': 'Sehr Schlecht',
    'SC': 'Schlecht',
    'NM': 'Normal',
    'GT': 'Gut',
    'SG': 'Sehr Gut'
  }
  for (i in categories)
    if (name == i){
      name = categories[i];
    }
  return name;
}

function plotGraph(a, b, c){
  var data = [
    {
      x: a,
      y: b,
      type: 'bar'
    }
  ];
  var layout = {
    title: translateFeeling(c),
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: -45
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };

  Plotly.newPlot(c, data, layout);

}