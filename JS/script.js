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
window.onscroll = function() {
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



