(function(){
    const links = [].slice.call(document.getElementsByTagName('a')).map(a => {
        const hash = a.hash.replace(/^#/, '');
        const el = document.getElementById(hash);

        if(el){
            return {
                a: a,
                el: el
            }
        }

        return false;
    }).filter(a => a !== false);

    links.forEach(item => {
        item.a.addEventListener('click', evt => {
            evt.preventDefault();

            console.log(item.el.getBoundingClientRect().top);

            const start = window.scrollY;
            const end = Math.min(
                item.el.getBoundingClientRect().top + window.scrollY,
                document.documentElement.scrollHeight - document.documentElement.clientHeight
            );

            const scroller = {
                top: start
            }

            anime({
                targets: scroller,
                top: end,
                duration: 750,
                easing: 'easeInOutSine',
                update: function(){
                    window.scrollTo(0, scroller.top);
                }
            })
        });
    });

    window.addEventListener('scroll', evt => {
        for(let item of links){
            const scroll = window.scrollY + (window.innerHeight / 2);

            if( scroll >= item.el.offsetTop && scroll <= item.el.offsetTop + item.el.offsetHeight ){
                if( !item.a.classList.contains("active") ){
                    links.forEach(i => i.a.classList.remove('active'));
                    item.a.classList.add("active");
                }
                break;
            }
        }
    });
})();
