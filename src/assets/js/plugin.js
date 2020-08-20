import Widgets from 'js-widget-hooks';
import $ from './utils/assure-jquery';
import './widgets/performance-chart';
import './widgets/service-fee-calculator';

$(document).ready(function() {
    Widgets.init(null, {
        widgetClass: 'bv-widget'
    });
});