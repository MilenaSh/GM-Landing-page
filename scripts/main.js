$('document').ready(function() {
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 120
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    $('.image-holder img').on('click', loadContent);
})

function loadContent(ev) {
    let $sideDescription = $('.side-description span');
    let $selected = $(ev.target).parent();
    let windowWidth = $(window).width();
    $('.image-holder').removeClass('selected');

    if (windowWidth < 768) {
        let selectedClass = $($selected).attr('data-details');
        $($selected).parent().parent().find('.' + selectedClass).toggle();
        $sideDescription.html('');
    } else {
        //  console.log($($selected).parent().find('.details').html());
        let details = $($selected).parent().find('.details').html();
        $sideDescription.html(details);
    }
    $selected.addClass('selected');
}