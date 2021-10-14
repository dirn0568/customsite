const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var ball_hp = 2000;

var Boss_hp = 2000;

var Enemy_xpos = new Array();
var Enemy_ypos = new Array();
var Enemy_angle = [[5,5],[4,6],[6,4],[-4,6],[4,-6],[-4,-6],[3,-7],[-7,3],[-6,-4],[-5,-5]];

var arrow_pos = [];
var arrow_angle = [];

var you_do_tan_xpos = new Array();
var you_do_tan_ypos = new Array();
var you_do_tan_angle = []

var you_do_tan_xpos2 = new Array();
var you_do_tan_ypos2 = new Array();
var you_do_tan_angle2 = []

var time = 0;
var hour = 0;
var min = 0;
var sec = 0;
var timer;
var th = hour;
var tm = min;
var ts = sec;

var attack_point = ''

var count = 0;

var keypress = [false,false,false,false];

var Playing = true


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


// 장애물

function arrow() {
    arrow_arrive_xpos = ball_xpos;
    arrow_arrive_ypos = ball_ypos;
    arrow_random_pos = [[0, Math.floor(Math.random()*canvas.height)], [canvas.width, Math.floor(Math.random()*canvas.height)], [Math.floor(Math.random()*canvas.height), 0], [Math.floor(Math.random()*canvas.width), canvas.height]];
    arrow_pos.push(arrow_random_pos[Math.floor(Math.random()*4)]);
    z1 = arrow_arrive_xpos - arrow_pos[arrow_pos.length - 1][0];
    z2 = arrow_arrive_ypos - arrow_pos[arrow_pos.length - 1][1];
    z3 = 0
    j = 1;
    while (true) {
        if (Math.abs(z1) < 5 && Math.abs(z2) < 5){
            z3 = z1 / z2
            if (z1 > 0 && z2 > 0) {
                if (Math.abs(z3) < 0.2){
                    z1 = 0
                    z2 = 10
                }
                if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                    z1 = 2
                    z2 = 6
                }
                if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                    z1 = 6
                    z2 = 2
                }
                if (Math.abs(z3) > 7) {
                    z1 = 10
                    z2 = 0
                }
            }
            if (z1 > 0 && z2 < 0) {
                if (Math.abs(z3) < 0.2){
                    z1 = 0
                    z2 = -10
                }
                if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                    z1 = 2
                    z2 = -6
                }
                if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                    z1 = 6
                    z2 = -2
                }
                if (Math.abs(z3) > 7) {
                    z1 = 10
                    z2 = 0
                }
            }
            if (z1 < 0 && z2 < 0) {
                if (Math.abs(z3) < 0.2){
                    z1 = 0
                    z2 = -10
                }
                if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                    z1 = -2
                    z2 = -6
                }
                if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                    z1 = -6
                    z2 = -2
                }
                if (Math.abs(z3) > 7) {
                    z1 = -10
                    z2 = 0
                }
            }
            if (z1 < 0 && z2 > 0) {
                if (Math.abs(z3) < 0.2){
                    z1 = 0
                    z2 = 10
                }
                if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                    z1 = -2
                    z2 = 6
                }
                if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                    z1 = -6
                    z2 = 2
                }
                if (Math.abs(z3) > 7) {
                    z1 = -10
                    z2 = 0
                }
            }
            break;
        }
        z1 /= j
        z2 /= j
        j++;
    }
    arrow_angle.push([z1, z2]);
    if (arrow_pos.length > 100) {
        arrow_pos.shift();
        arrow_angle.shift();
    }
}

function arrow_draw() {
    arrow_color = 'rgba('+50+','+25+','+100+')';
    arrow_size = 20;
    for (i = 0; i < arrow_pos.length; i++) {
        ctx.fillStyle = arrow_color;
        ctx.beginPath();
        ctx.arc(arrow_pos[i][0], arrow_pos[i][1], arrow_size, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
}
function arrow_move() {
    for (i=0; i<arrow_pos.length; i++) {
        arrow_pos[i][0] = arrow_pos[i][0] + arrow_angle[i][0];
        arrow_pos[i][1] = arrow_pos[i][1] + arrow_angle[i][1];
        if (ball_xpos > arrow_pos[i][0]-arrow_size && ball_xpos < arrow_pos[i][0]+arrow_size && ball_ypos > arrow_pos[i][1]-arrow_size && ball_ypos < arrow_pos[i][1]+arrow_size) {
//            Playing = false;
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
        z1 = you_do_tan_arrive_xpos2-you_do_tan_xpos2[i];
        z2 = you_do_tan_arrive_ypos2-you_do_tan_ypos2[i];
        z3 = 0;
        j = 1;
        while (true) {
            if (Math.abs(z1) < 5 && Math.abs(z2) < 5){
                z3 = z1 / z2
                if (z1 > 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 > 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
                break;
            }
            z1 /= j
            z2 /= j
            j++;
        }
        you_do_tan_angle2[i] = [z1, z2]
    }
    for (i = 5; i < 10; i++) {
        you_do_tan_xpos2[i] = canvas.width
        you_do_tan_ypos2[i] = Math.floor(Math.random() * canvas.height);
        z1 = you_do_tan_arrive_xpos2-you_do_tan_xpos2[i];
        z2 = you_do_tan_arrive_ypos2-you_do_tan_ypos2[i];
        z3 = 0;
        j = 1;
        while (true) {
            if (Math.abs(z1) < 5 && Math.abs(z2) < 5){
                z3 = z1 / z2
                if (z1 > 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 > 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
                break;
            }
            z1 /= j
            z2 /= j
            j++;
        }
        you_do_tan_angle2[i] = [z1, z2]
    }
    for (i = 10; i < 15; i++) {
        you_do_tan_xpos2[i] = Math.floor(Math.random() * canvas.width);
        you_do_tan_ypos2[i] = 0
        z1 = you_do_tan_arrive_xpos2-you_do_tan_xpos2[i];
        z2 = you_do_tan_arrive_ypos2-you_do_tan_ypos2[i];
        z3 = 0;
        j = 1;
        while (true) {
            if (Math.abs(z1) < 5 && Math.abs(z2) < 5){
                z3 = z1 / z2
                if (z1 > 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 > 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
                break;
            }
            z1 /= j
            z2 /= j
            j++;
        }
        you_do_tan_angle2[i] = [z1, z2]
    }
    for (i = 15; i < 20; i++) {
        you_do_tan_xpos2[i] = Math.floor(Math.random() * canvas.width);
        you_do_tan_ypos2[i] = canvas.height;
        z1 = you_do_tan_arrive_xpos2-you_do_tan_xpos2[i];
        z2 = you_do_tan_arrive_ypos2-you_do_tan_ypos2[i];
        z3 = 0;
        j = 1;
        while (true) {
            if (Math.abs(z1) < 5 && Math.abs(z2) < 5){
                z3 = z1 / z2
                if (z1 > 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 > 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = 2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = 6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = 10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 < 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = -10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = -6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = -2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
                if (z1 < 0 && z2 > 0) {
                    if (Math.abs(z3) < 0.2){
                        z1 = 0
                        z2 = 10
                    }
                    if (Math.abs(z3) > 0.2 && Math.abs(z3) < 1) {
                        z1 = -2
                        z2 = 6
                    }
                    if (Math.abs(z3) > 1 && Math.abs(z3) < 7) {
                        z1 = -6
                        z2 = 2
                    }
                    if (Math.abs(z3) > 7) {
                        z1 = -10
                        z2 = 0
                    }
                }
//               if (z1 > 0.5 && z1 < 1.5 && z2 > 1.5 && z2 < 3.5) {
//                    z1 = 1
//                    z2 = 3
//                }
//                if (z1 > 1.5 && z1 < 3.5 && z2 < 1.5 && z2 > 0.5) {
//                    z1 = 3
//                    z2 = 1
//                }
//                if (z1 > 3.5 && z1 < 5 && z2 < 0.5 && z2 > -0.5) {
//                    z1 = 5
//                    z2 = 0
//                }
//                if (z1 > 1.5 && z1 < 3.5 && z2 < -0.5 && z2 > -1.5) {
//                    z1 = 3
//                    z2 = -1
//                }
//                if (z1 > 0.5 && z1 < 1.5 && z2 < -1.5 && z2 > -3.5) {
//                    z1 = 1
//                    z2 = -3
//                }
//                if (z1 > -0.5 && z1 < 0.5 && z2 < -3.5 && z2 > -5) {
//                    z1 = 0
//                    z2 = -5
//                }
//                if (z1 < -0.5 && z1 > -1.5 && z2 > -3.5 && z2 < -1.5) {
//                    z1 = -1
//                    z2 = -3
//                }
//                if (z1 < -1.5 && z1 > -3.5 && z2 < -0.5 && z2 > -1.5) {
//                    z1 = -3
//                    z2 = -1
//                }
//                if (z1 < -3.5 && z1 > -5 && z2 < 0.5 && z2 > -0.5) {
//                    z1 = -5
//                    z2 = 0
//                }
//                if (z1 > -3.5 && z1 < -1.5 && z2 > 0.5 && z2 < 1.5) {
//                    z1 = -3
//                    z2 = 1
//                }
//                if (z1 > -1.5 && z1 < -0.5 && z2 > 1.5 && z2 < 3.5) {
//                    z1 = -1
//                    z2 = 3
//                }
//                if (z1 > -0.5 && z1 < 0.5 && z2 > 3.5 && z2 < 5) {
//                    z1 = 0
//                    z2 = 5
//                }
//                z1 *= canvas.width;
//                z2 *= canvas.width;
//                z1 /= 100;
//                z2 /= 100;
                break;
            }
            z1 /= j
            z2 /= j
            j++;
        }
        you_do_tan_angle2[i] = [z1, z2]
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
//            Playing = false;
        }
    }
}

// Play

function keylist() {
    setInterval(function(){
        if (ball_xpos > canvas.width-20) {
            keypress[0] = false;
        }
        if (ball_xpos < 0 + 20) {
            keypress[1] = false;
        }
        if (ball_ypos > canvas.height-20) {
            keypress[2] = false;
        }
        if (ball_ypos < 0+20) {
            keypress[3] = false;
        }
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
    }, 10);
}

function TimeEvt(){
    document.getElementById("time").innerHTML = "00:00:00";
    timer = setInterval(function(){
        time++;
        min = Math.floor(time/60);
        hour = Math.floor(min/60);
        sec = time%60;
        min = min%60;

        if(hour<10){
            hour = "0" + hour;
        }
        if(min < 10){
            min = "0" + min;
        }
        if(sec < 10){
            sec = "0" + sec;
        }

        document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
    }, 1000)
}

function Play() {
    ctx.fillStyle = ctx.fillStyle='rgba(255,255,255,0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = color;
    DrawBall();
    if (count % 10 == 0) {
        arrow();
    }
    arrow_draw();
    arrow_move();
    if (count >= 200 && count <= 500) {
        you_do_tan_Draw2();
        you_do_tan_Move_or_Hit2();
    } else {
        you_do_tan2();
    }
    count += 1
    if (count == 1000) {
        count = 0;
    }
    if (Playing == true) {
        requestAnimationFrame(Play);
    }
    if (Playing == false) {
        document.getElementById("gameover").innerHTML = "게임 종료:" + hour + ":" + min + ":" + sec;
        document.getElementById("restart").innerHTML = "다시시작";
        document.getElementById("test").innerHTML = "엌ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ개못햌ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ";
        console.log('gameover');
    }
}
TimeEvt();
Ball();
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
    if (e.keyCode==32){
        Playing = false;
    }
})

