$('document').ready(function() {
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('.tabs')
        .click(function(event) {
            // 
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
   
                if (target.length) {
 
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 1000, function() {
       
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { 
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); 
                            $target.focus(); 
                        };
                    });
                }
            }
        });

    $('.image-holder').on('click', loadContent);
})

function loadContent(ev) {
    
    let $selected = $(this);
    let descriptionClass = $selected.attr('data-details');
    let $sideDescription = $('.side-description');
    let $description = $('.' + descriptionClass);
    let description = $description.html();

    let windowWidth = $(window).width();
    $('.image-holder').removeClass('selected');
    $selected.addClass('selected');

    if (windowWidth > 768) {
        $sideDescription.html(description);
     } else {
        $('.details').css('display', 'none');
        $description.slideToggle();
     }
}