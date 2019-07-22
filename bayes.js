// Variables to store data
var serverRequest = [], badRequest = [], bayesTheory = [], bayesTheoryEachOfValue = [];
var i = 0, j = 0, counter = 0, counterBad = 0, checkValue = 0, checkValueBad = 0, sumRequest = 0, countColor = 1;
var str = "", strBad = "", rowColor = '<tr>';
var red = 0, green = 0, blue = 0, rgbValue;
// boolean var
var equalValid, emptyValid, sumValid, madeEmptySpace;


// DOM Elements
var server = document.getElementById("server");
var serverRequest = document.getElementById("serverRequest");
var badRequest = document.getElementById("badRequest");
var table = document.getElementById("table");
var tableData = document.getElementById("tableData").style;
var tableColor = document.getElementById("tableColors");
var button = document.getElementById("generate_button");

// Store each request and badRequest value
function storeInputValues() {
    stringRequestValue = serverRequest.value;
    stringBadRequestValue = badRequest.value;
    
    for (i = 0; i < stringRequestValue.length; i++) {
        while( (stringRequestValue[counter] != " " ) && (counter <= stringRequestValue.length -1) ) {
            str += stringRequestValue.slice(counter, counter + 1);
            counter++;
        }
        if(counter <= stringRequestValue.length) {
            serverRequest[i] = str;
            checkValue++;
            sumRequest += Number(str);
            str = "";
            counter++;
        } else {
            counter = 0;
            break;   
        }
    }
    
    for(j = 0; j < stringBadRequestValue.length; j++) {
        while( (stringBadRequestValue[counterBad] != " " ) && (counterBad <= stringBadRequestValue.length-1) ) {
            strBad += stringBadRequestValue.slice(counterBad, counterBad + 1);
            counterBad++;
        }
        if(counterBad <= stringBadRequestValue.length) {
            badRequest[j] = strBad;
            checkValueBad++;
            strBad = "";
            counterBad++;
        } else {
            counter = 0;
            break;   
        }
    }
}

//Check the inputs matching validation
function checkValidation() {
    serverValue = server.value;
    serverRequestValue = serverRequest.value.length;
    serverBadRequestValue = badRequest.value.length;
    
    if(serverValue == "" || serverRequestValue == "" || serverBadRequestValue == "") {
        emptyValid = true;
    } if(sumRequest > 100){
        sumValid = true;
    } if ((serverValue == checkValue) && (serverValue == checkValueBad)) {
        equalValid = true;
    } if(emptyValid == true && sumValid == true && equalValid == true) {
        madeEmptySpace = false;
    } else {
        madeEmptySpace = true;
    }
}

// Calculate probability of each badRequest
function bayesTheorem() {
    summationOfRequestedValues = 0;
    storeDivison = 0;
    for (i = 0; i < serverValue; i++) {
        storeDivison = (badRequest[i] / 100) * (serverRequest[i] / 100);
        bayesTheory[i] = storeDivison;
        summationOfRequestedValues += storeDivison;
    }
    
    for (j = 0; j < serverValue; j++) {
        bayesTheoryEachOfValue[j] = (bayesTheory[j] / summationOfRequestedValues);
    }
}

// This function is attached on Check probability button and intended to display the correct Bar Graph
function generateBarGraph() {
    storeInputValues();
    checkValidation();
    bayesTheorem();
    if(emptyValid) {
        alert("Please fill in the input fields");
        reload();
    } else if(sumValid){
        alert("Sum of entered request values exceeds 100!");
        reload();
    } else if(equalValid) {
        // Generate Bar Graph
        makeGraph();
        button.disabled = true;
        button.style.cursor = "not-allowed";
        server.disabled = true;
        serverRequest.disabled = true;
        badRequest.disabled = true;
    } else if(madeEmptySpace) {
        alert("You made more spaces between numbers or Number of values doesn't equal the number os servers!");
        reload();
    }

}

// Set the widthes of bars
function makeGraph() {
    serverValue = server.value;
    row = "";
    count = 1;
    value = 0;
    for (i = 0; i < serverValue; i++) {
        row += '<tr>';
        for (j = 0; j < 2; j++) {
            if(count%2 == 0) {
                value = bayesTheoryEachOfValue[i].toFixed(4) * 900;
                generateRGB();
                row += '<td> <div class="div" style="width:' + value + 'px; background:' + colorValue + ';">&nbsp;</div></td>';
                showColorsOfServers();
            } else {
                value = bayesTheoryEachOfValue[i].toFixed(4);
                row += '<td class="td_odd">' + value + '%</td>';
            }
            count++;
        }
        row += '</tr>';
    }
    table.innerHTML = row;
    rowColor += '</tr>';
    tableColor.innerHTML = rowColor;
    tableData.visibility = "visible";
}

// Set all variables to zero, reload page
function reload() {
    clearAllInputs();
    tableData.visibility = "hidden";
    location.reload();
}

// Clear all input fields after generating results
function clearAllInputs() {
    server.value = "";
    serverRequest.value = "";
    badRequest.value = "";
    checkValue = 0;
    checkValueBad = 0;
}

// Get new color each of generated bar graph
function generateRGB() {
    red = Math.floor(Math.random()*255 + 1);
    green = Math.floor(Math.random()*255 + 1);
    blue = Math.floor(Math.random()*255 + 1);
    colorValue = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

// Get the name and color of server from bar graph
function showColorsOfServers() {
    rowColor += '<td>' + countColor + '.server <div class="color" style="background:' + colorValue + ';"></div></td>';
    countColor++;
}
