const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ball_hp = 2000;

var Boss_hp = 2000;

var Enemy_xpos = new Array();
var Enemy_ypos = new Array();
var Enemy_angle = [[5,5],[4,6],[6,4],[-4,6],[4,-6],[-4,-6],[3,-7],[-7,3],[-6,-4],[-5,-5]];

var you_do_tan_xpos = new Array();
var you_do_tan_ypos = new Array();
var you_do_tan_angle = []

var you_do_tan_xpos2 = new Array();
var you_do_tan_ypos2 = new Array();
var you_do_tan_angle2 = []

var attack_point = ''

var count = 0;

var keypress = [false,false,false,false];


// 플레이어
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
        ball_xpos -= 10
    } else if (direct == "right") {
        ball_xpos += 10
    } else if (direct == "top") {
        ball_ypos += 10
    } else if (direct == "bottom") {
        ball_ypos -= 10
    }
}

function BallHP() {
    hp_color = 'rgba('+255+','+0+','+0+')';
    ctx.fillStyle = hp_color;
    ctx.beginPath();
    ctx.fillRect(0,0,ball_hp,100);
    ctx.closePath();
    ctx.fill();
}

// 보스몹

function Boss() {
    Boss_xpos = canvas.width*0.5;
    Boss_ypos = canvas.height*0.5;
    Boss_width = 50;
    Boss_height = 100;
    Boss_color = 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
}

function BossDraw() {
    ctx.fillStyle = Boss_color;
    ctx.beginPath();
    ctx.fillRect(Boss_xpos,Boss_ypos,Boss_width,Boss_height);
    ctx.closePath();
    ctx.fill();
}

function BossHP() {
    Boss_hp_color = 'rgba('+255+','+255+','+0+')';
    ctx.fillStyle = Boss_hp_color;
    ctx.beginPath();
    ctx.fillRect(canvas.width-100,0,100,Boss_hp);
    ctx.closePath();
    ctx.fill();
}

// 장애물

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
            ball_hp -= 100;
        }
    }
}

function you_do_tan() {
    you_do_tan_arrive_xpos = ball_xpos;
    you_do_tan_arrive_ypos = ball_ypos;
    for (i = 0; i < 5; i++) {
        you_do_tan_xpos[i] = 0;
        you_do_tan_ypos[i] = Math.floor(Math.random() * canvas.height);
        you_do_tan_angle[i] = [(you_do_tan_arrive_xpos-you_do_tan_xpos[i])/100, (you_do_tan_arrive_ypos-you_do_tan_ypos[i])/100]
    }
    for (i = 5; i < 10; i++) {
        you_do_tan_xpos[i] = canvas.width
        you_do_tan_ypos[i] = Math.floor(Math.random() * canvas.height);
        you_do_tan_angle[i] = [(you_do_tan_arrive_xpos-you_do_tan_xpos[i])/100, (you_do_tan_arrive_ypos-you_do_tan_ypos[i])/100]
    }
    for (i = 10; i < 15; i++) {
        you_do_tan_xpos[i] = Math.floor(Math.random() * canvas.width);
        you_do_tan_ypos[i] = 0
        you_do_tan_angle[i] = [(you_do_tan_arrive_xpos-you_do_tan_xpos[i])/100, (you_do_tan_arrive_ypos-you_do_tan_ypos[i])/100]
    }
    for (i = 15; i < 20; i++) {
        you_do_tan_xpos[i] = Math.floor(Math.random() * canvas.width);
        you_do_tan_ypos[i] = canvas.height;
        you_do_tan_angle[i] = [(you_do_tan_arrive_xpos-you_do_tan_xpos[i])/100, (you_do_tan_arrive_ypos-you_do_tan_ypos[i])/100]
    }
    you_do_tan_size = 20;
    you_do_tan_color = 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
}

function you_do_tan_Draw() {
    for (i = 0; i < you_do_tan_xpos.length; i++) {
        ctx.fillStyle = you_do_tan_color;
        ctx.beginPath();
        ctx.arc(you_do_tan_xpos[i], you_do_tan_ypos[i], you_do_tan_size, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
}

function you_do_tan_Move_or_Hit() {
    for (i = 0; i < you_do_tan_xpos.length; i++) {
        you_do_tan_xpos[i] += you_do_tan_angle[i][0];  // 바꿔야함
        you_do_tan_ypos[i] += you_do_tan_angle[i][1]; // 바꿔야함
        if (ball_xpos > you_do_tan_xpos[i]-you_do_tan_size && ball_xpos < you_do_tan_xpos[i]+you_do_tan_size && ball_ypos > you_do_tan_ypos[i]-you_do_tan_size && ball_ypos < you_do_tan_ypos[i]+you_do_tan_size) {
            ball_hp -= 100;
        }
    }
}

function you_do_tan2() {
    you_do_tan_arrive_xpos2 = ball_xpos;
    you_do_tan_arrive_ypos2 = ball_ypos;
    for (i = 0; i < 5; i++) {
        you_do_tan_xpos2[i] = 0;
        you_do_tan_ypos2[i] = Math.floor(Math.random() * canvas.height);
        you_do_tan_angle2[i] = [(you_do_tan_arrive_xpos2-you_do_tan_xpos2[i])/100, (you_do_tan_arrive_ypos2-you_do_tan_ypos2[i])/100]
    }
    for (i = 5; i < 10; i++) {
        you_do_tan_xpos2[i] = canvas.width
        you_do_tan_ypos2[i] = Math.floor(Math.random() * canvas.height);
        you_do_tan_angle2[i] = [(you_do_tan_arrive_xpos2-you_do_tan_xpos2[i])/100, (you_do_tan_arrive_ypos2-you_do_tan_ypos2[i])/100]
    }
    for (i = 10; i < 15; i++) {
        you_do_tan_xpos2[i] = Math.floor(Math.random() * canvas.width);
        you_do_tan_ypos2[i] = 0
        you_do_tan_angle2[i] = [(you_do_tan_arrive_xpos2-you_do_tan_xpos2[i])/100, (you_do_tan_arrive_ypos2-you_do_tan_ypos2[i])/100]
    }
    for (i = 15; i < 20; i++) {
        you_do_tan_xpos2[i] = Math.floor(Math.random() * canvas.width);
        you_do_tan_ypos2[i] = canvas.height;
        you_do_tan_angle2[i] = [(you_do_tan_arrive_xpos2-you_do_tan_xpos2[i])/100, (you_do_tan_arrive_ypos2-you_do_tan_ypos2[i])/100]
    }
    you_do_tan_size2 = 20;
    you_do_tan_color2 = 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
}

function you_do_tan_Draw2() {
    for (i = 0; i < you_do_tan_xpos2.length; i++) {
        ctx.fillStyle = you_do_tan_color2;
        ctx.beginPath();
        ctx.arc(you_do_tan_xpos2[i], you_do_tan_ypos2[i], you_do_tan_size2, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
}

function you_do_tan_Move_or_Hit2() {
    for (i = 0; i < you_do_tan_xpos2.length; i++) {
        you_do_tan_xpos2[i] += you_do_tan_angle2[i][0];  // 바꿔야함
        you_do_tan_ypos2[i] += you_do_tan_angle2[i][1]; // 바꿔야함
        if (ball_xpos > you_do_tan_xpos2[i]-you_do_tan_size2 && ball_xpos < you_do_tan_xpos2[i]+you_do_tan_size2 && ball_ypos > you_do_tan_ypos2[i]-you_do_tan_size2 && ball_ypos < you_do_tan_ypos2[i]+you_do_tan_size2) {
            ball_hp -= 100;
        }
    }
}

function EnemyRemove() {
    for (i = 0; i < Enemy_xpos.length; i++) {
        if (mouse_xpos > Enemy_xpos[i]-Enemy_size && mouse_xpos < Enemy_xpos[i]+Enemy_size && mouse_ypos > Enemy_ypos[i]-Enemy_size && mouse_ypos < Enemy_ypos[i]+Enemy_size) {
            Enemy_xpos.splice(i, 1);
            Enemy_ypos.splice(i, 1);
            Enemy_angle.splice(i, 1);
            attack_point = 'Ball'
        }
    }
    if (mouse_xpos > Boss_xpos && mouse_xpos < Boss_xpos+Boss_width && mouse_ypos > Boss_ypos && mouse_ypos < Boss_ypos+Boss_height) {
        Boss_hp -= 10;
        attack_point = 'Boss'
    }
}

// Play

function keylist() {
    setInterval(function(){
        if (keypress[0] == true) {
            ball_xpos += 10;
        }
        if (keypress[1] == true){
            ball_xpos -= 10;
        }
        if (keypress[2] == true){
            ball_ypos += 10;
        }
        if (keypress[3] == true){
            ball_ypos -= 10;
        }
        console.log(keypress);
    }, 10);
}

function Play() {
    ctx.fillStyle = ctx.fillStyle='rgba(255,255,255,0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = color;
    DrawBall();
    BossDraw();
    if (count >= 200 && count <= 500) {
//        you_do_tan_Draw();
//        you_do_tan_Move_or_Hit();
        you_do_tan_Draw2();
        you_do_tan_Move_or_Hit2();
    } else {
//        you_do_tan();
        you_do_tan2();
    }
    BallHP();
    if (attack_point=='Boss') {
        BossHP();
    }
    window.addEventListener('resize',function(){ // 화면 크기가 변하면 캔버스 크기도 변경해줌
      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
    })
    count += 1
    if (count == 1000) {
        count = 0;
    }
    requestAnimationFrame(Play);
}
Ball();
Boss();
//you_do_tan();
you_do_tan2();
keylist();
Play();


document.addEventListener("keydown", e => {
    if (e.keyCode==39){
        keypress[0] = true;
    }
    if (e.keyCode==37){
        keypress[1] = true;
    }
    if (e.keyCode==40){
        keypress[2] = true;
    }
    if (e.keyCode==38){
        keypress[3] = true;
    }
})

document.addEventListener("keyup", e => {
    if (e.keyCode==39){
        keypress[0] = false;
    }
    if (e.keyCode==37){
        keypress[1] = false;
    }
    if (e.keyCode==40){
        keypress[2] = false;
    }
    if (e.keyCode==38){
        keypress[3] = false;
    }
})

document.addEventListener("click", e => {
    mouse_xpos = event.offsetX;
    mouse_ypos = event.offsetY;
    EnemyRemove();
})
