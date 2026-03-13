//creating a star-cursor and glow around the star
const star = document.querySelector(".star-cursor");
const glow = document.querySelector(".star-glow");
//mouse position is initialised and where the mouse is, is given by 
let mouseX = 0;
let mouseY = 0;
//storing star position
let starX = 0;
let starY = 0;
//whenever you move the mouse, this function is called
document.addEventListener("mousemove",(e)=>{
//position of the mouse
mouseX = e.clientX;
mouseY = e.clientY;
});
/* smooth floating follow */
function animateCursor(){
//makes sure that the star doesnt follow the mouse immediately
starX += (mouseX - starX) * 0.15;
starY += (mouseY - starY) * 0.15;
star.style.left = starX + "px";
star.style.top = starY + "px";
glow.style.left = starX + "px";
glow.style.top = starY + "px";
    //repeats this function
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

/* MAGNETIC BUTTON */
const magnets = document.querySelectorAll(".magnetic");
magnets.forEach(btn=>{
btn.addEventListener("mousemove",(e)=>{
    //tells where button is
const rect = btn.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;
    //moves button to mouse
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
    //makes star dissapear after sometime
setTimeout(()=>{
star.remove();
},600);
}
setInterval(createStar,50);
/* --- STAR TRAIL WHEN TYPING --- */
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    //when user types smth
    input.addEventListener('input', (e) => {
        const rect = e.target.getBoundingClientRect();
        //position of text box
        for(let i=0; i<3; i++){ 
            const star = document.createElement('div');
            star.className = 'input-star';
            // makes star move in random directions
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

