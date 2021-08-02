console.log("Hello Testing");

function Create(event) {
    event.preventDefault();
    var no_of_inputs = document.getElementById("input").value;
    console.log(no_of_inputs);
    tableCreate(no_of_inputs);
}
function tableCreate(no_of_inputs) {
  // var body = document.getElementById('truth_table');
  var pre_table = document.getElementById('tb'); //previous table
  if (typeof pre_table != 'undefined') //deleting previous table
  {
    pre_table.parentNode.removeChild(pre_table);
  }
  table = document.createElement('table')
  table.setAttribute("id", "tb");
  var input_name = 'A';

  var tr = document.createElement('tr');

  for (var a = 0; a < no_of_inputs; a++) {
    var th = document.createElement('th');
    console.log(a);
    console.log(input_name);
    var text = document.createTextNode(input_name);
    th.appendChild(text);
    tr.appendChild(th);
    input_name = String.fromCharCode(input_name.charCodeAt(0) + 1);
  }
  table.appendChild(tr);

  var th = document.createElement('th');
  var text = document.createTextNode("Output");
  th.appendChild(text);
  tr.appendChild(th);

  var no_of_rows = Math.pow(2, no_of_inputs)
  for (var i = 0; i < no_of_rows; i++){
      var tr = document.createElement('tr');

      for (var j = 0; j <= no_of_inputs; j++) {
        var td = document.createElement('td');
        var text = document.createTextNode('Text');
        td.appendChild(text);
        tr.appendChild(td); // appending columns
      }
      table.appendChild(tr);
  }

  document.getElementById("truth_table").appendChild(table); //creating new table
}
