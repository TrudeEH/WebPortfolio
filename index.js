const navElements = document.querySelectorAll("nav #nav-container a");

function menuToggle(x) {
    
    if (x.classList.contains("menuAlt")) {
        document.getElementById("nav").classList.add("nav-open");
        setTimeout(() => {
            document.getElementById("nav").classList.remove("nav-open");
            document.getElementById("nav-container").style.display = "flex";
        }, 200);
    } else {
        document.getElementById("nav").classList.add("nav-close");
        document.getElementById("nav-container").style.display = "none";
        setTimeout(() => {
            document.getElementById("nav").classList.remove("nav-close");
        }, 200);
    }
    x.classList.toggle("menuAlt");
    document.getElementById("nav").classList.toggle("hide");
}

const navbarItems = document.querySelectorAll("nav #nav-container a");
navbarItems.forEach((item) => {
    item.addEventListener("click", () => {
        const activeItem = document.querySelector(".active");

        if (activeItem) {
            activeItem.classList.remove("active");
        }

        item.classList.add("active");
    });
});


// Capture the scroll event
window.addEventListener('wheel', function(e) {
    e.preventDefault(); // Prevent the default scrolling

    // Determine the direction of the scroll
    var delta = Math.sign(e.deltaY);

    // Scroll the page by 100vh in the direction of the scroll
    window.scrollBy({
        top: delta * window.innerHeight, // 100vh
        behavior: 'smooth' // Smooth scrolling
    });
}, { passive: false }); // Use passive: false to make preventDefault work


// Capture the touch swipe event
let startY;

window.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false }); // Use passive: false to make preventDefault work

window.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
}, false);

window.addEventListener('touchend', function(e) {
    let endY = e.changedTouches[0].clientY;
    let deltaY = startY - endY;

    let direction = deltaY > 0 ? 1 : -1;

    window.scrollBy({
        top: direction * window.innerHeight, // 100vh
        behavior: 'smooth' // Smooth scrolling
    });
}, false);