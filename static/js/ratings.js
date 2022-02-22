/*
const roundClosest = (number, closest) => {
    return Math.round(number/closest) * closest;
}
*/

function ratingStarHover() {
    const ratingStars = document.querySelectorAll(".rating-star");
    for (let star of ratingStars) {
        star.addEventListener("mouseover", toggleRating);
        star.addEventListener("mouseleave", resetRating);
    }
}

function toggleRating(e) {
    const allStars = e.target.parentElement.children;
    for (let star of allStars) {
        if (star.className !== "rating-star") {
            star.className = "rating-star";
        }
    }
}

function resetRating(e) {
    const originalRating = document.getElementById("original-rating");
    originalRating.previousElementSibling.className = `rating-star ${originalRating.value}`;
}
