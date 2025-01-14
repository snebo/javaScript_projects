export class Carousel {
    constructor(container, images) {
        this.container = container;
        this.images = images;
        this.slideIndex = 1;

        this.init();
    }
    init() {
        const frame = this.container.querySelector(".carousel_container");
        frame.innerHTML = "";
        this.createSlideElements(frame);
        this.createNavigators(frame);
        this.createDots();

        this.showSlides(this.slideIndex);
    }
    createSlideElements(frame) {
        this.images.forEach((image) => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            slide.innerHTML = `
                <img src="${image.src}" alt="${image.alt}"/>
                <div class="slide_caption">${image.caption}</div>
            `;
            frame.appendChild(slide);
        });
    }
    createNavigators(frame) {
        const navigator = document.createElement("a");
        navigator.classList.add("slide-arrow", "left");
        navigator.href = "#";
        navigator.innerHTML = "&#10094;";
        frame.appendChild(navigator);
        navigator.addEventListener("click", (e) => {
            e.preventDefault();
            this.showSlides((this.slideIndex += 1));
        });
        const navigator2 = navigator.cloneNode(true);
        navigator2.classList.remove("left");
        navigator2.classList.add("right");
        navigator2.innerHTML = "&#10095;";
        frame.appendChild(navigator2);
        navigator2.addEventListener("click", (e) => {
            e.preventDefault();
            this.showSlides((this.slideIndex += 1));
        });
    }
    createDots() {
        const dotContainer = this.container.querySelector(".dot_select");
        this.images.forEach((image, index) => {
            const dot = document.createElement("span");
            dot.classList.add("slide_dot");
            dot.dataset.index = index;
            dotContainer.appendChild(dot);

            dot.addEventListener("click", () => {
                this.showSlides((this.slideIndex = index + 1)); // Navigate to the clicked slide
            });
        });
    }
    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("slide_dot");
        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
    }
}