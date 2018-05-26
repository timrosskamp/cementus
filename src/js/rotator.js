(function(){
    const rotator = document.querySelector('.js-rotator');

    if(rotator){
        anime.timeline({
            targets: rotator,
            duration: 500,
            delay: 1000,
            loop: true,
            easing: 'easeInOutQuad'
        }).add({
            rotateX: '90deg'
        }).add({
            rotateX: '180deg'
        }).add({
            rotateX: '270deg'
        });
    }
})();