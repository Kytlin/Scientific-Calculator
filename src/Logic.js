exports.evaluate = function(input, mode) {
    var signs = []; // Stack (Order of Operations)
    var postFix = []; // Queue (Expression)
    var readPostFix = [] // Another Stack (stores the answer, followed by numbers to compute)

    function isPower(n, k){
        let i = 0;
        while(k > 1){
            k /= n;
            ++i
        }
        if (k == 1){
            return i;
        }
    }

    function gcd(a, b){
        if (b == 0){
            return a;
        }
        else{
            return gcd(b, a % b);
        }
    }

    // Check for irregular operators and evaluate without order of operations
    if (input.includes('!')){
        let num = parseInt(input.substring(0, input.length - 1));
        let fact = 1;
        while (num > 1){
            fact *= num;
            --num;
        }
        return fact;
    }
    else if (input.includes('GCD') || input.includes('LCM')){
        let comma = input.indexOf(',');
        let n = parseInt(input.substring(5, comma - 1));
        let k = parseInt(input.substring(comma + 1, input.length));
        let temp = 0;

        if (!input.includes('(')){
            return "Error: Missing \'(\'";
        }
        else if (!input.includes(')')){
            return "Error: Missing \')\'";
        }

        if (n == k){
            return 1;
        }
        else if (n > k){
            temp = gcd(n, k);
        }
        else{
            temp = gcd(k, n);
        }

        if (input.includes('LCM')){
            return (n * k) / temp;
        }
        else {
            return temp;
        }

    }
    else if (input.includes('C')){
        let c = parseInt(input.indexOf('C'));
        let n = parseInt(input.substring(0, c));
        let r = parseInt(input.substring(c + 1, input.length));
        let k = n - r;
        let nFact = 1;
        let rFact = 1;
        let kFact = 1;
        
        while (n > 1){
            nFact *= n;
            --n;
        }
        while (r > 1){
            rFact *= r;
            --r;
        }
        while (k > 1){
            kFact *= k;
            --k;
        }
        return parseInt(nFact / (rFact * kFact));
    }
    else if (input.includes('P')){
        let c = parseInt(input.indexOf('P'));
        let n = parseInt(input.substring(0, c));
        let r = parseInt(input.substring(c + 1, input.length));
        let k = n - r;
        let fact = 1;

        while (n > k){
            fact *= n;
            --n;
        }
        return fact;
    }
    else if (input.includes('sum') || input.includes('geo') || input.includes('log')){
        if (!input.includes('(')){
            return "Error: Missing \'(\'";
        }
        else if (!input.includes(')')){
            return "Error: Missing \')\'";
        }
        else{
            if (!input.includes(',')){
                let n = parseInt(input.substring(input.indexOf('(') + 1, input.indexOf(')') - 1));
                if (input.includes('sum')){
                    return (n * (n + 1)) / 2
                }
                else if (input.includes('log')){
                    return Math.log(n) * Math.LOG10E;
                }
            }
            else{
                let comma = input.indexOf(',');
                let k = parseInt(input.substring(5, comma - 1));
                let n = parseInt(input.substring(comma + 1, input.length));
                
                if (input.includes('sum')){
                    return ((n + k) * (n - k + 1)) / 2;
                }
                else if (input.includes('geo')){
                    return (Math.pow(k, n + 1) - 1) / (k - 1);
                }
                else if (input.includes('log')){
                    if (isPower(k, n) > 0){
                        return isPower(k, n);
                    }
                    else {
                        return ((Math.log(n) * Math.LOG10E) / (Math.log(k) * Math.LOG10E)).toFixed(12);
                    }
                }
            }
        }
    }
    else if (input.includes('%')){
        let m = input.indexOf('%');
        let n = parseInt(input.substring(0, m));
        let k = parseInt(input.substring(m + 1, input.length));

        return n % k;
    }
    else if (input.includes('sin') || input.includes('cos') || input.includes('tan')  ){
        if (!input.includes('(')){
            return "Error: Missing \'(\'";
        }
        else if (!input.includes(')')){
            return "Error: Missing \')\'";
        }
        else{
            let n = parseInt(input.substring(input.indexOf('(') + 1, input.indexOf(')') - 1));
            if(mode){
                if(input.includes('sin')){
                    return Math.sin(n);
                }
                else if(input.includes('cos')){
                    return Math.cos(n);
                }
                else if(input.includes('tan')){
                    return Math.tan(n);
                }
            }
            else{
                if (input.includes('sin')){
                    // Dealing with edge cases when value approaches zero or half
                    if (n == 30){
                        return 0.5;
                    }
                    return Math.sin(n * Math.PI / 180);
                }
                else if (input.includes('cos')){
                    if (n == 60){
                        return 0.5;
                    }
                    else if (n == 90){
                        return 1;
                    }
                    else{
                        return Math.cos(n * Math.PI / 180);
                    }
                }
                else if (input.includes('tan')){
                    if (n == 45){
                        return 1;
                    }
                    else if (n == 90){
                        return undefined;
                    }
                    return Math.tan(n * Math.PI / 180);
                }
            }
        }
    }
    else if (input.includes('ln')){
        let n = parseInt(input.substring(input.indexOf('(') + 1, input.indexOf(')') - 1));
        return Math.log(n);
    }
    else{
        // Shunting Yard Algorithm: Converting an infix expression into a postfix expression
        for (var i = 0; i < input.length; ++i){
            if (input[i] == ' ' || input[i] == '.' || (input.charCodeAt(i) > 47 && input.charCodeAt(i) < 58)){
                postFix.push(input[i]);
            }
            else {
                if (signs.length > 0){
                    let f = signs[signs.length - 1];

                    /* ORDER OF PRECEDENCE 
                       -------------------
                       1. Brackets ('(')
                       2. Powers ('^')
                       3. Multiplication / Division ('*' or '/')
                       4. Addition / Subraction ('+' or '-')
                    */
        
                    /* If an operator does not have a lower precedence than the one on the front 
                    of the stack or if it is empty, push it in the stack. */
                    if (input[i] == '^' || ((input[i] == '*' || input[i] == '/') && (f == '+' || f == '-' || f == '(')) 
                    || ((input[i] == '+' || input[i] == '-') && (f == '(')) || input[i] == '('){
                        signs.push(input[i]);
                    }
                    /* Similarly, if an operator has precendence than the one on 
                    front of the stack, remove the front operator from the stack and push 
                    it in the queue. Then, push the current operator in the stack */
                    else if ((input[i] == '^' && f == '(') || ((input[i] == '*' || input[i] == '/' || input[i] == '+' || input[i] == '-') 
                    && (f == '*' || f == '/' || f == '^' || f == '(')) || ((input[i] == '+' || input[i] == '-') 
                    && (f == '+' || f == '-' || f == '^' || f == '('))){
                        postFix.push(f);
                        signs.pop(f);
                        signs.push(input[i]);
                    }
                    else if (input[i] == ')') {
                        while(f != '('){
                            f = signs[signs.length - 1];
                            if (f != '('){
                                postFix.push(f);
                            }
                            signs.pop(f);
                        }
                    }
                }
                else {
                    signs.push(input[i]);
                }
            }
        }

        while (signs.length != 0){
            postFix.push(signs.pop());
        }
    
        var exp = "";
        for (var i = 0; i < postFix.length; ++i){
            exp += postFix[i];
        }
    
        // Reading multi-digit numbers and assigning the numbers as 'Number' type
        var space = false;
        var numLen = 0;
        var dec = 0;
        var ans = 0;
    
        for (var i = 0; i < exp.length; ++i){
            if (exp[i] == '.' || exp.charCodeAt(i) > 47 && exp.charCodeAt(i) < 58){
                if (exp[i] == '.'){
                    dec = numLen;
                    exp.replace('.', '');
                }
                else{
                    ++numLen;
                    space = false;
                    if (ans > 0) {
                        ans = 10 * ans + parseInt(exp[i]);
                    }
                    else {
                        ans = parseInt(exp[i]);
                    }
                }
            }
            else {
                if (dec != 0){
                    ans = ans / Math.pow(10, numLen - dec);
                    dec = 0;
                }
                else {
                    readPostFix.push(ans);
                    if (exp[i] != ' ') {
                        readPostFix.push(exp[i]);
                    }
                    numLen = 0;
                    ans = 0;
                }
            } 
        }
    
        let newReadPostFix = readPostFix.filter(a => a !== 0);
    
        // Evaluating the postfix expression to get answer
        var eval = [];
        var num1 = 0;
        var num2 = 0;
        var ans2 = 0;
    
        for (var i = 0; i < newReadPostFix.length; ++i){
            if (typeof newReadPostFix[i] === 'number') {
                eval.push(newReadPostFix[i]);
            }
            else if (typeof newReadPostFix[i] === 'string') {
                num1 = eval.pop();
                num2 = eval.pop();
                if(newReadPostFix[i] == '+'){
                    ans2 = num2 + num1;
                    eval.push(ans2);
                }
                else if(newReadPostFix[i] == '-') {
                    ans2 = num2 - num1;
                    eval.push(ans2);
                }
                else if(newReadPostFix[i] == '*') {
                    ans2 = num2 * num1;
                    eval.push(ans2);
                }
                else if(newReadPostFix[i] == '/') {
                    ans2 = num2 / num1;
                    eval.push(ans2);
                }
                else if(newReadPostFix[i] == '^' ) {
                    if (num2 < 1) {
                        ans2 = Math.pow(num1, num2);
                    }
                    else {
                        ans2 = Math.pow(num2, num1);
                    }
                    eval.push(ans2);
                }
            }
        }
        return ans2;
    }
};