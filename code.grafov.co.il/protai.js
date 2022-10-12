var Webflow = Webflow || [];
Webflow.push(function () {
    var lottie = window.Webflow.require("lottie").lottie;

    const backgroundContainers = $('.background-video:not(.deprecated), .background');
    // const videos = backgroundContainers.find('video');
    const sections = $('.section .container');
    let currentSectionIndex = -1;

    // if ((videos.length > sections.length) || (videos.length < 1)) {
    //     console.error('Wrong number of videos, exiting');
    //     return;
    // }

    // backgroundContainers.find('video').each(function () {
    //     var video = $(this).get(0);
    //     video.pause();
    //     video.autoplay = false;
    //     video.loop = false;
    //     video.currentTime = 0;
    // });

    function playLottieAnimation() {
        // console.log('playLottieAnimation:', i, animationObj, $(this));
        const animationObj = $(this);
        var animationDataSrc = animationObj.attr('data-src');
        var lottieAnimation = lottie.getRegisteredAnimations().filter(function(l) {
            return animationDataSrc.includes(l.fileName);
        });
        lottieAnimation[0] && lottieAnimation[0].goToAndPlay(0, true);
    }

    function switchBackground(newIndex) {
        // if (currentSectionIndex !== -1) {
        //     backgroundContainers.eq(currentSectionIndex).fadeOut();
        // }
        currentSectionIndex = newIndex;
        const currentBackgroundContainer = backgroundContainers.eq(currentSectionIndex);

        backgroundContainers.removeClass('top-background')
        currentBackgroundContainer.addClass('top-background');
        // currentBackgroundContainer.fadeIn();

        // play all lottie animations in background
        // console.log(currentBackgroundContainer.find('[data-animation-type="lottie"]').length);
        currentBackgroundContainer.find('[data-animation-type="lottie"]').each(playLottieAnimation);

        // if (currentBackgroundContainer.hasClass('background-video')) {
        //     const videoChild = currentBackgroundContainer.find('video').get(0);
        //     videoChild.currentTime = 0;
        //     videoChild.play();
        // } else if (currentBackgroundContainer.hasClass('background-lottie')) {
        //     playLottieAnimation(currentBackgroundContainer);
        // }
    }

    function isSectionInView(section) {
        const scrollTop = $(window).scrollTop();
        const scrollBottom = scrollTop + $(window).height();
        const sectionTop = section.offset().top;
        const sectionBottom = sectionTop + section.outerHeight();
        // console.log(sectionTop, sectionBottom, scrollTop, scrollBottom);
        
        return (sectionBottom >= scrollTop && sectionTop <= scrollBottom);
    }
    
    function chooseBackground() {
        if (isSectionInView(sections.eq(currentSectionIndex))) {
            return;
        }
        console.log('here');
        
        let newSectionIndex = -1;
        for (let i=0; i<backgroundContainers.length; i++) {
            if (isSectionInView(sections.eq(i))) {
                newSectionIndex = i;
                break;
            }
        }
        if (newSectionIndex === -1) { // scrolling below the relevant sections - keep the last one
            return;
        }
        if (newSectionIndex !== currentSectionIndex) {
            console.log('new section:', newSectionIndex);
            switchBackground(newSectionIndex);
        }
    }
    
    chooseBackground();

    $(window).scroll(function() {
        chooseBackground();
    });
});
