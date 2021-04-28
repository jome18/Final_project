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
    for (i in result) {
      for (j in result[i]) {
        a.push(j);
        console.log(j);
        b.push(result[i][j]);
        console.log(result[i][j]);
      }
    }
    a.shift();
    c = b.shift();
    plotGraph(a, b, c);
  }); 
}



function fillArray(){
  a = ['giraffes', 'orangutans', 'apes'];
  b = [20, 14, 23];
  plotGraph(a, b);
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
    title: c,
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

  Plotly.newPlot('myGraph', data, layout);

  document.getElementById("div1").style.display = "none";
  document.getElementById("withGraphOut_0").style.display = "none";
  document.getElementById("withGraphOut_1").style.display = "none";
	document.getElementsByTagName('H1')[0].innerHTML = "Meine Pollen";

}