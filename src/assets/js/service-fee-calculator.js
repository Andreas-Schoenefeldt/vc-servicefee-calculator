import 'ion-rangeslider';

var Rate = 0.75;
var rate;
var xPrev = 1350000;

var borderAmount = 1000000;
var price_prefix = "CHF";

jQuery(document).ready(function(){
    var rangeInput = jQuery("#range_02");
    var assets_dutch = rangeInput.data('managed_assets_text');
    var assets_up_to = rangeInput.data('slider_assets_up_to');
    var assets_over = rangeInput.data('slider_assets_over');
    var service_dutch = 'Service Fee p. a. <span class="per-annum" id="minn"> </span><span id="maxx"> </span> exkl. MwSt.';
    var service_percent = rangeInput.data('service_per_annum_percent');

    rangeInput.ionRangeSlider({
        min: parseInt(rangeInput.data('slider_min_range')),
        max: parseInt(rangeInput.data('slider_max_range')),
        from: parseInt(rangeInput.data('slider_from_range')),
        step: 10000,
        prefix: price_prefix,
        onChange: function (data) {
            //setTimeout(function() {
            var slider_value = jQuery(".irs-bar").width();
            var currentValue = jQuery(".irs-single").text();
            currentValue = currentValue.replace(price_prefix, '');
            currentValue = currentValue.replace(' ', '');
            currentValue = parseInt(currentValue.replace(' ', ''));
            var max_annualRate = jQuery(".irs-below-text").html();
            var number_min = max_annualRate.replace(/[^\d\.]/g, '');
            var min_annualRate = jQuery(".irs-single-text").html();
            var number_max = min_annualRate.replace(/[^\d\.]/g, '');
            var totalRate = parseFloat(number_min) + parseFloat(number_max);
            var actualRate = totalRate / 2;
            var serviceFee = 0;

            if (currentValue < 1000000) {
                serviceFee += currentValue * 0.0075;
            } else {

                serviceFee += 1000000 * 0.0075;
                serviceFee += (currentValue - 1000000) * 0.0045;
            }
            if (serviceFee < 500) {
                serviceFee = 500;
            }
            jQuery('.service-fee-text').html('Service fee p.a. ' + price_prefix + ' ' + serviceFee);
//				console.log(serviceFee)
            if (slider_value > 361 && slider_value <= 723) {
                if (xPrev < data.from) {
                    Rate = Rate - 0.001;
                } else {
                    Rate = Rate + 0.001;
                }

                if (Rate < 0.58) {
                    Rate = 0.58;
                } else if (Rate > 0.75) {
                    Rate = 0.75;
                }

                rate = Rate.toFixed(2);
                jQuery(".per-annum").html(rate + "%");
            } else if (slider_value > 723) {
                jQuery(".per-annum").html("0.58%");
            } else {
                jQuery(".per-annum").html("0.75%");
            }

            xPrev = data.from;

            var actualAnualrate = actualRate.toFixed(2);
            if (slider_value == 723) {

                jQuery(".per-annum").html(actualAnualrate + "%");
            }

            var per_annum_dutch = rangeInput.data('service_per_annum_price');

            if (currentValue < borderAmount) {
                jQuery(".price-data2").addClass("blur");
                jQuery(".irs-single-second").addClass("remove");
                jQuery(".irs-single-text").addClass("remove");
            } else {
                jQuery(".price-data2").removeClass("blur");
                jQuery(".irs-single-second").removeClass("remove");
                jQuery(".irs-single-text").removeClass("remove");
            }
            if (slider_value <= 18) {
                jQuery(".per-annum").html(per_annum_dutch);
            } else {
                // jQuery(".per-annum").html(rate + "%");
            }
            if (currentValue < borderAmount) {

                var a = jQuery(".irs-single-second").text();
                var c = a.replace(/[^\d.]/g, "");
                var b = parseInt(c) - borderAmount;
                jQuery(".irs-single-second").html(b);
            } else {
                jQuery(".irs-below-second").html(price_prefix + " 1000000");
            }

            if (slider_value <= 5) {
                jQuery(".irs-below-text").hide();
                jQuery(".irs-single-text").hide();
                jQuery(".irs-single-second").hide();
                jQuery(".irs-service-fee").addClass("end");
                jQuery(".irs-single").addClass("end");
                jQuery(".irs-upper-text").addClass("end");
                jQuery(".irs-below-second").addClass("end");
            } else {
                jQuery(".irs-service-fee").removeClass("end");
                jQuery(".irs-single").removeClass("end");
                jQuery(".irs-upper-text").removeClass("end");
                jQuery(".irs-below-second").removeClass("end");
                jQuery(".irs-below-text").show();
                jQuery(".irs-single-text").show();
                var a = jQuery(".irs-single-second").text();
                var c = a.replace(/[^\d.]/g, "");
                var b = parseInt(c) - 1000000;
                jQuery(".irs-single-second").html(price_prefix + ' ' + b).show();

            }
//
//		    if(slider_value >= 582){
//	           jQuery(".irs-service-fee").addClass("stop");
//	           jQuery(".irs-below-text").addClass("stop");
//	           jQuery(".irs-single-text").addClass("stop");
//	           jQuery(".irs-single-second").addClass("stop");
//	           jQuery(".irs-below-second").addClass("stop");
//	           jQuery(".irs-upper-text").addClass("stop");
//	           jQuery(".irs-single").addClass("stop");
//		    } else {
//		       jQuery(".irs-service-fee").removeClass("stop");
//	           jQuery(".irs-below-text").removeClass("stop");
//	           jQuery(".irs-single-text").removeClass("stop");
//	           jQuery(".irs-single-second").removeClass("stop");
//	           jQuery(".irs-below-second").removeClass("stop");
//	           jQuery(".irs-upper-text").removeClass("stop");
//	           jQuery(".irs-single").removeClass("stop");
//		    }
        },
        onFinish: function (data) {
            var slider_value = jQuery(".irs-bar").width();
            var per_annum_dutch = rangeInput.data('service_per_annum_price');

            var currentValue = jQuery(".irs-single").text();
            currentValue = currentValue.replace(price_prefix, '');
            currentValue = currentValue.replace(' ', '');
            currentValue = parseInt(currentValue.replace(' ', ''));
            if (currentValue < borderAmount) {
                jQuery(".price-data2").addClass("blur");
                jQuery(".irs-single-second").addClass("remove");
                jQuery(".irs-single-text").addClass("remove");
            } else {
                jQuery(".price-data2").removeClass("blur");
                jQuery(".irs-single-second").removeClass("remove");
                jQuery(".irs-single-text").removeClass("remove");
            }

            setTimeout(function () {
                var max_annualRate = jQuery(".irs-below-text").html();
                var number_min = max_annualRate.replace(/[^\d\.]/g, '');
                var min_annualRate = jQuery(".irs-single-text").html();
                var number_max = min_annualRate.replace(/[^\d\.]/g, '');
                var totalRate = parseFloat(number_min) + parseFloat(number_max);
                var actualRate = totalRate / 2;
                if (slider_value > 361 && slider_value <= 723) {
                    if (xPrev < data.from) {
                        Rate = Rate - 0.001;
                    } else {
                        Rate = Rate + 0.001;
                    }

                    if (Rate < 0.58) {
                        Rate = 0.58;
                    } else if (Rate > 0.75) {
                        Rate = 0.75;
                    }

                    rate = Rate.toFixed(2);
                    jQuery(".per-annum").html(rate + "%");
                } else if (slider_value > 723) {
                    jQuery(".per-annum").html("0.58%");
                } else {
                    jQuery(".per-annum").html("0.75%");
                }

                xPrev = data.from;

                var actualAnualrate = actualRate.toFixed(2);
                if (slider_value == 723) {

                    jQuery(".per-annum").html(actualAnualrate + "%");
                }
            }, 500);

            if (slider_value <= 18) {
                jQuery(".per-annum").html(per_annum_dutch);
            } else {
                // jQuery(".per-annum").html(rate + "%");
            }


            if (slider_value == "0") {
                jQuery(".irs-below-text").hide();
                jQuery(".irs-single-text").hide();
                jQuery(".irs-single-second").hide();
                jQuery(".irs-service-fee").addClass("end");
                jQuery(".irs-single").addClass("end");
                jQuery(".irs-upper-text").addClass("end");
                jQuery(".irs-below-second").addClass("end");
            } else {
                jQuery(".irs-service-fee").removeClass("end");
                jQuery(".irs-single").removeClass("end");
                jQuery(".irs-upper-text").removeClass("end");
                jQuery(".irs-below-second").removeClass("end");
                jQuery(".irs-below-text").show();
                jQuery(".irs-single-text").show();
                jQuery(".irs-single-second").show();
            }

//		    if(slider_value >= 582){
//	           jQuery(".irs-service-fee").addClass("stop");
//	           jQuery(".irs-below-text").addClass("stop");
//	           jQuery(".irs-single-text").addClass("stop");
//	           jQuery(".irs-single-second").addClass("stop");
//	           jQuery(".irs-upper-text").addClass("stop");
//	           jQuery(".irs-single").addClass("stop");
//		    } else {
//		       jQuery(".irs-service-fee").removeClass("stop");
//	           jQuery(".irs-below-text").removeClass("stop");
//	           jQuery(".irs-single-text").removeClass("stop");
//	           jQuery(".irs-single-second").removeClass("stop");
//	           jQuery(".irs-upper-text").removeClass("stop");
//	           jQuery(".irs-single").removeClass("stop");
//		    }
        }
    });

    jQuery(".irs-upper-text").html(assets_dutch);
    jQuery(".irs-service-fee").html(service_dutch);
    jQuery(".per-annum").html(service_percent + "%");
    jQuery(".irs-below-text").html(assets_up_to);
    jQuery(".irs-single-text").html(assets_over);
    jQuery(".irs-below-second").html(price_prefix + " " + borderAmount);
    jQuery('.irs-single-second').after('<span class="service-fee-text"></span>');
    var a = jQuery(".irs-single-second").text();
    var c = a.replace(/[^\d.]/g,"");
    var b = parseInt(c) - borderAmount ;
    jQuery(".irs-single-second").html(price_prefix + ' '+ b).show();

});