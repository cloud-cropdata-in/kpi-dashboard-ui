import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { log } from 'console';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DashboardService } from '../services/dashboard.service';
declare var $;

@Component({
  selector: 'app-farmer-case',
  templateUrl: './farmer-case.component.html',
  styleUrls: ['./farmer-case.component.scss'],
})
export class FarmersCaseComponent implements OnInit {
  analyticsDetails: any;
  isLeadsDetailShown: boolean = false;
  isCropAreaDetailShown: boolean = false;
  isExpectedProductionDetailShown: boolean = false;
  isExpectedValueDetailShown: boolean = false;
  isVerifiedLeadsDetailShown: boolean = false;

  /*---------------*/
  @ViewChild('nav', { read: DragScrollComponent, static: true })
  ds: DragScrollComponent;
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;
  /*---------------*/
  customOptions: OwlOptions = {
    loop: false,
    lazyLoad: true,
    slideTransition: 'ease',
    autoplay: false,
    autoplaySpeed: 700,
    autoplayTimeout: 0,
    autoplayMouseleaveTimeout: 700,
    autoplayHoverPause: true,
    mouseDrag: true,
    freeDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    margin: 30,
    stagePadding: 0,
    navSpeed: 700,
    animateOut: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      540: {
        items: 1,
        nav: false,
      },
      768: {
        items: 2,
        nav: false,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      // 1400: {
      //   items: 4
      // },
      1600: {
        items: 5,
      },
    },
    nav: true,
  };

  constructor(private dashboardService: DashboardService) {
    this.getAnalyticsDetails();
  }

  getAnalyticsDetails() {
    this.dashboardService.getAnalyticsDetails().subscribe((data) => {
      // if ($.isEmptyObject(data.target_meter_gauge)) {
      //   data.target_meter_gauge = {
      //     collecteLeads: {
      //       achieved: 227728,
      //       target: 277728,
      //     },
      //     verifiedLeads: {
      //       achieved: 135077,
      //       target: 277728,
      //     },
      //     expectedValue: {
      //       achieved: 4129817,
      //       target: 4579817,
      //     },
      //     cropingArea: {
      //       achieved: 192391,
      //       target: 412391,
      //     },
      //     expectedProduction: {
      //       achieved: 1924719,
      //       target: 2574719,
      //     },
      //   };
      // }

      this.analyticsDetails = data.target_meter_gauge.leads;

      this.afterLoad();
    });
  }

  toggleShowLeadsDetail() {
    this.isLeadsDetailShown = !this.isLeadsDetailShown;
    this.isCropAreaDetailShown = false;
    this.isExpectedProductionDetailShown = false;
    this.isExpectedValueDetailShown = false;
    this.isVerifiedLeadsDetailShown = false;
    $('#isLeadsDetailShown').slideToggle('fast');
    $('#isCropAreaDetailShown').hide();
    $('#isExpectedProductionDetailShown').hide();
    $('#isExpectedValueDetailShown').hide();
    $('#isVerifiedLeadsDetailShown').hide();
  }

  toggleShowCropAreaDetail() {
    this.isLeadsDetailShown = false;
    this.isCropAreaDetailShown = !this.isCropAreaDetailShown;
    this.isExpectedProductionDetailShown = false;
    this.isExpectedValueDetailShown = false;
    this.isVerifiedLeadsDetailShown = false;
    $('#isLeadsDetailShown').hide();
    $('#isCropAreaDetailShown').slideToggle('fast');
    $('#isExpectedProductionDetailShown').hide();
    $('#isExpectedValueDetailShown').hide();
    $('#isVerifiedLeadsDetailShown').hide();
  }

  toggleShowExpectedProductionDetail() {
    this.isLeadsDetailShown = false;
    this.isCropAreaDetailShown = false;
    this.isExpectedProductionDetailShown =
      !this.isExpectedProductionDetailShown;
    this.isExpectedValueDetailShown = false;
    this.isVerifiedLeadsDetailShown = false;
    $('#isLeadsDetailShown').hide();
    $('#isCropAreaDetailShown').hide();
    $('#isExpectedProductionDetailShown').slideToggle('fast');
    $('#isExpectedValueDetailShown').hide();
    $('#isVerifiedLeadsDetailShown').hide();
  }

  toggleShowExpectedValueDetail() {
    this.isLeadsDetailShown = false;
    this.isCropAreaDetailShown = false;
    this.isExpectedProductionDetailShown = false;
    this.isExpectedValueDetailShown = !this.isExpectedValueDetailShown;
    this.isVerifiedLeadsDetailShown = false;
    $('#isLeadsDetailShown').hide();
    $('#isCropAreaDetailShown').hide();
    $('#isExpectedProductionDetailShown').hide();
    $('#isExpectedValueDetailShown').slideToggle('fast');
    $('#isVerifiedLeadsDetailShown').hide();
  }

  toggleShowVerifiedLeadsDetail() {
    this.isLeadsDetailShown = false;
    this.isCropAreaDetailShown = false;
    this.isExpectedProductionDetailShown = false;
    this.isExpectedValueDetailShown = false;
    this.isVerifiedLeadsDetailShown = !this.isVerifiedLeadsDetailShown;
    $('#isLeadsDetailShown').hide();
    $('#isCropAreaDetailShown').hide();
    $('#isExpectedProductionDetailShown').hide();
    $('#isExpectedValueDetailShown').hide();
    $('#isVerifiedLeadsDetailShown').slideToggle('fast');
  }

  clickItem(item) {
    console.log('item clicked');
  }
  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  moveTo(idx: number) {
    this.ds.moveTo(idx);
  }
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }
  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }
  onSnapAnimationFinished() {
    console.log('snap animation finished');
  }
  onIndexChanged(idx) {
    this.index = idx;
    console.log('current index: ' + idx);
  }
  onDragScrollInitialized() {
    console.log('first demo drag scroll has been initialized.');
  }
  onDragStart() {
    console.log('drag start');
  }
  onDragEnd() {
    console.log('drag end');
  }
  ngOnInit(): void {}

  afterLoad() {
    $(document).ready(function () {
      //============== image view in popup ==============//
      $('.ImagePreview').on('click', function () {
        $('.bd-example-modal-lg').modal('show');
        $('.bd-example-modal-lg .modal-content img').attr(
          'src',
          $(event.target).attr('src')
        );
      });

      $('.thumbnailViewPopup').on('click', function () {
        var bg = $(this).css('background-image');
        bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, '');
        $('.bd-example-modal-lg').modal('show');
        $('.bd-example-modal-lg .modal-content img').attr('src', bg);
      });
      //============== image view in popup end ==============//

      if ($('.straightBox .target').is(':empty')) {
        console.log('div is empty');
      } else {
        $('.straightBox').each(function () {
          var target = Number($(this).find('.target').attr('title'));
          var currentArchiveTarget = Number(
            $(this).find('.numbers').attr('title')
          );
          var targetArchivedPercentage = Number(
            (currentArchiveTarget / target) * 100
          );
          var targetArchivedDifferencePercentage = Math.abs(
            Number(targetArchivedPercentage - 100)
          );
          if (target > currentArchiveTarget) {
            $(this).find('.labels .text').addClass('low');
            $(this).find('.labels .text .targettxt').html('Below Target');
            $(this)
              .find('.targetPercent')
              .html(targetArchivedDifferencePercentage.toFixed(1) + '%');
          } else if (target == currentArchiveTarget) {
            $(this).find('.labels .text').addClass('high');
            $(this).find('.labels .text .targettxt').html('On Target');
            targetArchivedDifferencePercentage = Math.abs(
              targetArchivedDifferencePercentage
            );
            $(this)
              .find('.targetPercent')
              .html(targetArchivedDifferencePercentage.toFixed(0) + '%');
          } else {
            $(this).find('.labels .text').addClass('high');
            $(this).find('.labels .text .targettxt').html('Above Target');
            targetArchivedDifferencePercentage =
              targetArchivedDifferencePercentage;
            $(this)
              .find('.targetPercent')
              .html('+' + targetArchivedDifferencePercentage.toFixed(1) + '%');
          }
          $(this)
            .find('.meterPercentage')
            .html(targetArchivedPercentage.toFixed(1) + '%');

          //change number to international format
          var convertValue = $(this).find('.numbers').attr('title');
          var convertValue2 = $(this).find('.target').attr('title');
          $(this).find('.numbers').html(abbreviateNumber(convertValue));
          $(this)
            .find('.target')
            .html('Target - ' + abbreviateNumber(convertValue2));
        });
      }

      //for 150% meter roataion
      if ($('.straightBox.150_percent .meterPercentage').is(':empty')) {
        console.log('div is empty');
      } else {
        $('.straightBox.150_percent .meterPercentage').each(function () {
          $('.straightBox.150_percent .meterGauge')
            .find('.meterimg')
            .attr('src', 'assets/images/icons/new-miter-2.svg');

          $(this)
            .prop('Counter', 0)
            .animate(
              {
                Counter: $(this).text(),
              },
              {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                  if (now > 100) {
                    $(this).text(parseFloat(now).toFixed(0) + '%');
                  } else {
                    $(this).text(parseFloat(now).toFixed(1) + '%');
                  }
                  var getRotateValue = $(this).text().replace('%', '');
                  if (getRotateValue >= 150) {
                    getRotateValue = 150;
                    $(this)
                      .parent()
                      .find('.indicator')
                      .css(
                        'transform',
                        'rotate(' + getRotateValue * 1.2 + 'deg)'
                      );
                  } else {
                    $(this)
                      .parent()
                      .find('.indicator')
                      .css(
                        'transform',
                        'rotate(' + getRotateValue * 1.2 + 'deg)'
                      );
                  }
                },
              }
            );
        });
      }
      //end

      //for 100% meter rotation
      if ($('.straightBox.100_percent .meterPercentage').is(':empty')) {
        console.log('div is empty');
      } else {
        $('.straightBox.100_percent .meterPercentage').each(function () {
          $('.straightBox.100_percent .meterGauge')
            .find('.meterimg')
            .attr('src', 'assets/images/icons/new-miter-3.svg');
          $(this)
            .prop('Counter', 0)
            .animate(
              {
                Counter: $(this).text(),
              },
              {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                  if (now > 100) {
                    $(this).text(parseFloat(now).toFixed(0) + '%');
                  } else {
                    $(this).text(parseFloat(now).toFixed(1) + '%');
                  }
                  var getRotateValue = $(this).text().replace('%', '');
                  if (getRotateValue >= 150) {
                    getRotateValue = 150;
                    $(this)
                      .parent()
                      .find('.indicator')
                      .css(
                        'transform',
                        'rotate(' + getRotateValue * 1.8 + 'deg)'
                      );
                  } else {
                    $(this)
                      .parent()
                      .find('.indicator')
                      .css(
                        'transform',
                        'rotate(' + getRotateValue * 1.8 + 'deg)'
                      );
                  }
                },
              }
            );
        });
      }
      //end

      $('.scaleMeterPointer').each(function () {
        var getScaleMeterPointer = $(this).attr('data-value');
        $(this).find('.arrow-down').css('left', getScaleMeterPointer);
        getScaleMeterPointer = getScaleMeterPointer.replace('%', '');
        if (getScaleMeterPointer > 0 && getScaleMeterPointer < 6) {
          $(this).find('.arrow-down').css('border-top-color', '#ff0000');
        } else if (getScaleMeterPointer > 5 && getScaleMeterPointer < 11) {
          $(this).find('.arrow-down').css('border-top-color', '#ff1f00');
        } else if (getScaleMeterPointer > 10 && getScaleMeterPointer < 16) {
          $(this).find('.arrow-down').css('border-top-color', '#ff3a00');
        } else if (getScaleMeterPointer > 15 && getScaleMeterPointer < 21) {
          $(this).find('.arrow-down').css('border-top-color', '#ff5400');
        } else if (getScaleMeterPointer > 20 && getScaleMeterPointer < 26) {
          $(this).find('.arrow-down').css('border-top-color', '#ff6e00');
        } else if (getScaleMeterPointer > 25 && getScaleMeterPointer < 31) {
          $(this).find('.arrow-down').css('border-top-color', '#ff8900');
        } else if (getScaleMeterPointer > 30 && getScaleMeterPointer < 36) {
          $(this).find('.arrow-down').css('border-top-color', '#ffa401');
        } else if (getScaleMeterPointer > 35 && getScaleMeterPointer < 41) {
          $(this).find('.arrow-down').css('border-top-color', '#ffbd00');
        } else if (getScaleMeterPointer > 40 && getScaleMeterPointer < 46) {
          $(this).find('.arrow-down').css('border-top-color', '#ffd700');
        } else if (getScaleMeterPointer > 45 && getScaleMeterPointer < 51) {
          $(this).find('.arrow-down').css('border-top-color', '#fff200');
        } else if (getScaleMeterPointer > 50 && getScaleMeterPointer < 56) {
          $(this).find('.arrow-down').css('border-top-color', '#f3f901');
        } else if (getScaleMeterPointer > 55 && getScaleMeterPointer < 61) {
          $(this).find('.arrow-down').css('border-top-color', '#f2f800');
        } else if (getScaleMeterPointer > 60 && getScaleMeterPointer < 66) {
          $(this).find('.arrow-down').css('border-top-color', '#d8ec00');
        } else if (getScaleMeterPointer > 65 && getScaleMeterPointer < 71) {
          $(this).find('.arrow-down').css('border-top-color', '#bdde00');
        } else if (getScaleMeterPointer > 70 && getScaleMeterPointer < 76) {
          $(this).find('.arrow-down').css('border-top-color', '#88c400');
        } else if (getScaleMeterPointer > 75 && getScaleMeterPointer < 81) {
          $(this).find('.arrow-down').css('border-top-color', '#6fb700');
        } else if (getScaleMeterPointer > 80 && getScaleMeterPointer < 86) {
          $(this).find('.arrow-down').css('border-top-color', '#55ab00');
        } else if (getScaleMeterPointer > 85 && getScaleMeterPointer < 91) {
          $(this).find('.arrow-down').css('border-top-color', '#3b9d00');
        } else if (getScaleMeterPointer > 90 && getScaleMeterPointer < 96) {
          $(this).find('.arrow-down').css('border-top-color', '#1f8f00');
        } else if (
          getScaleMeterPointer > 95 &&
          getScaleMeterPointer < 100 &&
          getScaleMeterPointer === 100
        ) {
          $(this).find('.arrow-down').css('border-top-color', '#008000');
        } else {
          $(this).find('.arrow-down').css('border-top-color', '#008000');
        }
      });
    });

    var SI_SYMBOL = ['', 'K', 'Mn', 'Bn', 'T', 'Q'];
    function abbreviateNumber(number) {
      // what tier? (determines SI symbol)
      var tier = (Math.log10(Math.abs(number)) / 3) | 0;

      // if zero, we don't need a suffix
      if (tier == 0) return number;

      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier];
      var scale = Math.pow(10, tier * 3);

      // scale the number
      var scaled = number / scale;

      // format number and add suffix

      var lastCheck = Number(scaled.toFixed(2)) + suffix;

      return lastCheck;
    }
  }
}
