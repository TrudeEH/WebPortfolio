const navElements = document.querySelectorAll("nav #nav-container a");
articles = document.querySelectorAll("article");
pointer = 1;

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
        pointer = p;
    });
});

window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        // Scroll down
        scrollToNextArticle();
    } else if (event.deltaY < 0) {
        // Scroll up
        scrollToPreviousArticle();
    }
});

function scrollToNextArticle() {
    if (pointer < articles.length) {
        const currentArticle = articles[pointer - 1];
        const nextArticle = articles[pointer];
        if (nextArticle) {
            // Calculate the offset to scroll to
            const offset = pointer * currentArticle.clientHeight;
            window.scrollTo({ top: offset, behavior: "smooth" });
            pointer = pointer + 1;

            // Update nav
            const activeItem = document.querySelector(".active");

            if (activeItem) {
                activeItem.classList.remove("active");
            }

            navbarItems[pointer - 1].classList.add("active");
        }
    } else if (pointer == articles.length) {
        const offset = pointer * articles[pointer - 1].clientHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
    }
    console.log(pointer);
}

function scrollToPreviousArticle() {
    if (pointer > 1) {
        const prevArticle = articles[pointer - 1];
        pointer = pointer - 1;
        if (prevArticle) {
            // Calculate the offset to scroll to
            const offset = prevArticle.offsetTop - window.innerHeight;
            window.scrollTo({ top: offset, behavior: "smooth" });

            // Update nav
            const activeItem = document.querySelector(".active");

            if (activeItem) {
                activeItem.classList.remove("active");
            }

            navbarItems[pointer - 1].classList.add("active");
        }
    } else {
        const offset = pointer.offsetTop - window.innerHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
    }
    console.log(pointer);
}
