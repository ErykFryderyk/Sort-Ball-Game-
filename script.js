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
        if(parent.childElementCount > 0 && parent.firstElementChild.classList.contains('ball')){
                parent.firstElementChild.classList.toggle('ball-active');
                $activeBall = parent.firstElementChild;
                if($activeBall.classList.contains('ball-error')){
                    $activeBall.classList.remove('ball-error');
                }

         }else if(e.target.classList.contains('rectangle') && e.target.childElementCount >0){
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

    if (target.classList.contains('rectangle') && target.childElementCount < 3 && $activeBall !== null){

            if(target.children.length === 0 || target.children[0].title === $activeBall.title){
                const el = document.createElement('div')

                el.setAttribute('title', $activeBall.title);
                el.setAttribute('class', $activeBall.classList);
                el.classList.remove('ball-active');

                target.prepend(el);
                $activeBall.remove();
            }else {
                $activeBall.classList.add('ball-error');
                $activeBall.classList.remove('ball-active');
            }
            $activeBall=null;

        }else if(target.parentElement.classList.contains('rectangle') && target.parentElement.childElementCount < 3){
            if (target.parentElement.children.length === 0 || target.parentElement.children[0].title === $activeBall.title){
                const el = document.createElement('div')

                el.setAttribute('title', $activeBall.title);
                el.setAttribute('class', $activeBall.classList);
                el.classList.remove('ball-active');

                target.parentElement.prepend(el);
                $activeBall.remove();
            } else {
                $activeBall.classList.add('ball-error');
                $activeBall.classList.remove('ball-active');
            }
            $activeBall = null;
        }
}

const checkingSortBalls = () => {
    const countParents = $allRectangle.length;
    const colorOfRectangles = [];

    
    for (let i = 0; i < countParents; i++) {
        const element = $allRectangle[i]
        if(element.childElementCount === 3){
            const titleBall = element.children[1].title;

            if (titleBall === element.firstElementChild.title && titleBall === element.lastElementChild.title){
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



