const navElements = document.querySelectorAll("nav #nav-container a");

function menuToggle(x) {
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
