let sliderIndex = 0;
const slides = document.getElementById("slides")
const totalSlides = document.querySelectorAll(".slide")
let sliderIndex1 = 0;
const slides1 = document.getElementById("slides1")
const totalSlides1 = document.querySelectorAll(".slide1")
let sliderIndex2 = 0;
const slides2 = document.getElementById("slides2")
const totalSlides2 = document.querySelectorAll(".slide2")

for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span")
    dot.classList.add("dots")
    dot.onclick = () => {
        sliderIndex = i;

    }
    dotContainer.appendChild(dot)
}

function showSlide() {
    if (sliderIndex >= totalSlides.length) {
        sliderIndex = 0;
    }

    if (sliderIndex < 0) {
        sliderIndex = totalSlides.length - 1;
    }

    slides.style.transform = `translateX(-${sliderIndex * 100}%)`

}

function moveSlide(n) {
    sliderIndex += n;
    showSlide()
}


for (let i = 0; i < totalSlides1; i++) {
    const dot = document.createElement("span")
    dot.classList.add("dots")
    dot.onclick = () => {
        sliderIndex1 = i;

    }
    dotContainer.appendChild(dot)
}

function showSlide1() {
    if (sliderIndex1 >= totalSlides1.length) {
        sliderIndex1 = 0;
    }

    if (sliderIndex1 < 0) {
        sliderIndex1 = totalSlides1.length - 1;
    }

    slides1.style.transform = `translateX(-${sliderIndex1 * 100}%)`

}

function moveSlide1(n) {
    sliderIndex1 += n;
    showSlide1()
}


for (let i = 0; i < totalSlides2; i++) {
    const dot = document.createElement("span")
    dot.classList.add("dots")
    dot.onclick = () => {
        sliderIndex2 = i;

    }
    dotContainer.appendChild(dot)
}

function showSlide2() {
    if (sliderIndex2 >= totalSlides2.length) {
        sliderIndex2 = 0;
    }

    if (sliderIndex2 < 0) {
        sliderIndex2 = totalSlides2.length - 1;
    }

    slides2.style.transform = `translateX(-${sliderIndex2 * 100}%)`

}

function moveSlide2(n) {
    sliderIndex2 += n;
    showSlide2()
}


let autoslide = setInterval(() => {
    moveSlide(1);
}, 4000);

showSlide();
showSlide1();
showSlide2();
