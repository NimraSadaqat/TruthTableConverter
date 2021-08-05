console.log("Hello Testing");
const url = window.location.href

function Create(event) {
    event.preventDefault();
    var no_of_inputs = document.getElementById("input").value;
    tableCreate(no_of_inputs);
}
function tableCreate(no_of_inputs) {
  var pre_table = document.getElementById('tb'); //previous table
  if (typeof pre_table != 'undefined') //deleting previous table
  {
    pre_table.parentNode.removeChild(pre_table);
  }
  var be = document.getElementById('be'); //deleting previous be button
  if ( be != null )
  {
    be.remove();
  }

  var circuit = document.getElementById('circuit'); //deleting previous circuit button
  if ( circuit != null )
  {
    circuit.remove();
  }
  var ex = document.getElementById('expression'); //deleting previous boolean_expression
  if ( ex != null )
  {
    ex.remove();
  }
  table = document.createElement('table')
  table.setAttribute("id", "tb");
  var input_name = 'A';

  var tr = document.createElement('tr');

  for (var a = 0; a < no_of_inputs; a++) {
    var th = document.createElement('th');
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
console.log(Math.pow(2, 1));
  var no_of_rows = Math.pow(2, no_of_inputs)
    for (var i = 0; i < no_of_rows*2; i++){
        var tr = document.createElement('tr');
        for (var j = no_of_inputs; j >= 0; j--) {
          if (i%2==0) {
            if (j!=0){
              var td = document.createElement('td');
              var value = (i & Math.pow(2,j)) ? 1 : 0
              var text = document.createTextNode(value);
              td.appendChild(text);
              tr.appendChild(td); // appending inputs
            }
            else {
              var td = document.createElement('td');
              var FN = document.createElement("input");
              FN.setAttribute("type", "number");
              FN.setAttribute("class", "out");
              FN.setAttribute("name", i/2);
              FN.setAttribute("min", "0");
              FN.setAttribute("max", "1");
              FN.setAttribute("required", "True");
              td.appendChild(FN);
              tr.appendChild(td); // appending outputs
            }
          }
          }
      table.appendChild(tr); //appending rows
  }

  document.getElementById("truth_table").appendChild(table); //creating new table
  // create a boolean_expression button
  var be = document.createElement("button");
  be.setAttribute("id", "be");
  be.setAttribute("type", "submit");
  be.setAttribute("class", "btn btn-primary mr-3");
  be.innerHTML = "Generate Boolean Expression";
  document.getElementById("truth_table").appendChild(be);

  // create a circuit button
  var circuit = document.createElement("button");
  circuit.setAttribute("id", "circuit");
  circuit.setAttribute("type", "submit");
  circuit.setAttribute("class", "btn btn-primary m-3");
  circuit.innerHTML = "Generate Circuit";
  circuit.setAttribute("onclick","init();")
  document.getElementById("truth_table").appendChild(circuit);

}

const outputForm = document.getElementById('output-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

function sendData(event) {
  event.preventDefault();
  const elements = [...document.getElementsByClassName('out')]
  const data = {}
  data['csrfmiddlewaretoken'] = csrf[0].value
  elements.forEach(el=>{
        data[el.name] = el.value
      })
  console.log(data);

  $.ajax({
      type: 'POST',
      url: `${url}convert/`,
      data: data,
      success: function(response){
        const boolean_expression_text = response.results
        const boolean_expression = response.expression
        console.log(boolean_expression)
        const resDiv = document.createElement("div")
        resDiv.innerHTML += boolean_expression_text
        const cls = ['container', 'p-3', 'text-light', 'h6', 'bg-success', 'text-center']
        resDiv.classList.add(...cls)
        resDiv.setAttribute("id", "expression");
        document.getElementById("truth_table").append(resDiv)
        },
        error: function(error){
          console.log(error)
        }
      })
}

function createDiagram() {
  var $ = go.GraphObject.make;  // for conciseness in defining templates

        myDiagram =
          $(go.Diagram, "myDiagramDiv");

        // the template for each item in a node's array of item data
        var itemTempl =
          $(go.Panel, "TableColumn",
            $(go.Shape,
              { row: 0, alignment: go.Spot.Bottom },
              { fill: "slateblue", stroke: null, width: 40 },
              new go.Binding("height", "val"),
              new go.Binding("fill", "color")),
            $(go.TextBlock,
              { row: 1 },
              new go.Binding("text")),
            {
              toolTip:
                $("ToolTip",
                  $(go.TextBlock, { margin: 4 },
                    new go.Binding("text", "val"))
                )
            }
          );

        myDiagram.nodeTemplate =
          $(go.Node, "Auto",
            $(go.Shape,
              { fill: "white" }),
            $(go.Panel, "Vertical",
              $(go.Panel, "Table",
                { margin: 6, itemTemplate: itemTempl },
                new go.Binding("itemArray", "items")),
              $(go.TextBlock,
                { font: "bold 12pt sans-serif" },
                new go.Binding("text"))
            )
          );

        var nodeDataArray = [
          {
            key: 1,
            text: "Before",
            items: [{ text: "first", val: 50 },
            { text: "second", val: 70 },
            { text: "third", val: 60 },
            { text: "fourth", val: 80 }]
          },
          {
            key: 2,
            text: "After",
            items: [{ text: "first", val: 50 },
            { text: "second", val: 70 },
            { text: "third", val: 75, color: "red" },
            { text: "fourth", val: 80 }]
          }
        ];
        var linkDataArray = [
          { from: 1, to: 2 }
        ];
        myDiagram.model = $(go.GraphLinksModel,
          {
            copiesArrays: true,
            copiesArrayObjects: true,
            nodeDataArray: nodeDataArray,
            linkDataArray: linkDataArray
          });
}
function init() {
      var $ = go.GraphObject.make;  // for conciseness in defining templates
      var myDiagram =
      $(go.Diagram, "myDiagramDiv",
    { // enable Ctrl-Z to undo and Ctrl-Y to redo
      "undoManager.isEnabled": true
    });

      var nodeDataArray = [
      { key: "Alpha"},
      { key: "Beta"}
      ];
      var linkDataArray = [
      { to: "Beta", from: "Alpha"}
      ];
      myDiagram.model = new go.GraphLinksModel(nodeDataArray,linkDataArray);
      myDiagram.nodeTemplate =
      $(go.Node, "Auto",
      $(go.Shape, "AndGate", shapeStyle()),
      $(go.TextBlock, "And")
        )
    }
