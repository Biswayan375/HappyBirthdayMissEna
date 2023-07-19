var i, zs = new Array(),
    pages = document.querySelector('.book').children;

// setting up initial stacking of pages
for (i = 0; i < pages.length; i++) {
    zs.push(100-i);
    pages[i].style.zIndex = zs[i];
}
i = 0;
console.log(`initial zs: ${zs}`)

// registering the scrolltrigger plugin and setting up scroll behaviour
gsap.registerPlugin(ScrollTrigger);
var scrollTimeline = gsap.timeline({
    scrollTrigger: {
            trigger: '.book',
            // markers: true,
            start: 'top top+=350px',
            end: 'bottom top',
            pin: '.container',
            scrub: 2,
        },
});
var messageTimeline = gsap.timeline({ duration: 1 });
gsap.set('.container', { opacity: 0 })
messageTimeline
    .to('body', {
        backgroundColor: "rgb(55, 33, 45)",
        duration: 0.8
    })
    .to('.container', {
        opacity: 1,
        duration: 2
    })
    .from('.message-alphabet', {
        opacity: 0,
        scale: 5,
        stagger: 0.3,
        ease: 'elastic'
    })
    .fromTo('.thumb', {
        opacity: 0,
    }, {
        opacity: 1,
        top: '-20px',
        repeat: -1,
        yoyo: true
    });

// setting up the entire course of animations
scrollTimeline
    .fromTo('.book', {
        scale: 0.5,
        rotateZ: '40deg',
    }, {
        scale: 1,
        rotateZ: '-5deg',
        left: '-30px'
    })
    .to('.message', {
        opacity: 0,
        duration: 2
    }, "<")
    .to('.book', {
        top: '-100px',
        left: '50px'
    })
    .to('.page', {        
        transformOrigin: 'left',
        rotateY: '-180deg',
        duration: 5,
        stagger: {
            each: 5,
            onComplete: function() {
                // managing the stacking of pages while moving forwards
                if (i < pages.length-1) {
                    i += 1;
                    let target = this.targets()[0];
                    zs[i] = zs[i-1]+1;
                    pages[i].style.zIndex = zs[i];
                } else {
                    zs = new Array();
                    for (let j = 0; j < pages.length; j++) {
                        zs.push(100+j);
                        pages[j].style.zIndex = zs[j];
                    }
                }
                // console.log(zs)
            },
            onReverseComplete: function() {
                // managing the stacking of pages while moving backwards
                if (i > 0) {
                    i -= 1;
                    let target = this.targets()[0];
                    zs[i] = zs[i+1]+1;
                    pages[i].style.zIndex = zs[i];
                } else {
                    zs = new Array();
                    for (let j = 0; j < pages.length; j++) {
                        zs.push(100-j);
                        pages[j].style.zIndex = zs[j];
                    }
                }
            }
        },
        ease: 'linear'
    }, "<")
    .to('.book', {
        rotateZ: '-40deg',
        scale: '0.5',
        translateX: '-20px',
    }, ">-=1")
    .fromTo('.book', {
        opacity: 1
    }, {
        opacity: 0
    })
    .fromTo('.theend', {
        display: 'none',
        opacity: 0
    }, {
        display: 'block',
        opacity: 1,
        duration: 1.5
    });



// music control
var myAudio = document.getElementById("myAudio");
var isPlaying = false;

console.log(myAudio);

function togglePlay() {
    isPlaying ? myAudio.pause() : myAudio.play();
};

function restart() {
    isPlaying = true;
    myAudio.currentTime = 0;
    myAudio.play();
    gsap.from('#restartbtn svg', {
        rotateZ: '-360deg',
        duration: 1
    });
}

myAudio.onplaying = function() {
    document.getElementById("playpausebtn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
  </svg>`;
    isPlaying = true;
};
myAudio.onpause = function() {
    document.getElementById("playpausebtn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg>`;
    isPlaying = false;
};


// zoom control
var isZoomed = false;
function zoom() {
    if (!isZoomed) {
        gsap.timeline()
            .to('.book', {
                scale: 1.8,
                duration: 1,
                left: '-50px'
            });
        isZoomed = true;
    } else {
        gsap.timeline()
            .to('.book', {
                scale: 1,
                duration: 1,
                left: '50px'
            });
        isZoomed = false;
    }
}