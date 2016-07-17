$(function() {
    initNavbar();
    initFooter();
});

function initFooter() {
    $('.footer__list-paragraph-header').click(function() {
        $(this).toggleClass('footer__list-paragraph-header--active');
        $(this).parents('.footer__list').find('.footer__list-paragraph-link').each(function() {
            $(this).toggleClass('footer__list-paragraph-link--visible');
        })
    })
}

function initNavbar() {
    $('.navbar__item-collapsable').click(onClickOnMenu);
    assignSecondLevelOpen();
    $('.navbar__search-submit').click(function(e) {
       if(isSmallNavbar()) {
           e.preventDefault();
           $('.navbar__search-container').toggleClass('navbar__search-container--active');
       }
    });

    $(window).resize(function () {
        removeSecondLevelListeners();
        assignSecondLevelOpen();
    });

    function assignSecondLevelOpen() {
        if ($('.navbar__mobile-menu').is(':visible')) {
            $('.navbar__submenu .navbar__submenu-item').click(showSecondLevelForSmallMenu);
            $('.navbar__mobile-menu').click(function() {
                $('body').toggleClass('body--menu-opened');
                $('.navbar__main-menu').toggleClass('navbar__main-menu--active');
            });
        } else {
            $('.navbar__submenu .navbar__submenu-item').mouseover(showSecondLevelForBigMenu);
        }
    }

    function removeSecondLevelListeners() {
        $('.navbar__submenu .navbar__submenu-item').off('click');
        $('.navbar__submenu .navbar__submenu-item').off('mouseover');
        $('.navbar__mobile-menu').off('click');
    }

    function onClickOnMenu(event) {
        event.stopPropagation();
        if (isClickOnActiveElement(event.target)) {
            removeActiveClassFromMenu();
        } else if ($(event.target).parents('.navbar__submenu--active').length) {
            return;
        } else {
            removeActiveClassFromMenu();
            $(this).addClass('navbar__item-collapsable--active');
            $(this).find('.navbar__submenu')[0].classList.add('navbar__submenu--active');
            addClickListenerToDocument();
        }

        function addClickListenerToDocument(mainElement) {
            document.addEventListener('click', assignEvent);

            function assignEvent(event) {
                var clickedElement = event.target;
                var clickInCurrentActiveItem = false;
                $(clickedElement).parents().each(function (parent) {
                    if (parent === mainElement) {
                        clickInCurrentActiveItem = true;
                    }
                });
                if (!clickInCurrentActiveItem) {
                    removeActiveClassFromMenu();
                    document.removeEventListener('click', assignEvent);
                }
            }
        }

        function removeActiveClassFromMenu() {
            $('.navbar__item-collapsable--active').removeClass('navbar__item-collapsable--active');
            $('.navbar__submenu--active').removeClass('navbar__submenu--active');
            $('.navbar__submenu-item--active').removeClass('navbar__submenu-item--active');
            $('.navbar__submenu-layer-2--active').removeClass('navbar__submenu-layer-2--active');
            $('.navbar__submenu--active').css('height', 'auto');
        }

        function isClickOnActiveElement(elem) {
            return $(elem).hasClass('navbar__item-collapsable--active')
                || $(elem).parent().hasClass('navbar__item-collapsable--active');
        }
    }

    function showSecondLevelForBigMenu() {
        $('.navbar__submenu-layer-2--active').removeClass('navbar__submenu-layer-2--active');
        $('.navbar__submenu-item--active').removeClass('navbar__submenu-item--active');
        if ($(this).children('.navbar__submenu-layer-2').length) {
            $(this).parent().css('height', $(this).find('.navbar__submenu-layer-2').outerHeight() + 'px');
            $(this).children('.navbar__submenu-layer-2').addClass('navbar__submenu-layer-2--active');
            $(this).addClass('navbar__submenu-item--active');
        }
    }

    function showSecondLevelForSmallMenu() {
        var needToOpenElement = true;

        if ($(this).hasClass('navbar__submenu-item--active')) {
            needToOpenElement = false;
        }

        $('.navbar__submenu-layer-2--active').removeClass('navbar__submenu-layer-2--active');
        $('.navbar__submenu-item--active').removeClass('navbar__submenu-item--active');

        if (needToOpenElement) {
            if ($(this).children('.navbar__submenu-layer-2').length) {
                $(this).children('.navbar__submenu-layer-2').addClass('navbar__submenu-layer-2--active');
                $(this).addClass('navbar__submenu-item--active');
            }
        }
    }

    function isSmallNavbar() {
        return $('.navbar__mobile-menu').is(':visible');
    }

}