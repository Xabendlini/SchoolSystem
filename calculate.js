const inputField = document.getElementById("input-field");
// const resultField = document.getElementById("result");
let memory = 0;

function showNumber(value) {
    inputField.value += value;
}

function evaluateExpression() {
    try {
    inputField.value = eval(inputField.value)
    } catch (error) {
        inputField.value = "Error";
    }

    
}

function percentage(){
    let inputField = document.getElementById("input-field").value

    let result = eval(inputField)

    result = result/100

    document.getElementById("input-field").value = result
}

function backspace(){
    inputField.value = ''
}

function susaLento() {
    inputField.value = '';
}



function memoryRecall() {
    inputField.value = memory;
}

function memoryAdd() {
    let currentValue = parseFloat(inputField.value);
    if (!isNaN(currentValue)) {
        memory += currentValue;
    }
    inputField.value = '';
}

function memorySubtract() {
    let currentValue = parseFloat(inputField.value);
    if (!isNaN(currentValue)) {
        memory -= currentValue;
    }
    inputField.value = '';
}

document.querySelector(".m-button[value='MR']").onclick = memoryRecall;
document.querySelector(".m-button[value='M+']").onclick = memoryAdd;
document.querySelector(".m-button[value='M-']").onclick = memorySubtract;


function calculateSquareRoot() {
    let currentValue = parseFloat(inputField.value);
    if (!isNaN(currentValue)) {
        inputField.value = Math.sqrt(currentValue);
    } else {
        inputField.value = "Error";
    }
}
