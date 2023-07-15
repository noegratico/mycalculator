import { json } from '@sveltejs/kit';


// this my REST API to compute the expression i use switch statement to execute differnt operation
// i also parse the data from the request since im getting a object string 
export async function POST({request}){
    const {equation} = await request.json()
let result = "";
    switch(equation.operator){
        case "+":
            result = parseFloat(equation.firstNumber )+ parseFloat(equation.secondNumber);
            break;
        case "-":
            result = parseFloat(equation.firstNumber )- parseFloat(equation.secondNumber);
            break;
        case "*":
            result = parseFloat(equation.firstNumber )*  parseFloat(equation.secondNumber);
                break;
        case "/":
            result = parseFloat(equation.firstNumber )/ parseFloat(equation.secondNumber);
            break;
default:
    result = ""
    }
// i return the result and also a status code 0f 201 which means success 
    return json({result}, {status: 201})
}