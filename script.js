const menuBtn=document.getElementById("menuBtn");const nav=document.getElementById("nav");menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));document.querySelectorAll("nav a").forEach(link=>link.addEventListener("click",()=>nav.classList.remove("open")));

window.addEventListener("load",()=>document.body.classList.add("loaded"));

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");entry.target.querySelectorAll("[data-target]").forEach(runCounter)}})},{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function runCounter(el){if(el.dataset.done)return;el.dataset.done="1";const target=parseFloat(el.dataset.target);const decimal=el.dataset.decimal==="true";let value=0;const steps=55;const inc=target/steps;const timer=setInterval(()=>{value+=inc;if(value>=target){value=target;clearInterval(timer)}el.textContent=(decimal?value.toFixed(1):Math.floor(value))+"+"},28)}

const grid=document.querySelector(".contribution-grid");if(grid){for(let i=0;i<182;i++){const s=document.createElement("span");s.style.setProperty("--o",(0.08+Math.random()*.72).toFixed(2));grid.appendChild(s)}}

const lightbox=document.getElementById("lightbox"),lightboxImg=document.getElementById("lightboxImg");document.querySelectorAll("[data-image]").forEach(btn=>btn.addEventListener("click",()=>{lightboxImg.src=btn.dataset.image;lightbox.classList.add("open")}));document.getElementById("lightboxClose").addEventListener("click",()=>lightbox.classList.remove("open"));lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("open")});

const scrollTop=document.getElementById("scrollTop");window.addEventListener("scroll",()=>scrollTop.classList.toggle("show",window.scrollY>600));scrollTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit",event=>{event.preventDefault();const name=document.getElementById("name").value.trim();const email=document.getElementById("email").value.trim();const message=document.getElementById("message").value.trim();window.location.href=`mailto:shubhampawase078@gmail.com?subject=${encodeURIComponent("Portfolio enquiry from "+name)}&body=${encodeURIComponent(message+"\\n\\nFrom: "+name+"\\nEmail: "+email)}`});