class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;

        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class='wrap'>${this.txt}</span>`;

        let delta = 150 - Math.random() * 100;
        // var delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 100;
            // delta = 500;
        }

        setTimeout(this.tick.bind(this), delta);
    }
}

window.addEventListener('load', () => {
    const parallaxDiv = document.querySelector('.parallax');
    parallaxDiv.addEventListener('scroll', () => {
        console.log($(parallaxDiv).scrollTop());
        if ($(parallaxDiv).scrollTop() >= 0) {
            $('nav').addClass('sticky');

            // $('nav div').addClass('visible-title');
        }
        else {
            $('nav').removeClass('sticky');
            // $('nav div').removeClass('visible-title');
        }


        // window.scrollBy(0, valueInVh * window.innerHeight/100);


        const valueInVh = 25;
        const x = valueInVh * window.innerHeight/100;

        if ($(parallaxDiv).scrollTop() <= x ) {



            const alphaQ = document.querySelector('.a-q-bg');
            let scrollY = $(parallaxDiv).scrollTop();
            let offsetY = alphaQ.offsetTop;
            let y = scrollY;

            // alert(scrollY);
            // alert(offsetY);

            alphaQ.style.top = y + "px";

            // alphaQ.style.top = offsetY - 1 + "px";



        }
        else {


        }


    });

    const elements = document.getElementsByClassName('typewrite');

    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }




    $(document).ready(function(){
        $(".nav-header").on("click","a", function (event) {
            event.preventDefault();
            let id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('.parallax').stop().animate({scrollTop: top}, 900);
        });
    });




/*

    let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
        V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)

    for (let i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
            e.preventDefault(); //отменяем стандартное поведение
            const w = window.pageYOffset,  // производим прокрутку
                hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
            let t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null;
            requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
                window.scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash  // URL с хэшем
                }
            }
        }, false);
    };


*/


/*

    function runScroll() {
        scrollTo(document.querySelector(".section-we-help"), 0, 900);
    }
    let scrollme;
    scrollme = document.querySelector("#scrollmeHome");
    scrollme.addEventListener("click",runScroll,false);

    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        let difference = to - element.scrollTop;
        let perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }

*/



});


