/*
fetch('/emails/100', {
  method: 'PUT',
  body: JSON.stringify({
      archived: true
  })
})
*/

function saveData1(poObjArray) {
    console.log("Welcome to saveData1");
    fetch('/saveData', {
      method: 'POST',
      body: JSON.stringify(poObjArray)
    })
  .then(response => response.json())
  .then(result => {
     // Print result
      console.log(result);
  })
  console.log("saveData1 has finished.");
}