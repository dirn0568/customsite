var Enemy_xpos = new Array();
var Enemy_ypos = new Array();
var Enemy_angle = [[5,5],[4,6],[6,4],[-4,6],[4,-6],[-4,-6],[3,-7],[-7,3],[-6,-4],[-5,-5]];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Ball() {
    ball_xpos = canvas.width*0.5;
    ball_ypos = canvas.height*0.5;
    ball_size = 20;
    color = 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
}

function DrawBall() {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(ball_xpos, ball_ypos, ball_size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function MoveBall(direct) {
    if (direct == "left") {
        ball_xpos -= 5
    } else if (direct == "right") {
        ball_xpos += 5
    } else if (direct == "top") {
        ball_ypos += 5
    } else if (direct == "bottom") {
        ball_ypos -= 5
    }
}

function HP() {
    hp = 100;
    hp_size = 50;
    hp_color = 'rgba('+255+','+0+','+0+')';
    ctx.fillStyle = hp_color;
    ctx.beginPath();
    ctx.fillRect(220,10,200, 200);
    ctx.closePath();
    ctx.fill();
}

function Enemy() {
    for (i = 0; i < 10; i++) {
        Enemy_xpos[i] = Math.floor(Math.random() * canvas.width);
        Enemy_ypos[i] = Math.floor(Math.random() * canvas.height);
    }
    Enemy_size = 20;
    Enemy_color = 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
}

function EnemyDraw() {
    for (i = 0; i < Enemy_xpos.length; i++) {
        ctx.fillStyle = Enemy_color;
        ctx.beginPath();
        ctx.arc(Enemy_xpos[i], Enemy_ypos[i], Enemy_size, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
}

function EnemyMove_or_Hit() {
    for (i = 0; i < Enemy_xpos.length; i++) {
        Enemy_xpos[i] += Enemy_angle[i][0];
        Enemy_ypos[i] += Enemy_angle[i][1];
        if (Enemy_xpos[i] > canvas.width || Enemy_xpos[i] < 0 || Enemy_ypos[i] > canvas.height || Enemy_ypos[i] < 0) {
            Enemy_angle[i][0] *= -1;
            Enemy_angle[i][1] *= -1;
        }
        if (ball_xpos > Enemy_xpos[i]-Enemy_size && ball_xpos < Enemy_xpos[i]+Enemy_size && ball_ypos > Enemy_ypos[i]-Enemy_size && ball_ypos < Enemy_ypos[i]+Enemy_size) {
            console.log('hit')
            hp -= 5
        }
    }
}

function EnemyRemove() {
    for (i = 0; i < Enemy_xpos.length; i++) {
        if (mouse_xpos > Enemy_xpos[i]-Enemy_size && mouse_xpos < Enemy_xpos[i]+Enemy_size && mouse_ypos > Enemy_ypos[i]-Enemy_size && mouse_ypos < Enemy_ypos[i]+Enemy_size) {
            Enemy_xpos.splice(i, 1);
            Enemy_ypos.splice(i, 1);
            Enemy_angle.splice(i, 1);
            console.log(Enemy_xpos);
            console.log(Enemy_ypos);
            console.log(Enemy_angle);
        }
    }
}

function Play() {
    ctx.fillStyle = ctx.fillStyle='rgba(255,255,255,0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = color;
    DrawBall();
    EnemyDraw();
    EnemyMove_or_Hit();
    HP();
    window.addEventListener('resize',function(){ // 화면 크기가 변하면 캔버스 크기도 변경해줌
      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
    })
    requestAnimationFrame(Play);
}
Ball();
Enemy();
Play();


document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            MoveBall("right");
            break;
        case 37:
            MoveBall("left")
            break;
        case 40:
            MoveBall("top");
            break;
        case 90:
            changeDirection();
            break;
        case 38:
            MoveBall("bottom");
            break;
        default:
            break;
    }
})

document.addEventListener("click", e => {
    mouse_xpos = event.offsetX;
    mouse_ypos = event.offsetY;
    EnemyRemove();
})
