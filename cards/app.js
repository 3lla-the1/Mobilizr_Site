/*Alphabetical Tabs: These will act as selectors or headers for each section.
File Cards: Each card can represent a section or category.
Notes Area: A special space or "sticky note" area for important notes or highlights.
*/

document.addEventListener('DOMContentLoaded', function () {
    const stack = document.querySelector('.card-stack');
    const cards = document.querySelectorAll('.card');

    function adjustCards() {
        let scroll = stack.scrollTop;
        cards.forEach((card, index) => {
            let cardPos = (index * 150) - scroll; // Adjust the 150 to the amount of each card visible when stacked
            if (cardPos < 150 && cardPos > -150) { // Centered card logic
                card.style.transform = `translateY(${cardPos}px) scale(1)`;
            } else if (cardPos >= 150) {
                card.style.transform = `translateY(${cardPos}px) scale(0.8)`;
            } else {
                card.style.transform = `translateY(${cardPos}px) scale(0.8)`;
            }
        });
    }

    stack.addEventListener('scroll', adjustCards);

    // Initial adjust call
    adjustCards();
});