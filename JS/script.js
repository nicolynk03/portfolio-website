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
