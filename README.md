<center>
    <img src="Calculator.png" width="80%" style="margin:2rem; border-radius:1rem">
</center>

## General Info

This project is a scientific calculator that runs on the browser. It provides special functions that might allow more convenience to the user compare to other calculators. In addition, this project implements the "*Shunting Yard Algorithm*" to evaluate expression according to the order of operations (BEDMAS). 

<br>

## Technologies
Project is created with
* HTML5 / CSS / JavaScript
* BrowserifyJS version: 3.8.14
* Babelify version: 10.0.0
* Tinyify version: 3.0.0
* jQuery version: 3.5.1

<br>

## Setup
To run this project, ensure that node is installed on the system. This application is runned with "*Babel*" to allow live editing. To run this project, type the following commands in the terminal.

<br>

```
cd ../Scientific-Calculator
npm run start
npm run build
npm run watch
```
<br>

# Features
The following special commands with their commands our listed below (don't forget to type parentheses when using these function; include comma for second argument as well):

<br>

<hr>

Combinations (nCr): <hr>
* Formula: 
<img src="https://render.githubusercontent.com/render/math?math=\,\, \frac{n!}{r!(n-r)!}">
* Parameters: <img src="https://render.githubusercontent.com/render/math?math=\,\, n,r \, \epsilon \, \mathbb{Z} \, | \, n \geq r">

<hr>    

Permutations (nPr): <hr>
* Formula: <img src="https://render.githubusercontent.com/render/math?math=\,\, \frac{n!}{r!}">
* Parameters: <img src="https://render.githubusercontent.com/render/math?math=\,\, n,r \, \epsilon \, \mathbb{Z} \, | \, n \geq r"> 
<hr>

Sumation (sum(n, k) or sum(n) if k = 0): <hr>
* Formula: <img src="https://render.githubusercontent.com/render/math?math=\,\, \sum_{i=n}^{k}i = \frac{n(n-1))}{2}">
* Parameters: <img src="https://render.githubusercontent.com/render/math?math=\,\, n,k \, \epsilon \, \mathbb{Z}">

<hr>

Sum of Squares (sumGeo(n, k) or sumGeo(n) if k = 0)): <hr>
* Formula: <img src="https://render.githubusercontent.com/render/math?math=\,\, \sum_{i=1}^{k}i^n = \frac{k^{n%2B1}-1}{k-1}">
* Parameters: <img src="https://render.githubusercontent.com/render/math?math=\,\, n,k \, \epsilon \, \mathbb{Z}">

<hr>

Greatest Common Denominator (GCD(n, k)) and Lowest Common Denominator (LCM(n, k)): <hr>
* Formula: Euclidean Algorithm
* Parameter: <img src="https://render.githubusercontent.com/render/math?math=\,\, n,k \, \epsilon \, \mathbb{Z} \, | \, n,k \geq 1">

<hr>

Logarithm (log(n, k)): <hr>
* Formula: <img src="https://render.githubusercontent.com/render/math?math=\,\, \frac{log(n)}{log(k)}">
* Parameter: <img src="https://render.githubusercontent.com/render/math?math=\,\, n,k \, \epsilon \, \mathbb{Z} \, | \, n,k \geq 0">

<br>

Other functionatlity includes toggling from degrees to radians when computing trig functions and saving (M+) or clearing (M-) the evaluated answer.