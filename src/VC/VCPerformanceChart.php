<?php

namespace VCServiceFeeCalculator\VC;

use VCServiceFeeCalculator\Plugin\Plugin;

class VCPerformanceChart extends AbstractVCComponent {

    function __construct() {

        parent::__construct('performance-chart');

        $this->params = array(
            array(
                "type" => "textarea_html",
                "class" => "",
                "heading" => __("Main Description", Plugin::ID),
                "param_name" => "content",
                "description" => __("The actual content", Plugin::ID),
                "value" => "<p>Bei uns gibt es keine Ausgabeaufschläge und wir erstatten versteckte Provisionen wie z.B. Retrozessionen , Kickbacks, Bestandspflegeprovisionen direkt an Sie zurück. Die Performance Ihrer Investition verbessert sich somit signifikant.</p>"
                // "group" => __("Benefits & Notes", Plugin::ID)
            )
        );

        $this->vcMap = array(
            "name" => __("BV Performance Chart", Plugin::ID),
            "description" => __("The performance chart for long term investment benefit projections.", Plugin::ID),
            "base" => $this->shortCodeId,
            "class" => "",
            "controls" => "full",
            "icon" => 'icon-wpb-vc-line-chart', // or css class name which you can reffer in your css file later. Example: "vc_extend_my_class"
            "category" => __('Content', 'js_composer'),
            //'admin_enqueue_js' => array(plugins_url('assets/vc_extend.js', __FILE__)), // This will load js file in the VC backend editor
            //'admin_enqueue_css' => array(plugins_url('assets/vc_extend_admin.css', __FILE__)), // This will load css file in the VC backend editor
            "params" => $this->params
        );
    }
}