
const heading2 = document.querySelector('#heading2');


window.onload=function(){
    const rules = document.querySelector('.rule');
    const heading2 = document.querySelector('#heading2');
    const disclamer = document.querySelector('#introP');
    const content = document.querySelector("#content");

    const tLine = new TimelineMax({ default: {ease: 'power1.out'} });

    tLine.fromTo(rules, 1, {height: "0%"}, {height: '100%'})
        .fromTo(heading2,  {opacity:0, x:50}, {opacity:2, x:0}, "-=0.95")
        .fromTo(".navbar", {opacity: 0}, { opacity: 2, duration: 0.65 })
        .from(disclamer, { opacity: 0, duration: 0.9, ease: Sine.easeOut,y: -500 })
        .from(content, { opacity: 0, duration: 0.9, ease: Sine.easeOut,y: -500 });



}
