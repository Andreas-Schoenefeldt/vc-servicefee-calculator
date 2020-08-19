<?php
/*
Plugin Name: Belvoir Interactive Elements
Plugin URI: https://github.com/Andreas-Schoenefeldt/vc-servicefee-calculator
Description: Extends WPBakery Page Builder with interactive elements like the service fee calculator.
Version: 0.1.1
Author: Herzschuss (Andreas Schönefeldt)
Author URI: https://github.com/Andreas-Schoenefeldt
License: proprietary
*/

use VCServiceFeeCalculator\VC\VCServiceFeeCalculator;

require __DIR__ . '/vendor/autoload.php';

// don't load directly
if (!defined('ABSPATH')) die('-1');

// initialize code
new VCServiceFeeCalculator();