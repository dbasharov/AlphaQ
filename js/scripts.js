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

        // console.log($(parallaxDiv).scrollTop());

        // NAV sticky start

        // if ($(parallaxDiv).scrollTop() >= 0) {
        //     $('nav').addClass('sticky');

        // }
        // else {
        //     $('nav').removeClass('sticky');
        //
        // }


        // NAV sticky end




        // window.scrollBy(0, valueInVh * window.innerHeight/100);


        const valueInVh = 24;
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



    let linkNav = document.querySelectorAll('[href^="#"]'),
        V = 0.4;  // scrolling speed

    for (let i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) {
            e.preventDefault();
            let w = window.pageYOffset | document.querySelector('.parallax').scrollTop,
                hash = this.href.replace(/[^#]*(.*)/, '$1');
            const offset = 0;
            let t = document.querySelector(hash).getBoundingClientRect().top - offset,
                start = null;
            requestAnimationFrame(step);  // for more about animate [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
                document.querySelector('.parallax').scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash
                }
            }
        }, false);
    };



});


history.pushState('', document.title, window.location.pathname);