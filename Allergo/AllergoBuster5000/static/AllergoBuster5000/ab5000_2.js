/*
fetch('/emails/100', {
  method: 'PUT',
  body: JSON.stringify({
      archived: true
  })
})
*/

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