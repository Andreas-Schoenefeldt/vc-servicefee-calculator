<?php

namespace VCServiceFeeCalculator\VC;

use VCServiceFeeCalculator\Plugin\Plugin;

class VCServiceFeeCalculator extends AbstractVCComponent {

    function __construct() {

        parent::__construct('service-fee-calculator');

        $this->params = array(
            array(
                "type" => "textarea_html",
                "class" => "",
                "heading" => __("Notes on Product Costs", Plugin::ID),
                "param_name" => "content",
                "description" => __("Explenation on the product costs", Plugin::ID),
                "group" => __("Benefits & Notes", Plugin::ID)
            ),
            array(
                "type" => "textarea",
                "class" => "",
                "heading" => __("Benefits", Plugin::ID),
                "param_name" => "benfits",
                "description" => __("Product Benefits, one per Line.", Plugin::ID),
                "group" => __("Benefits & Notes", Plugin::ID)
            ),
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Slider Managed Assets Text", Plugin::ID),
                "param_name" => "managed_assets_text",
                "value" => "Ø verwaltetes Vermögen",
                "group" => __("Slider", Plugin::ID)
            ),
            /*
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Slider Assets Up To", Plugin::ID),
                "param_name" => "slider_assets_up_to",
                "value" => "zu 0.75%",
                "group" => __("Slider", Plugin::ID)
            ),
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Slider Assets Over", Plugin::ID),
                "param_name" => "slider_assets_over",
                "value" => "zu 0.45%",
                "group" => __("Slider", Plugin::ID)
            ),
            */
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Service Per Annum Price", Plugin::ID),
                "param_name" => "service_per_annum_price",
                "value" => "CHF 500",
                "group" => __("Slider", Plugin::ID)
            ),
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Slider Min Range", Plugin::ID),
                "param_name" => "slider_min_range",
                "value" => "0",
                "group" => __("Slider", Plugin::ID)
            ),
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Slider Max Range", Plugin::ID),
                "param_name" => "slider_max_range",
                "value" => "2000000",
                "group" => __("Slider", Plugin::ID)
            ),
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Slider Start Value", Plugin::ID),
                "param_name" => "slider_from_range",
                "value" => "1350000",
                "group" => __("Slider", Plugin::ID)
            ),
            /*
            array(
                "type" => "textfield",
                "class" => "",
                "heading" => __("Service Per Annum Percent", Plugin::ID),
                "param_name" => "per_anum_percent",
                "value" => "0.75",
                "group" => __("Slider", Plugin::ID)
            )
            */
        );

        $this->vcMap = array(
            "name" => __("BV Service Fee Calculator", Plugin::ID),
            "description" => __("The service fee calculator of the conditions page.", Plugin::ID),
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

    /**
     * @param array $atts
     * @return array
     */
    protected function processAttributes($atts) {
        $atts['benfits'] =  '<li>' . implode('</li><li>', explode("<br />", $atts['benfits'])) . '</li>';
        return $atts;
    }
}