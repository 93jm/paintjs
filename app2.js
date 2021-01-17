const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "black"; 
const CANVAS_SIZE = 700;
// 반복적으로 값을 할당 해줄때에 변수를 사용해 뿌려준다


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


// ctx.fillStyle = "White";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 49); // x좌표 y좌표 가로 세로


let painting = false; // 애초에 false로 설정 되어 있지만 마우스 다운을 하였을때 true가 된다
let filling = false; // 현재 fill 상태가 어떤지 알기 위한 변수

function stopPainting(){
    painting = false;    
}


function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        console.log("path 만들고 있음" + x, y);
        ctx.beginPath(); //path는 선이다 움직이고 있는 동안 계속 만들어 진다
        ctx.moveTo(x, y); //1. x와 y 좌표를 움직일때 계속 받아 오며
    }else{
        console.log("line 만들고 있음" + x, y);
        ctx.lineTo(x, y); //2. 그 좌표를 마우스 클릭했던 이 곳의 좌표까지 
        ctx.stroke(); //3. 선을 연결해준다.
    }
    
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //선 색상 체인지
    ctx.fillStyle = color; // 전체 색칠 색상 체인지
}

function handleRangeChange(event){
    const size = event.target.value;
    // console.log(event.target.value);
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[😎]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((value) => value.addEventListener("click", handleColorClick))
//div컬러를 배열로 만든뒤 forEach문을 돌려 value 값을 뽑고 그 value가 이벤트가 실행되면 함수 시작    


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}