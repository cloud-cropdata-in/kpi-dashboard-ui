import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
declare var $;
@Component({
  selector: 'app-expected-production',
  templateUrl: './expected-production.component.html',
  styleUrls: ['./expected-production.component.scss'],
})
export class ExpectedProductionComponent implements OnInit {
  regionalDetails: any;
  commodityDetails: any;
  landholdingsDetails: any;

  regionalTarget: number = 0;
  regionalAchieved: number = 0;
  commodityTarget: number = 0;
  commodityAchieved: number = 0;
  landholdingsTarget: number = 0;
  landholdingsAchieved: number = 0;

  constructor(private getExpectedProductionDetail: DashboardService) {
    this.getAnalyticsDetails();
  }
  getAnalyticsDetails() {
    this.getExpectedProductionDetail
      .getExpectedProductionDetails()
      .subscribe((data) => {
        if (data != '' || data != undefined) {
          this.regionalDetails = data.regional;
          this.commodityDetails = data.commodity;
          this.landholdingsDetails = data.landholdings;
          this.afterLoad();

          //Total Values
          for (let i = 0; i < data.regional.data.length; i++) {
            if (data.regional.data[i].achieved != undefined) {
              this.regionalAchieved += data.regional.data[i].achieved;
            }
            if (data.regional.data[i].target != undefined) {
              this.regionalTarget += data.regional.data[i].target;
            }
          }

          for (let i = 0; i < data.commodity.data.length; i++) {
            if (data.commodity.data[i].achieved != undefined) {
              this.commodityAchieved += data.commodity.data[i].achieved;
            }
            if (data.commodity.data[i].target != undefined) {
              this.commodityTarget += data.commodity.data[i].target;
            }
          }

          for (let i = 0; i < data.landholdings.data.length; i++) {
            if (data.landholdings.data[i].achieved != undefined) {
              this.landholdingsAchieved += data.landholdings.data[i].achieved;
            }
            if (data.landholdings.data[i].target != undefined) {
              this.landholdingsTarget += data.landholdings.data[i].target;
            }
          }

          console.log(
            this.regionalAchieved +
              '/' +
              this.regionalTarget +
              '*' +
              100 +
              ' = ' +
              (this.regionalAchieved / this.regionalTarget) * 100
          );
          console.log(
            this.commodityAchieved +
              '/' +
              this.commodityTarget +
              '*' +
              100 +
              ' = ' +
              (this.commodityAchieved / this.commodityTarget) * 100
          );
          console.log(
            this.landholdingsAchieved +
              '/' +
              this.landholdingsTarget +
              '*' +
              100 +
              ' = ' +
              (this.landholdingsAchieved / this.landholdingsTarget) * 100
          );
        }
      });
  }

  ngOnInit(): void {}

  afterLoad() {
    $(document).ready(function () {
      if ($('.grade').find('.dataValue').text()) {
        $('.grade').each(function () {
          var dataValue = Number($(this).find('.dataValue').text());
          var dataTarget = Number($(this).find('.dataTarget').text());
          var dataPercentage = Number(
            ((dataValue / dataTarget) * 100).toFixed(1)
          );
          $(this)
            .find('.dataPercentage')
            .html(dataPercentage + '%');
          $(this).css('background-color', dataValueColorRange(dataPercentage));
          $(this).find('.dataValue').html(abbreviateNumber(dataValue));
          $(this).find('.dataTarget').html(abbreviateNumber(dataTarget));
        });
      }
      if ($('.regionDetails .data-current-value').is(':empty')) {
        console.log('div is empty');
      } else {
        $('.regionDetails').each(function () {
          var dataCurrentValue = Number(
            $(this).find('.data-current-value').text()
          );
          var dataTarget = Number($(this).find('.data-target').text());
          var valueInPercentage = Number((dataCurrentValue / dataTarget) * 100);

          $(this)
            .find('.data-current-value')
            .css('background-color', dataValueColorRange(valueInPercentage));
          $(this)
            .find('.currentValuePercentage')
            .css('border-color', dataValueColorRange(valueInPercentage));
          $(this)
            .find('.data-current-value')
            .html(abbreviateNumber(dataCurrentValue));
          $(this).find('.data-target').html(abbreviateNumber(dataTarget));
          if (valueInPercentage > 92.5) {
            // var newValue = 92.5;
            var newValue = 'calc(100% - 30px)';
            $(this).find('.currentValuePercentage').css('left', newValue);
          } else {
            $(this)
              .find('.currentValuePercentage')
              .css('left', valueInPercentage + '%');
          }
          if (valueInPercentage > 100) {
            $(this)
              .find('.currentValuePercentage')
              .html(100 + '%');
          } else {
            $(this)
              .find('.currentValuePercentage')
              .html(valueInPercentage + '%');
          }
        });

        $('.currentValuePercentage').each(function () {
          // $(this).css('left', $(this).find('span').text());
          $(this)
            .prop('Counter', 0)
            .animate(
              {
                Counter: $(this).text(),
              },
              {
                duration: 1000,
                easing: 'linear',
                step: function (now) {
                  $(this).text(parseFloat(now).toFixed(0) + '%');
                },
              }
            );
        });

        $('.standardScale').each(function () {
          var dataCurrentValue = Number(
            $(this).find('.dataCurrentValue').text()
          );
          var dataTarget = Number($(this).find('.dataTarget').text());
          var valueInPercentage = (
            (dataCurrentValue / dataTarget) *
            100
          ).toFixed(1);
          if (Number(valueInPercentage) > 100) {
            $(this)
              .find('.standardScalePercentage')
              .css('background-color', dataValueColorRange(100))
              .css('width', 100 + '%')
              .html(100 + '%')
              .addClass('text-center');
          } else {
            $(this)
              .find('.standardScalePercentage')
              .css('background-color', dataValueColorRange(valueInPercentage))
              .css('width', valueInPercentage + '%')
              .html(valueInPercentage + '%')
              .addClass('text-center');
          }
        });

        // setTimeout(function () {
        //   $('.regionDetails').each(function () {
        //     var dataCurrentValue = Number($(this).find('.data-current-value').text());
        //     var dataTarget = Number($(this).find('.data-target').text());
        //     $(this).find('.data-current-value').html(abbreviateNumber(dataCurrentValue));
        //     $(this).find('.data-target').html(abbreviateNumber(dataTarget));
        //     var valueInPercentage = (dataCurrentValue / dataTarget) * 100;
        //     $(this).find('.currentValuePercentage').css('left', valueInPercentage + '%');
        //   });
        // }, 1000);
      }
    });

    function dataValueColorRange(number) {
      if (number == 0) {
        return '#ff0000';
      } else if ((number > 0 && number < 5) || number == 5) {
        return '#ff0000';
      } else if ((number > 5 && number < 10) || number == 10) {
        return '#ff1f00';
      } else if ((number > 10 && number < 15) || number == 15) {
        return '#ff3a00';
      } else if ((number > 15 && number < 20) || number == 20) {
        return '#ff5400';
      } else if ((number > 20 && number < 25) || number == 25) {
        return '#ff6e00';
      } else if ((number > 25 && number < 30) || number == 30) {
        return '#ff8900';
      } else if ((number > 30 && number < 35) || number == 35) {
        return '#ffa401';
      } else if ((number > 35 && number < 40) || number == 40) {
        return '#ffbd00';
      } else if ((number > 40 && number < 45) || number == 45) {
        return '#ffd700';
      } else if ((number > 45 && number < 50) || number == 50) {
        return '#fff200';
      } else if ((number > 50 && number < 55) || number == 55) {
        return '#f3f901';
      } else if ((number > 55 && number < 60) || number == 60) {
        return '#f2f800';
      } else if ((number > 60 && number < 65) || number == 65) {
        return '#d8ec00';
      } else if ((number > 65 && number < 70) || number == 70) {
        return '#bdde00';
      } else if ((number > 70 && number < 75) || number == 75) {
        return '#88c400';
      } else if ((number > 75 && number < 80) || number == 80) {
        return '#6fb700';
      } else if ((number > 80 && number < 85) || number == 85) {
        return '#55ab00';
      } else if ((number > 85 && number < 90) || number == 90) {
        return '#3b9d00';
      } else if ((number > 90 && number < 95) || number == 95) {
        return '#1f8f00';
      } else if ((number > 95 && number < 100) || number == 100) {
        return '#008000';
      } else {
        return '#008000';
      }
    }
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
