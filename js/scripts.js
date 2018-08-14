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
        if ($(parallaxDiv).scrollTop() >= 250) {
            $('nav').addClass('sticky');

            // $('nav div').addClass('visible-title');
        }
        else {
            $('nav').removeClass('sticky');
            // $('nav div').removeClass('visible-title');
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

});