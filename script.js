const $reloadBtn = document.querySelector('.reload-btn');
const $box = document.querySelector('.box');
const $rectangle = document.querySelector('.rectangle');
const $allRectangle = document.querySelectorAll('.rectangle');
const $numberOfRectangles = $allRectangle.length - 1;
const $bodyOverlay = document.querySelector('.body-overlay');

let $activeBall = null;
let $score= 0;



$reloadBtn.addEventListener('click', () => {
    location.reload();
});


const chooseBall = (e) =>{
    const parent = e.target.parentElement;
 
    if($activeBall === null){
        if(parent.childElementCount > 0){
                parent.firstElementChild.classList.toggle('ball-active');
                $activeBall = parent.firstElementChild;
                if($activeBall.classList.contains('ball-error')){
                    $activeBall.classList.remove('ball-error');
                }

         }else if(e.target.classList.contains('rectangle')){
            e.target.firstElementChild.classList.toggle('ball-active');
            $activeBall = e.target.firstElementChild;
            
         }

    }else {
        moveBallToSelectedRectangle(e);
    }
    
}

const moveBallToSelectedRectangle = (e) =>{
    target = e.target;
    if (target === $activeBall || target === $activeBall.parentElement.children[1] || target === $activeBall.parentElement.children[2]){
        $activeBall.classList.remove('ball-active');
        $activeBall=null;
    }

    if (target.classList.contains('rectangle')){
            const el = document.createElement('div')

            el.setAttribute('title', $activeBall.title);
            el.setAttribute('class', $activeBall.classList);
            el.classList.remove('ball-active');

            target.prepend(el);
            $activeBall.remove();
            $activeBall=null;

        }else if(target.parentElement.classList.contains('rectangle')){
            const el = document.createElement('div')

            el.setAttribute('title', $activeBall.title);
            el.setAttribute('class', $activeBall.classList);
            el.classList.remove('ball-active');

            target.parentElement.prepend(el);
            $activeBall.remove();
            $activeBall = null;
        }
}

const checkingSortBalls = () => {
    const countParents = $allRectangle.length;
    const colorOfRectangles = [];

    
    for (let i = 0; i < countParents; i++) {
        const element = $allRectangle[i]
        if(element.childElementCount === 5){
            const titleBall = element.children[1].title;

            if (titleBall === element.firstElementChild.title){
                $score++;
                colorOfRectangles.push(titleBall);
            }
        }
        if(colorOfRectangles.length === $numberOfRectangles){
            $bodyOverlay.style.display = "flex";
        }
    }
}


$box.addEventListener('click', e =>{
    chooseBall(e)
    checkingSortBalls();
});



