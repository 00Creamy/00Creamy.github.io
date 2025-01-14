function checkMaximize() {
    const isMaximized = window.innerWidth >= window.screen.availWidth;
    const contentDiv = document.getElementById("content"); // Select the <div> with id="content"

    if (contentDiv) {
        if (isMaximized) {
            contentDiv.classList.add("content-maximize");
        } else {
            contentDiv.classList.remove("content-maximize");
        }
    }
}

// Add an event listener to update the class on window resize
window.addEventListener("resize", checkMaximize);

// Run initially to set the correct class on page load
checkMaximize();