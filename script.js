const envelope = document.getElementById("envelope")
const flap = document.querySelector(".flap")
const card = document.getElementById("card")
const cover = document.querySelector(".cover")
const music = document.getElementById("music")
const countdown = document.getElementById("countdown")

let envelopeOpened=false
let cardOpened=false

// Desktop click
envelope.addEventListener("click",openEnvelope)

// Mobile gestures
const hammer=new Hammer(document.body)

hammer.get("swipe").set({direction:Hammer.DIRECTION_ALL})

hammer.on("swipeup",function(){

if(!envelopeOpened){
openEnvelope()
}

})

hammer.on("swipeleft",function(){

if(envelopeOpened && !cardOpened){
openCard()
}

})

// Open envelope
function openEnvelope(){

envelopeOpened=true

music.play()

gsap.to(flap,{
duration:1,
rotationX:180
})

gsap.to(card,{
duration:1.5,
y:-250,
delay:0.5,
ease:"power2.out"
})

setTimeout(openCard,2000)

}

// Open card
function openCard(){

cardOpened=true

gsap.to(cover,{
duration:1.5,
rotationY:-135,
transformOrigin:"left"
})

startPetals()

countdown.classList.remove("hidden")
startCountdown()

}

// Petal animation
function startPetals(){

for(let i=0;i<30;i++){

let petal=document.createElement("img")

petal.src="images/petal.png"

petal.style.position="absolute"
petal.style.width="20px"
petal.style.left=Math.random()*window.innerWidth+"px"
petal.style.top="-20px"

document.getElementById("petals").appendChild(petal)

gsap.to(petal,{
y:window.innerHeight+100,
x:"+=100",
rotation:360,
duration:6+Math.random()*5,
ease:"linear",
repeat:-1
})

}

}

// Countdown timer
function startCountdown(){

const targetDate = new Date("April 19, 2026 15:00:00").getTime()

setInterval(function(){

const now = new Date().getTime()

const distance = targetDate - now

const days = Math.floor(distance/(1000*60*60*24))
const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60))
const minutes = Math.floor((distance%(1000*60*60))/(1000*60))
const seconds = Math.floor((distance%(1000*60))/1000)

document.getElementById("days").innerText = days
document.getElementById("hours").innerText = hours
document.getElementById("minutes").innerText = minutes
document.getElementById("seconds").innerText = seconds

},1000)

}
