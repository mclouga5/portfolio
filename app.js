/* Apply typing effect to all elements with data-type attribute */
function typeText(element, text, delay = 100, callback = null) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, delay);
        } else if (callback) {
            callback();  // Call the callback function after typing is finished
        }
    }

    type();
}

// Function to sequentially type text for each element
function typeSequentially(elements, currentIndex = 0) {
    if (currentIndex < elements.length) {
        const element = elements[currentIndex];
        const text = element.getAttribute('data-type');
        const speed = element.getAttribute('data-speed') || 100;  // Use custom speed if available

        element.classList.remove('hidden');  // Unhide the element before typing
        typeText(element, text, speed, () => {
            // Move to the next element once the current one is done typing
            typeSequentially(elements, currentIndex + 1);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const elementsToType = document.querySelectorAll('[data-type]');

    // Start typing for all elements sequentially
    typeSequentially(elementsToType);
});