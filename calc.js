let text = ""
let pretext = ""
let operations = "+-*/"
const numbers = document.getElementsByClassName("num")
const opt = document.getElementsByClassName("opt")
const del = document.getElementById("del")
const clr = document.getElementById("clr")
const dot = document.getElementById(".")
const equal = document.getElementById("equal")
const prev = document.getElementsByClassName("previous_inputs")[0]
const cur = document.getElementsByClassName("current_inputs")[0]

function append(value)
{
    text+=String(value)
    cur.innerText = text
}

function remove()
{
    text=text.slice(0,-1)
    cur.innerText = text
}

function clear()
{
    text=pretext="0"
    cur.innerText = text
    prev.innerText = pretext
    text=pretext=""
}

function compute()
{
    let char = []
    let op = []
    let word=""
    for(let i=0;i<text.length;i++)
    {
        if(i==0&&text[i]=="-") word+=text[i]
        else if(operations.includes(text[i])&&!(operations.includes(text[i-1])))
        {
            char.push(word)
            word=""
            op.push(text[i])
        }
        else if(operations.includes(text[i])&&(operations.includes(text[i-1])))
        {
            word+=text[i]
        }
        else
            word+=text[i]
    }
    char.push(word)
    
    let a=""
    let b=""

    while(op.length)
    {
        if(op[0]=="+")
        {
            a = char.shift()
            b = char.shift()
            char.unshift(parseFloat(a)+parseFloat(b))
            op.shift() 
        }
        if(op[0]=="-")
        {
            a = char.shift()
            b = char.shift()
            char.unshift(parseFloat(a)-parseFloat(b))
            op.shift() 
        }
        if(op[0]=="*")
        {
            a = char.shift()
            b = char.shift()
            char.unshift(parseFloat(a)*parseFloat(b))
            op.shift() 
        }
        if(op[0]=="/")
        {
            a = char.shift()
            b = char.shift()
            char.unshift(parseFloat(a)/parseFloat(b))
            op.shift() 
        }
        pretext = text
        text = String(char[0])
        prev.innerText = pretext
        cur.innerText = text
    }
}

Array.from(numbers).forEach((number)=>{
    number.addEventListener("click",()=>{
        append(number.innerText)
    })
})

Array.from(opt).forEach((op)=>{
    op.addEventListener("click",()=>{
        append(op.innerText)
    })
})

dot.addEventListener("click",()=>{append(dot.innerText)})

del.addEventListener("click",()=>{
    remove()
})

clr.addEventListener("click",()=>{
    clear()
})

equal.addEventListener("click",()=>{
    compute()
})