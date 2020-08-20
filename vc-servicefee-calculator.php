<?php
/*
Plugin Name: Belvoir Interactive Elements
Plugin URI: https://github.com/Andreas-Schoenefeldt/vc-servicefee-calculator
Description: Extends WPBakery Page Builder with interactive elements like the service fee calculator.
Version: 0.1.2
Author: Herzschuss (Andreas Schönefeldt)
Author URI: https://github.com/Andreas-Schoenefeldt
License: proprietary
*/

use VCServiceFeeCalculator\Plugin\Plugin;
use VCServiceFeeCalculator\VC\VCPerformanceChart;
use VCServiceFeeCalculator\VC\VCServiceFeeCalculator;

require __DIR__ . '/vendor/autoload.php';

// don't load directly
if (!defined('ABSPATH')) die('-1');

// Register CSS and JS
add_action( 'wp_enqueue_scripts', function () {
    wp_register_style( 'vc_extend_style', plugins_url('assets/css/style.css', __FILE__) );
    wp_enqueue_style( 'vc_extend_style' );

    // If you need any javascript files on front end, here is how you can load them.
    wp_enqueue_script( 'vc_extend_js', plugins_url('assets/js/plugin.js', __FILE__), array('jquery') );
});

// initialize code
new VCServiceFeeCalculator();
new VCPerformanceChart();