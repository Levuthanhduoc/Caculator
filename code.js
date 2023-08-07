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
            if(arr.number != ""){
                total = this.caculate[arr.operator](total,Number(arr.number));
            }
        }
        showResult(total);
    }
    this.extract = function(text,op){
        let br = 0,num =[],operator,arr = {};
        while(br < 2 && text.length > 0){
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
        arr["text"] = text;
        arr["number"] = num.join("");
        arr["operator"] = operator;
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
                case "=" : Caculator.caculating(screen.textContent);
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
    screen.textContent = screen.textContent.slice(`-${(screen.textContent).length}`,-1)
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