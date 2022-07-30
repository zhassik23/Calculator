// History is container where we store our numbers and signs until we press equal sign(=)
// Result is container where we show output of our arithmetics, or the numbers that we have pressed

// stores history in mind
function getHistory() {
	return document.getElementById("history").innerText;
}

// prints in console history
function printHistory(n) {
	document.getElementById("history").innerText = n;
}

// prints result of our problem in mind
function getResult() {
	return document.getElementById("result").innerText;
}

// prints in console result of our problem
function printResult(n) {
	document.getElementById("result").innerText = n;
}



/* responsible for OPERATORS(like, all clean, delete, and %) */
var operator = document.getElementsByClassName("oper");
// check each operator button
for (var i = 0; i < operator.length; i++) {
	// addEventListener(type, action)
	operator[i].addEventListener('click', takeOperator);
}

function takeOperator() {
	// all clear(AC) operator cancels all info from our console
	if (this.id == "all_clear") {
		/* so our history and result wouldn't contain anything
		when we press this button */
		printHistory("");
		printResult("");
	}

	// delete(C) operator clears one character from result console
	// if we make mistake when writing number
	else if (this.id == "delete") {
		/* changes our result from integer to string, so we can delete it(any character)*/
		var output = getResult().toString();

		if (output) // if output has a value
			output = output.substring(0, output.length - 1); // we delete the last character 
			// so we only print charters with index 0 -> n-1
			// then we print it in out result console
			printResult(output);

		/* if our number is negative and after minus sign(-) it's only 1 number
		it deletes both of them sign and number, otherwise deletes only number*/
		if (output == "-") // if number is a negative
			printResult("");
	}

	// % operator finds mod of two numbers
	else {
		// so we declare history and output variables
		var output = getResult();
		var history = getHistory();

		// if we alredy have smth in our history
		// and we haven't printed anything in result console it does the following actions
		if (output == "" && history != "") {
			if (isNaN(history[history.length - 1])) {
				history = history.substring(0, history.length - 1);
			}
		}


		// so if we alredy have smth in our history
		// and we are already printing smth in result console it does the following actions
		if (output != "" || history != "") {
			// so, we store every sign that we are printing in history
			history = history + output;
			
			// so if we press the equal bytton(=) it evaluatuse calculations and shows result
			if (this.id == "=") {
				// eval == evaluate
				// it evaluatuse calculations
				var result = eval(history);
				// shows result in result console
				printResult(result);
				// and clears history
				printHistory("");
			}

			// so if we don't press the equal bytton(=) it adds new charter to our history
			else {
				// adds new character to our history
				history = history + this.id;
				// shows it in history console
				printHistory(history);
				// unless we press equal bytton(=) it won't show us result
				printResult("");
			}
		}
	}
}



/* responsible for SIGNS(+ - * / =) */
var signs = document.getElementsByClassName("sign");
// check each sign button
for (var i = 0; i < signs.length; i++) {
	// addEventListener(type, action)
	signs[i].addEventListener('click', takeSign);
}

// % operator makes any calculatuion with two numbers
function takeSign() {
	// so we declare history and output variables
	var output = getResult();
	var history = getHistory();

	// if we alredy have smth in our history
	// and we haven't printed anything in result console it does the following actions
	if (output == "" && history != "") {
		if (isNaN(history[history.length - 1])) {
			history = history.substring(0, history.length - 1);
		}
	}

	// so if we alredy have smth in our history
	// and we are already printing smth in result console it does the following actions
	if (output != "" || history != "") {
		// so, we store every sign that we are printing in history
		history = history + output;
			
		// so if we press the equal button(=) it evaluatuse calculations and shows result
		if (this.id == "=") {
			// eval == evaluate
			// it evaluatuse calculations
			var result = eval(history);
			// shows result in result console
			// if it is very long result it will be shown outside of display. so instead of it we will print string
			if (result.toString().length > 14) {
				printResult("Very big number!");
			}
			else {
				printResult(result);
			}
			// and clears history
			printHistory("");
		}

		// so if we don't press the equal bytton(=) it adds new charter to our history
		else {
			// adds new character to our history
			history = history + this.id;
			// shows it in history console
			printHistory(history);
			// unless we press equal bytton(=) it won't show us result
			printResult("");
		}
	}
}



/* responsible for NUMBERS(0-9) and DOT */
var number = document.getElementsByClassName("numb");
// check each number button
for (var i = 0; i < number.length; i++) {
	// addEventListener(type, action)
	number[i].addEventListener('click', takeNumber);
}

function takeNumber() {
	// so we declare  output variables
	var output = getResult();
	
	// check it it is output(if not a number is false)
	if (output != NaN) { // if output is a number
		// if we are going to add first character we can't add 0 or dot(.)
		// number can't start with 0 ot dot(.)
		if (output == "") {
			// so if we press this two characters
			if (this.id == "0" || this.id == ".")
				// it shows us empty string
				printResult(output);
			
			// if we are going to add any character except 0 and dot(.) 
			else {
				/* we only take the number we have pressed 
				and print it */
				output = this.id;
				printResult(output);
			}
		}

		// if we are alredy added at least one character 
		// we can add 0 or dot(.)
		// but we can add only 1 dot(.) character
		else {
			if (output.length < 14) {
				// so we count dots
				// if we prees dot(.) character button
				if (this.id == ".") {
					// we use count, equalate it with 0(initially)
					var count = 0;
					// check if our number contain dot(.)
					for (var i = 0; i < output.length; i++) {
						// if it has dot(.) we plus 1 to count
						if (output[i] == ".")
							count++;
					}

					// then check if number of dots(.) is less than 1
					// so if our number doesn't have any dot
					if (count < 1) {
						// we add dot  to our number and print it
						output = output + this.id;
						printResult(output);
					}
				}

				// if we prees any character button except dot(.) character button
				else {
					// we only add it to our number and print it
					output = output + this.id;
					printResult(output);
				}
			}
		}
	}
}