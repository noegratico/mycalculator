<script>

// my variable declaration to hold the value of user intput 
// i use array to hold multiple numbers and store it in object where i will pass to the post request of
// the REST api 
let firstNumber =[];
let secondNumber = []
let operator="";
let equation ={
    firstNumber,
    secondNumber,
    operator
}
let data="";


// i use DOM event to get the user input for the first number and second number and the operator
function setOperator(opt){
    equation.operator = opt
}

// in this DOM event i create a condition to check that once user input a operator the next time 
// the user pressed a number button it will be assign in the second number variable
// and assign it to the equation of object, i use jion() to remove the coma (,) so when i assign it to the object
// by default it is a string
function showNum(num) {
    if(equation.operator == ""){
        firstNumber = [...firstNumber, num]
        equation.firstNumber = firstNumber.join("")
    }else{
        secondNumber = [...secondNumber, num]
        equation.secondNumber = secondNumber.join("")
    }
   
}

// i use a DOM event to trigger the rest api when the user click on the = button i will call the POST api
// i created and pass the object where the computation will be executed
// and after i get a response i reset the value to "" and ill pass the result value to first number so 
// if the user want to continue the calculation
async function compute(){
const res = await fetch('/api', {
    method : 'POST',
    body: JSON.stringify({equation}),
    headers: {
        'Content-Type' : "application/json"
    }
})
    data = await res.json();
    equation ={
        firstNumber : data.result,
        secondNumber : "",
        operator: "",
}
    firstNumber = []
    secondNumber = []
}
// i created a cancel DOM event to reset all the value to 0
function cancel(){
    firstNumber =[];
    secondNumber = []
    operator="";
    equation ={
     firstNumber,
     secondNumber,
     operator
    }
    data=""
}
</script>

<div class="container">

<div class="wrapper">
<!-- line 65 i just display the result and in line 66 i just display the equation -->
<div class="result">{data.result !== undefined ? data.result: "" }</div>
<div class="equation">{equation.firstNumber + equation.operator + equation.secondNumber}</div>


<!-- simple button element -->
<div style="display:flex; justify-content: flex-end;">
<button on:click|preventDefault={cancel}>C</button>
</div>
<div>
<button on:click|preventDefault={event=> showNum(7)}>7</button>
<button on:click|preventDefault={event=> showNum(8)}>8</button>
<button on:click|preventDefault={event=> showNum(9)}>9</button>
<button on:click|preventDefault={event=> setOperator("/")}>/</button>
</div>
<div>
<button on:click|preventDefault={event=> showNum(4)}>4</button>
<button on:click|preventDefault={event=> showNum(5)}>5</button>
<button on:click|preventDefault={event=> showNum(6)}>6</button>
<button on:click|preventDefault={event=> setOperator("*")}>*</button>
</div>
<div>
<button on:click|preventDefault={event=> showNum(1)}>1</button>
<button on:click|preventDefault={event=> showNum(2)}>2</button>
<button on:click|preventDefault={event=> showNum(3)}>3</button>
<button on:click|preventDefault={event=> setOperator("-")}>-</button>
</div>

<div>
<button on:click|preventDefault={event=> showNum(0)}>0</button>
<button on:click|preventDefault={event=> showNum(".")}>.</button>
<button on:click|preventDefault={compute}>=</button>
<button on:click|preventDefault={event=> setOperator("+")}>+</button>
</div>
</div>
</div>


<!-- some simple styling -->
<style>
button{
    width: 50px;
    margin: 5px;
    border: 1px solid;
    height: 40px;
    border-radius: 3px;
}
.container{
    align-self:center;
    display:flex;
    justify-content:center;
    align-items: center;
    height:100vh;
    
}

.equation{
border-bottom: 1px solid;
height: 40px;
display:flex;
justify-content:flex-end;
align-items:center;
padding-right:10px
}
.result{
    border-bottom:1px solid;    
    height: 40px;
    display:flex;
    justify-content:flex-end;
    padding-right: 10px;
}
.wrapper{
    display:grid;
    border: 1px solid;
    border-radius: 5px;
    padding: 10px;

}
</style>