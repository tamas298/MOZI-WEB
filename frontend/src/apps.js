const arrows = document.querySelectorAll(".nyil");
const movieLists = document.querySelectorAll(".filmlista");


arrows.forEach((nyil, i) => {

    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    nyil.addEventListener("click", () => {
        const ratio = Math.floor(window.innerWidth / 270);
        clickCounter++;
        if (itemNumber - (3 + clickCounter) + (4 - ratio) >= 0) {

            movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap
                ().get("transform")[0].x.value - 300}px)`;

        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
    });
    console.log(Math.floor(window.innerWidth / 270));
});