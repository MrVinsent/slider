let carousel = document.querySelector('.carousel');
let firstImg = carousel.querySelectorAll('img')[0];
let arrowIcons = document.querySelectorAll(".arrow")

let isDragingStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = firstImg.clientWidth + 14; // getting firstr img width & adding 14 margin value


let showHideIcons = () => {
    //showing and hidding prev/next icon according to carusel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //getting max scrollable width;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "flex";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "flex";
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 24; // getting firstr img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); 
    })
})


const dragStart = (e) => {
    //updatting global variables value on mouse down
    isDragingStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
    
}
const dragging = (e) => {
    //scrollimg images/carousel to left according to mouse pointer
    if(!isDragingStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging")
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons()
}

const autoSlide = () =>{

    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return

    positionDiff = Math.abs(positionDiff); //making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : positionDiff;
    console.log(positionDiff)
}

const dragStop = () => {
    isDragingStart = false;
    carousel.classList.remove("dragging")

    if(!isDragging) return
    isDragging = false;
    autoSlide()
}
carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchstart', dragStart)

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('touchmove', dragging)

carousel.addEventListener("mouseup", dragStop)
carousel.addEventListener("mouseleave", dragStop)
carousel.addEventListener("touchend", dragStop)