$(document).ready(function() {
    // $('.heroSection').css('height', 'calc(100vh - ' + $('header').outerHeight(true) + 'px)');

    // $('body').toggleClass('lightMode darkMode');
    $('.changeMode').on('click', function() {

        var element = document.body;
        element.classList.toggle("darkMode");
        userSave();
    });



    console.log($(window).width() + ',' + $(window).height());
    if ($(window).width() < 1199) {
        $('.sidebar').addClass('collapse');
        $('.menuBar').on('click', function() {
            $('.sidebar').toggleClass('collapse');
        });
    } else {
        $('.sidebar').removeClass('collapse');
        $('.menuBar').on('click', function() {
            $('.sidebar').toggleClass('collapse');
        });
    }


    function userSave() {
        localStorage.setItem('storeDode', $('body').attr('class'));
    }

    if (localStorage.storeDode != undefined) {
        $('body').removeClass('darkMode');
        $('body').addClass(localStorage.getItem("storeDode"));
    }



    if ($('.fixBox').length > 0) {
        $('.fixBox').css('height', 'calc(100vh - ' + $('.top').outerHeight(true) + 'px)');
    } else {}



    // $('.pageHeader').outerHeight(true)
    //$('.pageFooter').outerHeight(true)
    var getMainHeight = $('.pageHeader').outerHeight(true) + $('.pageFooter').outerHeight(true);
    if ($('.fixBox').length > 0) {
        $('main').css('height', 'calc(100vh - ' + getMainHeight + 'px)');
    } else {}



    if ($('.rightSidebar').length > 0) {
        $('.notificationContent').css('height', 'calc(100vh - ' + $('.rightSidebar').outerHeight(true) + 'px)');
    }


    // $('.subMenuList>a').on('click', function() {
    //     // if ($('.sidebar>.subMenuList').hasClass('active')) {
    //     //     $('.sidebar>.subMenuList').removeClass('active');
    //     // }
    //     // $(this).next('.subMenu').slideToggle('fast');
    //     // $(this).parent().toggleClass('active');
    //     $(this).parent().toggleClass('active');
    // });

    $('.level1Link').on('click', function() {
        // $('.level1').slideToggle('fast');
        // $('.level2').hide('fast');

        $(this).parent().toggleClass('active');
        $(this).nextAll('.level1').slideToggle('fast');

    });
    $('.level2Link').on('click', function() {
        $(this).parent().toggleClass('active');
        $(this).nextAll('.level2').slideToggle('fast');
    });


    $('.notification.active, .closeRightSidebar').on('click', function() {
        alert('vdd');
        $('.rightSidebar').toggle();
    });
});