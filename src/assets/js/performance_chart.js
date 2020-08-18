google.charts.load('current', {
    packages: ['corechart']
}).then(function () {
    jQuery('#amountOne').on('click', amountOne);
    jQuery('#amountTwo').on('click', amountTwo);
    jQuery('#amountThree').on('click', amountThree);
    jQuery('#amountFour').on('click', amountFour);
    jQuery('#amountFive').on('click', amountFive);
    jQuery('#amountSix').on('click', amountSix);
});
google.charts.setOnLoadCallback(amountOne);
function amountOne() {
    var tab1_value1 = <?php echo get_field('5_years_tab1')?>;
    var tab1_value2 = <?php echo get_field('10_years_tab1')?>;
    var tab1_value3 = <?php echo get_field('20_years_tab1')?>;
    var data = google.visualization.arrayToDataTable([
        ["Element", "Price", { role: "style" } ],
        ["5 Years", tab1_value1, "#89674e"],
        ["10 Years", tab1_value2, "#89674e"],
        ["20 Years", tab1_value3, "#89674e"]
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
        vAxis: {
            title: "Kostenersparnis / Mehrertrag",
            textPosition: 'none',
            format: '#$'
        },
        hAxis: {
            format:'#%'
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);

}
function amountTwo() {
    var tab2_value1 = <?php echo get_field('5_years_tab2')?>;
    var tab2_value2 = <?php echo get_field('10_years_tab2')?>;
    var tab2_value3 = <?php echo get_field('20_years_tab2')?>;
    var data = google.visualization.arrayToDataTable([
        ["Element", "Price", { role: "style" } ],
        ["5 Years", tab2_value1, "#89674e"],
        ["10 Years", tab2_value2, "#89674e"],
        ["20 Years", tab2_value3, "#89674e"]
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
        vAxis: {
            title: "Kostenersparnis / Mehrertrag",
            textPosition: 'none'
        },
        hAxis: {
            format:'#€'
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}
function amountThree() {
    var tab3_value1 = <?php echo get_field('5_years_tab3')?>;
    var tab3_value2 = <?php echo get_field('10_years_tab3')?>;
    var tab3_value3 = <?php echo get_field('20_years_tab3')?>;
    var data = google.visualization.arrayToDataTable([
        ["Element", "Price", { role: "style" } ],
        ["5 Years", tab3_value1, "#89674e"],
        ["10 Years", tab3_value2, "#89674e"],
        ["20 Years", tab3_value3, "#89674e"]
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
        vAxis: {
            title: "Kostenersparnis / Mehrertrag",
            textPosition: 'none'
        },
        hAxis: {
            format: '#€'
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}
function amountFour() {
    var tab4_value1 = <?php echo get_field('5_years_tab4')?>;
    var tab4_value2 = <?php echo get_field('10_years_tab4')?>;
    var tab4_value3 = <?php echo get_field('20_years_tab4')?>;
    var data = google.visualization.arrayToDataTable([
        ["Element", "Price", { role: "style" } ],
        ["5 Years", tab4_value1, "#89674e"],
        ["10 Years", tab4_value2, "#89674e"],
        ["20 Years", tab4_value3, "#89674e"]
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
        vAxis: {
            title: "Kostenersparnis / Mehrertrag",
            textPosition: 'none'
        },
        hAxis: {
            format: '#€'
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}
function amountFive() {
    var tab5_value1 = <?php echo get_field('5_years_tab5')?>;
    var tab5_value2 = <?php echo get_field('10_years_tab5')?>;
    var tab5_value3 = <?php echo get_field('20_years_tab5')?>;
    var data = google.visualization.arrayToDataTable([
        ["Element", "Price", { role: "style" } ],
        ["5 Years", tab5_value1, "#89674e"],
        ["10 Years", tab5_value2, "#89674e"],
        ["20 Years", tab5_value3, "#89674e"]
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
        vAxis: {
            title: "Kostenersparnis / Mehrertrag",
            textPosition: 'none'
        },
        hAxis: {
            format: '#€'
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}
function amountSix() {
    var tab6_value1 = <?php echo get_field('5_years_tab6')?>;
    var tab6_value2 = <?php echo get_field('10_years_tab6')?>;
    var tab6_value3 = <?php echo get_field('20_years_tab6')?>;
    var data = google.visualization.arrayToDataTable([
        ["Element", "Price", { role: "style" } ],
        ["5 Years", tab6_value1, "#89674e"],
        ["10 Years", tab6_value2, "#89674e"],
        ["20 Years", tab6_value3, "#89674e"]
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
        vAxis: {
            title: "Kostenersparnis / Mehrertrag",
            textPosition: 'none'
        },
        hAxis: {
            format: '#€'
        },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}