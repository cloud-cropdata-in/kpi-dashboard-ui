import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from 'xng-breadcrumb';
declare var $;

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  title: any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private titleService: Title) {   
    
    if ($('.fixBox').length > 0) {
      var getMainHeight = $('.pageHeader').outerHeight(true) + $('.pageFooter').outerHeight(true);
      console.log(getMainHeight);
      $('.fixBox').css('height', 'calc(100vh - ' + $('.top').outerHeight(true) + 'px)');
      $('main').css('height', 'calc(100vh - ' + getMainHeight + 'px)');
    } else { }
    if ($('.rightSidebar').length > 0) {
      $('.notificationContent').css('height', 'calc(100vh - ' + $('.rightSidebar').outerHeight(true) + 'px)');
    }



  }

  ngOnInit(): void {
    //jquery Script start
    $(document).ready(function () {

    $('.menuBar .fas').removeClass('fa-bars').addClass('fa-times')
      $('.menuBar').on('click', function () {
        $('.sidebar').toggleClass('collapse');
        if ($('.sidebar').hasClass("collapse")){
          $('.menuBar .fas').removeClass('fa-times').addClass('fa-bars')
        } else{
          $('.menuBar .fas').removeClass('fa-bars').addClass('fa-times')
        }
        if($(window).width() >= 1199){
          if ($('.sidebar').hasClass("collapse")){
            $('.menuBar .fas').removeClass('fa-times').addClass('fa-bars')
            $('.middleContainer').css('max-width', '100%');
            $('.NormalCard').css('min-width', '343px').css('width', '343px');
          } else{
            $('.menuBar .fas').removeClass('fa-bars').addClass('fa-times')
            $('.middleContainer').css('max-width', 'calc(100% - 50px');
            $('.NormalCard').css('min-width', '339px').css('width', '339px');
          }
        }     
      });

      

      if($(window).width() <= 1199){
        $('.sidebar').addClass('collapse');
        $('.menuBar .fas').removeClass('fa-times').addClass('fa-bars')
      }



  
      // $('main').on('click', function () {
      //   if ($(".sidebar").hasClass("collapse")) {
      //     // $(".rightSidebar").removeClass("active");          
      //   } else {
      //     $(".sidebar").addClass("collapse");
      //   }
      // });

    if (localStorage.storeDode != undefined) {
      $('body').removeClass('darkMode');
      $('body').addClass(localStorage.getItem("storeMode"));
    }

    

      // function rotate(degree) {
      //   $elie.animate({
      //     '-webkit-transform': 'rotate(' + degree + 'deg)',
      //     '-moz-transform': 'rotate(' + degree + 'deg)',
      //     '-ms-transform': 'rotate(' + degree + 'deg)',
      //     '-o-transform': 'rotate(' + degree + 'deg)',
      //     'transform': 'rotate(' + degree + 'deg)',
      //     'zoom': 1
      //   }, 5000);
      // }

    // if ($('.rightSidebar').length > 0) {
    //   $('.notificationContent').css('height', 'calc(100vh - ' + $('.rightSidebar').outerHeight(true) + 'px)');
    // }

      
    $('.level1Link').on('click', function () {
      $(this).parent().toggleClass('active');
      $(this).nextAll('.level1').slideToggle('fast');
      if ($('.subMenuList').hasClass('active')) {
        $('.fixBox').addClass('create');
        $("main, .pageHeader, .pageFooter").addClass("blur");
      } else {
        $('.fixBox').removeClass('create');
        $("main, .pageHeader, .pageFooter").removeClass("blur");
      }
    });
    
    $('.middleContainer').on('click', function () {
      if ($(".subMenuList").hasClass("active")){
        $(".subMenuList").removeClass("active");
        $('.fixBox').removeClass('create');
        $("main, .leftSidebar, .pageHeader, .pageFooter").removeClass("blur");
      }
    });


    $('.level2Link').on('click', function () {
      $(this).parent().toggleClass('active');
      $(this).nextAll('.level2').slideToggle('fast');
      
      if ($('.subMenuList').hasClass('active')) {
        $('.fixBox').addClass('create');
      } else {
        $('.fixBox').removeClass('create');
      }
    });

    $('.notification.active, .closeRightSidebar').on('click', function () {
      // $('.notification').toggle();
      $(".rightSidebar").toggleClass("active");
      $("main, .leftSidebar, .pageHeader, .pageFooter").toggleClass("blur");
    });



      $(".farmDetailContainer.top").css("top", '-'+$('.farmDetailContainer').outerHeight(true)+'px');
      $(".farmDetailContainer.bottom").css("bottom", '-' + $('.farmDetailContainer').outerHeight(true) + 'px');
      $('.farmNdviView').on('click', function () {
        $(".farmDetailContainer").toggleClass('show');
      });      

      
      $('main, .leftSidebar').on('click', function () {
        if ($(".rightSidebar").hasClass("active")){
          $(".rightSidebar").removeClass("active");
          $("main, .leftSidebar, .pageHeader, .pageFooter").removeClass("blur");
        }
      });


      // var getMainHeight = $('.pageHeader').outerHeight(true) + $('.pageFooter').outerHeight(true);
      // if ($('.fixBox').length > 0) {
      //   $('.fixBox').css('height', 'calc(100vh - ' + $('.top').outerHeight(true) + 'px)');
      //   $('main').css('height', 'calc(100vh - ' + getMainHeight + 'px)');
      // } else { }      
      

      //============== image view in popup ==============//
      $(".ImagePreview").on('click', function () {
        $('.bd-example-modal-lg').modal('show');
        $('.bd-example-modal-lg .modal-content img').attr("src", $(event.target).attr("src"));
      });

      $(".thumbnailViewPopup").on('click', function () {
        var bg = $(this).css('background-image');
        bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
        $('.bd-example-modal-lg').modal('show');
        $('.bd-example-modal-lg .modal-content img').attr("src", bg);
      });
            //============== image view in popup end ==============//
      
            //============== Scroll Container ==============//
      // $('.overflowScrollerContainer').hScroll(30);
      //============== Scroll Container End ==============//





      //side menubar in tv software
      var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
        }
        return false;
      };      
      if (getUrlParameter('tv') === 'true'){
        $(".menuBar").trigger('click');
                
        $(".open").trigger('click');
       
      }
      //side menubar in tv software

      setTimeout(function () { $("#pageLoader").slideUp() }, 1000);
    });

      // $.fn.hScroll = function (amount) {
      //   amount = amount || 120;
      //   $(this).bind("DOMMouseScroll mousewheel", function (event) {
      //     var oEvent = event.originalEvent,
      //       direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
      //       position = $(this).scrollLeft();
      //     position += direction > 0 ? -amount : amount;
      //     $(this).scrollLeft(position);
      //     event.preventDefault();
      //   })
      // };
    //jquery Script end

    
  }
}