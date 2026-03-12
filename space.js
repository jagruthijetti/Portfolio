const star = document.querySelector(".star-cursor");
const glow = document.querySelector(".star-glow");

let mouseX = 0;
let mouseY = 0;

let starX = 0;
let starY = 0;

/* track mouse */

document.addEventListener("mousemove",(e)=>{

mouseX = e.clientX;
mouseY = e.clientY;

});

/* smooth floating follow */

function animateCursor(){

starX += (mouseX - starX) * 0.15;
starY += (mouseY - starY) * 0.15;

star.style.left = starX + "px";
star.style.top = starY + "px";

glow.style.left = starX + "px";
glow.style.top = starY + "px";

requestAnimationFrame(animateCursor);

}

animateCursor();
/* SCROLL REVEAL */

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});

document.querySelectorAll(".hidden").forEach(el=>{
observer.observe(el);
});


/* PARALLAX SPACE */

document.addEventListener("mousemove",(e)=>{

document.querySelectorAll(".planet").forEach(planet=>{

let speed=planet.getAttribute("data-speed");

let x=(window.innerWidth-e.pageX*speed)/100;
let y=(window.innerHeight-e.pageY*speed)/100;

planet.style.transform=`translateX(${x}px) translateY(${y}px)`;

});

});
/* MAGNETIC BUTTON */

const magnets = document.querySelectorAll(".magnetic");

magnets.forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect = btn.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;

btn.style.transform = `translate(${x*0.2}px,${y*0.2}px)`;

});

btn.addEventListener("mouseleave",()=>{
btn.style.transform="translate(0,0)";
});

});
/* STAR TRAIL */

function createStar(){

const star = document.createElement("div");

star.className = "cursor-star";

document.body.appendChild(star);

star.style.left = mouseX + "px";
star.style.top = mouseY + "px";

setTimeout(()=>{
star.remove();
},600);

}

setInterval(createStar,50);
/* CREATE SINGLE METEOR */

function createMeteor(){

const meteor = document.createElement("div");

meteor.className = "meteor";

/* random starting position */

meteor.style.top = Math.random()*window.innerHeight*0.4 + "px";
meteor.style.left = Math.random()*window.innerWidth + "px";

/* random speed */

meteor.style.animationDuration = (Math.random()*1 + 0.8) + "s";

document.body.appendChild(meteor);

setTimeout(()=>{
meteor.remove();
},2000);

}
/* LETTER STAR BURST */

document.querySelectorAll(".space-title span").forEach(letter=>{

letter.addEventListener("mouseenter",(e)=>{

for(let i=0;i<6;i++){

const star = document.createElement("div");

star.className="letter-star";

/* random burst direction */

let x = (Math.random()*40 - 20) + "px";
let y = (Math.random()*40 - 20) + "px";

star.style.setProperty("--x",x);
star.style.setProperty("--y",y);

/* position */

const rect = letter.getBoundingClientRect();

star.style.left = rect.left + rect.width/2 + "px";
star.style.top = rect.top + rect.height/2 + "px";

document.body.appendChild(star);

setTimeout(()=>{
star.remove();
},800);

}

});

});
/* --- STAR TRAIL WHEN TYPING --- */
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const rect = e.target.getBoundingClientRect();
        
        for(let i=0; i<3; i++){ // spawn 3 tiny stars per keystroke
            const star = document.createElement('div');
            star.className = 'input-star';
            
            // random burst direction
            let x = (Math.random()*30 - 15) + 'px';
            let y = (Math.random()*30 - 15) + 'px';
            star.style.setProperty('--x', x);
            star.style.setProperty('--y', y);
            
            // position at cursor inside input
            star.style.left = (rect.left + rect.width/2) + 'px';
            star.style.top = (rect.top + rect.height/2) + 'px';
            
            document.body.appendChild(star);
            
            // remove star after animation
            setTimeout(() => { star.remove(); }, 600);
        }
    });
});
const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const STAR_COUNT = 120;
const LINK_DISTANCE = 130;

// create stars
for(let i=0;i<STAR_COUNT;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.2,
vy:(Math.random()-0.5)*0.2
});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// draw stars
stars.forEach(star=>{
ctx.beginPath();
ctx.arc(star.x,star.y,1.5,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();
});

// draw lines
for(let i=0;i<stars.length;i++){
for(let j=i+1;j<stars.length;j++){

let dx=stars[i].x-stars[j].x;
let dy=stars[i].y-stars[j].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<LINK_DISTANCE){

ctx.beginPath();
ctx.moveTo(stars[i].x,stars[i].y);
ctx.lineTo(stars[j].x,stars[j].y);
ctx.strokeStyle="rgba(255,255,255,"+(1-dist/LINK_DISTANCE)+")";
ctx.lineWidth=0.5;
ctx.stroke();

}

}
}

// move stars
stars.forEach(star=>{
star.x+=star.vx;
star.y+=star.vy;

if(star.x<0||star.x>canvas.width) star.vx*=-1;
if(star.y<0||star.y>canvas.height) star.vy*=-1;
});

requestAnimationFrame(draw);
}

draw();

// resize fix
window.addEventListener("resize",()=>{
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
});