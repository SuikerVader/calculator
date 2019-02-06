let displayView = document.getElementById("display");
let displayData = "";

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

function operate(operator, num1, num2) {
	switch(operator){
		case '+': return add(num1,num2);
		break;
		case '-': return subtract(num1,num2);
		break;
		case 'x': return multiply(num1,num2);
		break;
		case '/': return divide(num1,num2);
		break;
	}
}

function updateDisplay(element){
	displayData += element;
	displayView.innerHTML = displayData;
}

function calculate(){
	displayData += "=";
	let i = 0;
	let arr = [];
	while (displayData[i] != '='){
		if (displayData[i] == '+' || displayData[i] == '-' || displayData[i] == 'x' || displayData[i] == '/' ) {
			arr.push(Number(displayData.substring(0, i)));
			arr.push(displayData[i]);
			displayData = displayData.substring(i+1, displayData.length);
			i = 0;
		}
		i++;
	}
	arr.push(Number(displayData.substring(0, displayData.length - 1)));
	displayData = "";
	for (let j = 0; j < arr.length; j++) {
		if (arr[j] == 'x' || arr[j] == '/') {
			arr[j-1] = operate(arr[j], arr[j-1], arr[j+1]);
			arr.splice(j , j+1);
			j = 0;
		}
	}
	for (let j = 0; j < arr.length; j++) {
		if (arr[j] == '+' || arr[j] == '-') {
			arr[j-1] = operate(arr[j], arr[j-1], arr[j+1]);
			arr.splice(j , j+1);
			j = 0;
		}
	}
	if (isNaN(arr[0])) {
		displayData = "ERROR";
	}else{
		displayData += (Math.round(arr[0] * 100) / 100).toString();
	}
	displayView.innerHTML = displayData;
}

function clearScreen() {
	displayData = "";
	displayView.innerHTML = displayData;
}