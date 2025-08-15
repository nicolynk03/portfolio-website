// mode/theme switch function
function switchTheme() {
    const root = document.documentElement;
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme == "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    // document.documentElement.setAttribute("data-theme", currentTheme == "dark" ? "light" : "dark");

    // update button icon
    const themeBtn = document.getElementById("theme-toggle");
    if (newTheme === "dark") {
        themeBtn.innerHTML = '🌙';
    } else {
        themeBtn.innerHTML = '☀️';
    }
}

// initialise icon on page load
window.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.innerHTML = currentTheme === "dark" ? "🌙" : '☀️';
});
