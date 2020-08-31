import Widgets from 'js-widget-hooks';
import $ from '../utils/assure-jquery';

Widgets.register('performance-chart', function (elem) {

    const el = $(elem);
    const growth5 = parseFloat(el.data('grow_factor_5'));
    const growth10 = parseFloat(el.data('grow_factor_10'));
    const growth20 = parseFloat(el.data('grow_factor_20'));
    const chartColor = el.data('chart_color');
    const amountItemCount = el.data('amounts_count');
    const chartLabel = el.data('chart_label');

    const renderChart = function (amount) {
        const tab1_value1 = amount * growth5;
        var tab1_value2 = amount * growth10;
        var tab1_value3 = amount * growth20;
        var data = google.visualization.arrayToDataTable([
            ["Element", "Price", { role: "style" } ],
            ["5 Jahre", tab1_value1, chartColor],
            ["10 Jahre", tab1_value2, chartColor],
            ["20 Jahre", tab1_value3, chartColor]
        ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
            { calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation" },
            2]);

        var options = {
            title: "",
            // width: 600,
            height: 400,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
            tooltip: {trigger: 'none'},
            vAxis: {
                title: chartLabel,
                textPosition: 'none',
                format: '#$'
            },
            hAxis: {
                format:'#%'
            },
        };

        var chart = new google.visualization.ColumnChart(elem);
        chart.draw(view, options);
    };

    google.charts.load('current', {
        packages: ['corechart']
    }).then(function () {
        for (let i = 0; i < amountItemCount; i++) {
            const amountEl = $('#amount' + i);

            if(amountEl.hasClass('active')) {
                renderChart(parseInt(amountEl.data('amount')));
            }

            amountEl.click(function () {
                const el = $(this);
                el.parent().find('.active').removeClass('active');
                el.addClass('active');
                renderChart(parseInt(el.data('amount')));
            });
        }

    });
});