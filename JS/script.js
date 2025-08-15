// mode/theme switch function
function switchTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", currentTheme == "dark" ? "light" : "dark");
}