const companion = document.getElementById('companion');
let isDragging = false;
let offsetX, offsetY;

const margin = 10; // safe distance from edges
const step = 10;   // step for sliding away
const idleStep = 2; // small nudge when idle
const idleInterval = 50; // ms between idle nudges

// Utility: is element clickable or has visible text?
function isBlockingElement(elem) {
    if (!elem) return false;
    const blockTags = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'];
    if (blockTags.includes(elem.tagName)) return true;

    // Check if element has visible text
    if (elem.textContent && elem.textContent.trim().length > 0) return true;

    return false;
}

// Try to nudge the companion away from a blocking element
function nudgeAway(x, y, stepSize = step) {
    const maxX = window.innerWidth - companion.offsetWidth - margin;
    const maxY = window.innerHeight - companion.offsetHeight - margin;

    companion.style.left = x + 'px';
    companion.style.top = y + 'px';

    // Temporarily hide companion to avoid detecting itself
    companion.style.visibility = 'hidden';
    let elem = document.elementFromPoint(x + companion.offsetWidth / 2, y + companion.offsetHeight / 2);
    companion.style.visibility = 'visible';

    if (isBlockingElement(elem)) {
        // Slide diagonally away
        let newX = Math.min(x + stepSize, maxX);
        let newY = Math.min(y + stepSize, maxY);
        // Stop if we hit the edges
        if (newX === x && newY === y) return { x, y };
        return nudgeAway(newX, newY, stepSize); // recursive nudge
    }

    return { x, y };
}

// Start dragging
companion.addEventListener('mousedown', e => {
    isDragging = true;
    companion.classList.add('dragging');
    offsetX = e.clientX - companion.getBoundingClientRect().left;
    offsetY = e.clientY - companion.getBoundingClientRect().top;
});

// Dragging
document.addEventListener('mousemove', e => {
    if (!isDragging) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Clamp to viewport edges
    const maxX = window.innerWidth - companion.offsetWidth - margin;
    const maxY = window.innerHeight - companion.offsetHeight - margin;
    x = Math.min(Math.max(x, margin), maxX);
    y = Math.min(Math.max(y, margin), maxY);

    // Nudge away if needed
    const pos = nudgeAway(x, y);
    companion.style.left = pos.x + 'px';
    companion.style.top = pos.y + 'px';
});

// Stop dragging
document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    companion.classList.remove('dragging');
});

// Click animation (spin + color filter)
companion.addEventListener('click', () => {
    companion.style.transform = 'rotate(360deg)';
    companion.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    setTimeout(() => companion.style.transform = 'rotate(0deg)', 300);
});

// IDLE: Magnet avoidance effect
setInterval(() => {
    if (isDragging) return; // don't interfere when dragging

    const rect = companion.getBoundingClientRect();
    let pos = nudgeAway(rect.left, rect.top, idleStep);
    companion.style.left = pos.x + 'px';
    companion.style.top = pos.y + 'px';
}, idleInterval);
