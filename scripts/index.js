$(document).ready(function(e) {
    var messageShowingDuration = 1.8

    gsap.set("#letsgobtn", {
        visibility: 'hidden',
        x: '-100vw'
    })
    gsap.set('#magnet', {
        opacity: 0
    })
    gsap.set("#cat", { scale: '2.5' })


    timeline = gsap.timeline({ onComplete: showButton });
    timeline
        .to("body", {
            backgroundColor: "rgb(32, 46, 47)",
            duration: 0.8
        })
        .to(".main-container", {
            backgroundColor: '#041421'
        })
        .from(".main-container", {
            opacity: 0,
            duration: 1
        })
        .from(".hi", {
            display: "none",
            opacity: 0,
            stagger: messageShowingDuration,
            onUpdate: scrollDown
        })
    function scrollDown() {
        gsap.to('.main-container', {
            scrollTop: document.getElementsByClassName('main-container')[0].scrollHeight,
            ease: 'bounce'
        })
    }

    function showButton() {
        const timeline = gsap.timeline({ duration: 1.2 })
        timeline
            .to("#magnet", {
                opacity: 1
            })
            .to("#letsgobtn", {
                visibility: 'visible',
                x: '0vw',
                ease: 'bounce',
            })
            .add("CatAppearing")
            .to("#magnet", {
                rotate: '-75deg',
                translateY: '10px'
            }, '<2')
            .to("#cat", {
                visibility: 'visible',
                duration: 1.7,
                top: document.getElementsByClassName("main-container")[0].getBoundingClientRect().y-20,
                repeat: -1,
                yoyo: true,
            }, "CatAppearing+=0.4")
    }

});