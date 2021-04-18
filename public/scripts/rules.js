
const heading2 = document.querySelector('#heading2');


window.onload=function(){
    const rules = document.querySelector('.rule');
    const heading2 = document.querySelector('#heading2');
    const disclamer = document.querySelector('#introP');
    const content = document.querySelector("#content");

    const tLine = new TimelineMax({ default: {ease: 'power1.out'} });
//        .to(disclamer, {y: "-100%", duration: 1});   

    tLine.fromTo(rules, 1, {height: "0%"}, {height: '80%'})
        .fromTo(heading2, 0.5, {opacity:0, x:30}, {opacity:1, x:0}, "-=1")
        .fromTo(".navbar", {opacity: 0}, { opacity: 1, duration: 0.6 })
        //.fromTo("#introP", {opacity: 0}, { opacity: 1, duration: 0.9 });
        .from(disclamer, { opacity: 0, duration: 1, ease: Sine.easeOut,y: -500 })
        .from(content, { opacity: 0, duration: 1, ease: Sine.easeOut,y: -500 });


}
