
const heading2 = document.querySelector('#heading2');


window.onload=function(){
    const rules = document.querySelector('.rule');
    const heading2 = document.querySelector('#heading2');

    const tl = new TimelineMax({ default: {ease: 'power1.out'} });

    tl.fromTo(rules, 1, {height: "0%"}, {height: '80%'})
        .fromTo(heading2, 0.5, {opacity:0, x:30}, {opacity:1, x:0}, "-=1")




}
