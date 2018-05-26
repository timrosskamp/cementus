(function(){
    document.querySelector('.js-menuOpen').addEventListener('click', evt => {
        evt.preventDefault();
        document.body.classList.add('navOpen');
    });

    document.querySelector('.js-menuClose').addEventListener('click', evt => {
        evt.preventDefault();
        document.body.classList.remove('navOpen');
    });
})();