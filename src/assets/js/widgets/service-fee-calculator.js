import $ from '../utils/assure-jquery';
import Widgets from 'js-widget-hooks';
import 'ion-rangeslider';

const formatNumber = function (number) {
    let result = '';
    let stringToFormat = number.toFixed(0);

    while (stringToFormat.length > 0) {
        let split = stringToFormat.substr(-3);
        result = split + ' ' + result;
        stringToFormat = stringToFormat.substring(0, stringToFormat.length - 3);
    }

    return result;
};

console.log($);

Widgets.register('service-fee-calculator', function (elem) {
    var rangeInput = $(elem);

    const borderAmount = parseInt(rangeInput.data('border_amount'));
    const serviceFeeMin = parseInt(rangeInput.data('min_service_fee'));
    const serviceRateBelowBorder = parseFloat(rangeInput.data('percent_below_border')) / 100;
    const serviceRateAboveBorder = parseFloat(rangeInput.data('percent_above_border')) / 100;
    const price_prefix = rangeInput.data('currency_label') + " ";

    var xPrev = parseInt(rangeInput.data('slider_from_range'));

    var calulateSlider = function (data) {
        var serviceFee = 0;

        var currentValue = data.from;

        if (currentValue < borderAmount) {
            serviceFee += currentValue * serviceRateBelowBorder;
        } else {
            serviceFee += borderAmount * serviceRateBelowBorder;
            serviceFee += (currentValue - borderAmount) * serviceRateAboveBorder;
        }
        if (serviceFee < serviceFeeMin) {
            serviceFee = serviceFeeMin;
        }

        $('.service-fee-text').html('Service fee p.a. ' + price_prefix + ' ' + formatNumber(serviceFee));

        if (currentValue < borderAmount) {
            $(".price-data2").addClass("blur");
            $(".irs-single-second").addClass("remove");
        } else {
            $(".price-data2").removeClass("blur");
            $(".irs-single-second").removeClass("remove");
        }

        if (serviceFee <= serviceFeeMin) {
            $(".per-annum").html(price_prefix + serviceFeeMin);
        } else {
            const rate = serviceFee / currentValue * 100;
            $(".per-annum").html(rate.toFixed(2) + "%");
        }

        $(".irs-below-second").html(price_prefix + formatNumber(Math.min(borderAmount, currentValue)) + ' zu ' + (serviceRateBelowBorder * 100).toFixed(2) + '%');
        $(".irs-single-second").html(price_prefix + formatNumber(Math.max(0, currentValue - borderAmount)) + ' zu ' + (serviceRateAboveBorder * 100).toFixed(2) + '%');

        if (serviceFee <= serviceFeeMin) {
            $(".irs-single-second").hide();
            $(".irs-service-fee").addClass("end");
            $(".irs-single").addClass("end");
            $(".irs-upper-text").addClass("end");
            $(".irs-below-second").addClass("end");
        } else {
            $(".irs-service-fee").removeClass("end");
            $(".irs-single").removeClass("end");
            $(".irs-upper-text").removeClass("end");
            $(".irs-below-second").removeClass("end");
            $(".irs-single-second").show();
        }
    };

    rangeInput.ionRangeSlider({
        min: parseInt(rangeInput.data('slider_min_range')),
        max: parseInt(rangeInput.data('slider_max_range')),
        from: xPrev,
        step: 10000,
        prefix: price_prefix,
        onChange: calulateSlider
    });

    // adding stuff to the markup, that is not basic
    $('.irs-single').parent().append('<span class="irs-upper-text">' + rangeInput.data('managed_assets_text') + '</span>' +
        '<span class="irs-service-fee">Service Fee p. a. <span class="per-annum" id="minn"> </span><span id="maxx"> </span> exkl. MwSt.</span>' +
        '<span class="irs-below-second"></span>' +
        '<span class="irs-single-second">0</span>' +
        '<span class="service-fee-text"></span>'
    );

    // initializing the values
    calulateSlider({from: xPrev});
});