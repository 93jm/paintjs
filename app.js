const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");


//캔버스 사이즈 주기
//css사이즈로 준것은 우리가 보고있는 사이즈이고
//따로 이렇게 사이즈를 줘서 픽셀이 움직일 수 있는 영역을 만들어 준다
canvas.width = 700;
canvas.height = 700;

//선을 사용할때의 색상과 굵기 값
ctx.strokeStyle = "red"; //색상 검정
ctx.linkWidth = 2.5; //굵기 2.5


let painting = false;

function stopPainting(event){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    // 마우스의 움직임에 따라 event라는 인자값을 받아와 지며 그 인자 값중
    // 캔버스 위에 있을때의 좌표인 offset을 불러와 변수에 담는다
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //클릭하지않고 마우스를 움직일때 painting 값이 false일때
        console.log("path만드는중", x, y)
        //path = 선
        ctx.beginPath(); //path를 만들고
        ctx.moveTo(6, 6); //x, y좌표를 path의 (시작점이라고생각)
    } else { //페인팅이 시작 됬을때
        console.log("페인팅 시작", x, y)
        ctx.lineTo(10, 10); // path의 (마지막점이라고생각)
        ctx.stroke();
        //stroke : 현재의 sub-path를 현재의 strokestyle로 획을 그음 (실제 그려주는애)
    }
}


function onMouseDown(event){
    //마우스가 클릭이 될 때만 값을 가지고 온다.
    painting = true;
    console.log(event);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //클릭하는 순간 페인팅 시작
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}