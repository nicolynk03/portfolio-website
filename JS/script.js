// mode/theme switch function
function switchTheme() {
    const root = document.documentElement;
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme == "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    // document.documentElement.setAttribute("data-theme", currentTheme == "dark" ? "light" : "dark");

    // save current theme
    localStorage.setItem("theme", newTheme);

    // update button icon according to current theme
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.innerHTML = newTheme === "dark" ? '🌙' : '☀️';
}

// initialise icon on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);


    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.innerHTML = currentTheme === "dark" ? "🌙" : '☀️';
});


// change navbar style when user scrolls through the website
window.onscroll = function () {
    navbarWhenScrolled();
};

function navbarWhenScrolled() {
    const navbar = document.querySelector('.navbar');

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        // if scrolled more than 50px, add the 'scrolled' class
        navbar.classList.add('scrolled');
    } else {
        // if at the top or scrolled less than 50px, remove the 'scrolled' class
        navbar.classList.remove('scrolled');
    }
}

// toggle sidebar menu (active class)
const navbarNav = document.querySelector('.navbar-nav');
// when hamburger menu is clicked
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};
// close sidebar menu by clicking anywhere outside the sidebar itself
const hamburger = document.querySelector('#hamburger-menu');
document.addEventListener('click', function (event) {
    // if clicked outside hamburger menu and navbar
    if (!hamburger.contains(event.target) && !navbarNav.contains(event.target)) {
        navbarNav.classList.remove('active');
    }
});

// projects filtering logic
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        projectCards.forEach(card => {
            if (filter === "all" || card.getAttribute("data-type") === filter) {
                // show relevant project card(s) with animation
                card.classList.remove("hidden");
            } else {
                // hide irrelevant project card(s) with animation
                card.classList.add("hidden");
            }
        });
    });
});

// to reduce flash when moving between pages
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// to expand project card in projects.html
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        const fullContent = card.querySelector(".full-project-card-content");

        if (fullContent.style.display === "none") {
            fullContent.style.display = 'block';
            button.textContent = 'Read Less';
        } else {
            fullContent.style.display = 'none';
            button.textContent = 'Read More';
        }
    });
});


