let screen = document.querySelector(".user-input");
function caculator(){
    this.caculate = {
        "+":(a,b)=>a+b,
        "-":(a,b)=>a-b,
        "*":(a,b)=>a*b,
        "/":(a,b)=>a/b,
    }
    this.caculating = function(content){
        let total = 0,opAvailable=[];
        content = ("+" + content).split("")
        for(let key in this.caculate){
            opAvailable.push(key);
        }
        while(content.length > 0){
            arr = this.extract(content,opAvailable)
            content = arr.text;
            if(arr.parentheses == 1){
                total = this.caculate[arr.operator](total,this.caculating(arr.number));
            }
            else if(arr.number != ""){
                total = this.caculate[arr.operator](total,Number(arr.number));
            }
        }
        return total;
    }
    this.extract = function(text,op){
        let br = 0,num =[],operator,arr = {},parentheses = 0;
        while(br < 2 && text.length > 0){
            if(["(",")"].indexOf(text[0]) != -1 || parentheses == 1){
                if(text[0] == "(" && num != ""){
                    br = 2;
                }
                else if(text[0] == "("){
                    text.splice(0,1);
                    parentheses = 1;
                }
                else if(text[0] == ")"){
                    text.splice(0,1);
                    br = 2;
                }
                else{
                    num.push(text.splice(0,1));
                }
            }
            else{
                if(op.indexOf(text[0]) != -1 && br < 1){
                    operator = text.splice(0,1);
                    br++;
                }
                else if(op.indexOf(text[0]) != -1 && br >= 1){
                    br++;
                }
                else{
                    (num.push(text.splice(0,1)))
                }
            }
        }
        arr["text"] = text;
        arr["number"] = num.join("");
        if(operator == undefined ){
            operator = "*"
        }
        arr["operator"] = operator;
        arr["parentheses"] = parentheses;
        return arr;
    }
}
let Caculator = new caculator();
function buttonListener(){
    let button = document.querySelectorAll("button");
    button.forEach(item =>{
        item.addEventListener("click",function(){
            switch(item.textContent){
                case "DEL": removeOnScreen();
                            break;
                case "CE" : clearAll();
                            break;
                case "=" :showResult(Caculator.caculating(screen.textContent));
                            break;
                default : showOnScreen(item.textContent);
            }
        })
    })
}buttonListener();

function showOnScreen(text){
    let arr = ["+","-","*","/"]
    if(arr.indexOf(text) != -1){
        screen.innerHTML += `<span style="color:red;font-weight:bolder;">${text}</span>`;
    }
    else{
        screen.innerHTML += text;
    }
    screen.scrollBy(screen.scrollHeight,0);
}

function removeOnScreen(){
    let arr = ["+","-","*","/"]
    let removeObject = screen.textContent.slice(-1);
    let removeArr =[]; 
    if(arr.indexOf(removeObject) != -1 ){
        removeArr = screen.querySelectorAll("span")
        removeArr = Array.from(removeArr);
        removeArr[removeArr.length -1].remove();
    }else{
        screen.textContent = screen.textContent.slice(`-${(screen.textContent).length}`,-1)
    }
}

function clearAll(){
    let result = document.querySelector(".result");
    result.textContent = "";
    screen.textContent ="";
}

function showResult(text){
    let result = document.querySelector(".result");
    result.textContent = text;
}