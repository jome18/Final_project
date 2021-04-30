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
    var d = new Array();        
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
      d.push(makeDataObj(a, b, c));
      a = [];
      b = [];
      c = "";
    }
    console.log(d[0]);
    f = new Array(2);
    f[0] = d[0];
    f[1] = d[1];
    var layout = {barmode: 'group'};
    Plotly.newPlot("SC", f, layout);
  }); 
  return true;
}

function makeDataObj(a, b, c){
  
  var trace1 = [
    {
      x: a,
      y: b,
      name: c,
      type: 'bar'
    }
  ];
  return trace1;
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