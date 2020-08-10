var $ = require('jquery');
var algo = require('./Logic');
var input = "";
var memory = "";

var digits = false;
var radians = true;
var phi = 0;
var pow = 0;

$(".btn").click(function() {
    var value = $(this).val();

    // When there is/are operator(s), the following char will be a single-digit valueber.
    if (input.length >= 2){
        if ((value == '.' || value.charCodeAt(0) > 47 && value.charCodeAt(0) < 58) && 
        (input[input.length - 1] == '.' || input[input.length - 1].charCodeAt(0) > 47 &&  input[input.length - 1].charCodeAt(0) < 58)){
            digits = true;
        }
        else{
            input += ' ';
            digits = false;
        }
    }
    
    if (value == 'ANS'){
        if (memory.length > 0){
            document.form.textview.value += "ANS";
            input += memory;
        }
        else{
            memory += document.form.textview.value;
            document.form.textview.value = "";
            input = "";
        }
    }
    else if (value == 'RAD'){
        radians = false;
        document.getElementById("mode").value = "DEG";
    }
    else if (value == 'DEG'){
        radians = true;
        document.getElementById("mode").value = "RAD";
    }
    else if (value == 'n!'){
        document.form.textview.value += '!';
        input += '!';
    }
    else if (value == 'nCr'){
        document.form.textview.value += 'C';
        input += 'C';
    }
    else if (value == 'nPr'){
        document.form.textview.value += 'P';
        input += 'P';
    }
    else if (value == '\u2211'){
        document.form.textview.value += 'sum';
        input += 'sum';
    }
    else if (value == '\u220F'){
        document.form.textview.value += 'sumGeo';
        input += 'geo';
    }
    else if (value == '%'){
        document.form.textview.value += '%';
        input += '%';
    }
    else if (value == 'GCD'){
        document.form.textview.value += 'GCD';
        input += 'GCD';
    }
    else if (value == 'LCM'){
        document.form.textview.value += 'LCM';
        input += 'LCM';
    }
    else if (value == 'hyp'){
        inverse = true;
    }
    else if (value == "sin"){
        document.form.textview.value += "sin";
        input += "sin";
    }
    else if (value == "cos"){
        document.form.textview.value += "cos";
        input += "cos";
    }
    else if (value == "tan"){
        document.form.textview.value += "tan";
        input += "tan";
    }
    else if (value == 'π'){
        document.form.textview.value += "π";
        input += (Math.PI).toString();
    }
    else if (value == 'π'){
        document.form.textview.value += "π";
        input += (Math.PI).toString();
    }
    else if (value == '\u0065'){
        document.form.textview.value += "\u0065";
        input += (Math.E).toString();
    }
    else if (value == '\u0278'){
        document.form.textview.value += "\u0278";

        // Find the root of x^2 - x + 1 = 0 to get phi constant 
        phi = (1 + Math.sqrt(5)) / 2;
        input += phi.toString();
    }
    else if (value == '\u002B'){
        document.form.textview.value += '\u002B';
        input += '+';
    }
    else if (value == '\u2212'){
        document.form.textview.value += '\u2212';
        input += '-';
    }
    else if (value == '\u00D7'){
        document.form.textview.value += '\u00D7';
        input += '*';
    }
    else if (value == '\u00F7'){
        document.form.textview.value += '\u00F7';
        input += '/';
    }
    else if (value == 'yˣ'){
        document.form.textview.value += '^'
        input += '^'
    }
    else if (value == 'ˣ√'){
        document.form.textview.value += 'ˣ√';
        if (input.charCodeAt(input.length - 1) > 47 && input.charCodeAt(input.length - 1) < 58){
            temp = input[input.length - 1];
            input = input.replace(input[input.length - 1], '');
            pow = 1 / parseInt(temp);
            input += '^' + pow.toString();
            input += ' ';
        }
        else{
            input += "^0.5 ";
        }
    }
    else if (value == '√'){
        document.form.textview.value += '√';
        if (input.charCodeAt(input.length - 1) > 47 && input.charCodeAt(input.length - 1) < 58){
            input += "* ^0.5 ";
        }
        else{
            input += "^0.5 ";
        }
    }
    else if (value == 'x\u00B2'){
        document.form.textview.value += '\u00B2';
        input += " ^2 ";
    }
    else if (value == 'x\u207B\u00B9'){
        if (memory.length == 0){
            var temp = document.form.textview.value;
        }
        else{
            var temp = memory;
        }
        document.form.textview.value = '1/(' + temp + ')';
        input = '1/( ' + temp + ' )';
    }
    else if (value == "log"){
        document.form.textview.value += "log";
        input += "log";
    }
    else if (value == "ln"){
        document.form.textview.value += "ln";
        input += "ln";
    }
    else if (value == "Delete"){
        var temp = document.form.textview.value;
        document.form.textview.value = temp.substring(0, temp.length - 1);
        input = input.substring(0, input.length - 2);
    }
    else if (value == "Clear"){
        document.form.textview.value = "";
        input = "";
    }
    else if (value == ','){
        document.form.textview.value += ",";
        input += ",";
    }
    else if (value == '='){
        document.form.textview.value = algo.evaluate(input, radians);
    }
    else if (value == '('){
        document.form.textview.value += "(";
        if (input.charCodeAt(input.length - 1) > 47 && input.charCodeAt(input.length - 1) < 58){
            input += "* (";
        }
        else {
            input += "(";
        }
    }
    else {
        document.form.textview.value += value;
        input += value;
    }
})