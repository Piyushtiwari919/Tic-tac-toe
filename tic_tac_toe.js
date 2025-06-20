let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg")
const mainCont = document.querySelector("main");

let turn0 = true;

let winPatterns =[
    [0,1,2],[0,3,6],[0,4,8],
    [3,4,5],[1,4,7],[2,4,6],
    [6,7,8],[2,5,8]
];
let count=0;
const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
    mainCont.style.display="flex";
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText = "O";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        count++;
        let winnerG=checkWinner();
        if(count ===9 && !winnerG){
            matchDraw();
        }
    })
})

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText ="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is "${winner}"`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    mainCont.style.display="none";
}
const matchDraw=()=>{
    msg.innerText =`Game was a Draw`
    msgContainer.classList.remove("hide");
    mainCont.style.display="none";
    disableBoxes();
}

const checkWinner =()=>{
    for(let patterns of winPatterns){
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val === pos3Val){
                // console.log("winner");
                showWinner(pos1Val);
            }
            
        }
    }
}

newGameBtn.addEventListener("click",resetGame)
reset_btn.addEventListener("click",resetGame)

