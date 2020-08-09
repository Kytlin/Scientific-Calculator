var square = false;
var cube = false;
var sqrt = false;
var cubert = false;

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function insert(num){
    console.log(typeof num);
    if (num == '^2'){
        square = true;
        document.form.textview.value += '\u00B2';
    } 
    else if (num == '^3'){
        cube = true;
        document.form.textview.value += '\u00B3';
    }
    else if (num == '^(1/2)'){
        sqrt = true;
        document.form.textview.value += '\u221A';
    }
    else if (num == '^(1/3)'){
        cubert = true;
        document.form.textview.value += '\u221B';
    } 
    else{
        document.form.textview.value += num;
    }
}

function equal(){
    var exp = document.form.textview.value;
    if (exp){
        console.log(exp.substring(0, exp.length - 6));
        if (square){
            document.form.textview.value = Math.pow(parseInt(exp.substring(0, exp.length - 1)), 2);
            square = false;
        } 
        else if (cube){
            document.form.textview.value = Math.pow(parseInt(exp.substring(0, exp.length - 1)), 3);
            cube = false;
        } 
        else if (sqrt){
            document.form.textview.value = Math.pow(parseInt(exp.substring(1, exp.length)), 1/2);
            sqrt = false;
        }
        else if (cubert){
            document.form.textview.value = Math.pow(parseInt(exp.substring(1, exp.length)), 1/3);
            cubert = false;
        }
        else {
            document.form.textview.value = eval(exp);
        }
    }
}

function clean(){
    document.form.textview.value = "";
}

function back(){
    var exp = document.form.textview.value;
    document.form.textview.value = exp.substring(0, exp.length - 1);
}