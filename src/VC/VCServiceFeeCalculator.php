<?php

namespace VCServiceFeeCalculator\VC;

use VCServiceFeeCalculator\Plugin\Plugin;

class VCServiceFeeCalculator {

    const SHORT_CODE_ID = 'service-fee-calculator';

    protected $params = [];

    function __construct() {
        // We safely integrate with VC with this hook
        add_action( 'init', array( $this, 'integrateWithVC' ) );

        // Use this when creating a shortcode addon
        add_shortcode( self::SHORT_CODE_ID, array( $this, 'render' ) );

        // Register CSS and JS
        add_action( 'wp_enqueue_scripts', array( $this, 'loadCssAndJs' ) );

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
    }

    public function integrateWithVC() {
        // Check if WPBakery Page Builder is installed
        if ( ! defined( 'WPB_VC_VERSION' ) ) {
            // Display notice that Extend WPBakery Page Builder is required
            add_action('admin_notices', array( $this, 'showVcVersionNotice' ));
            return;
        }

        /*
        Add your WPBakery Page Builder logic here.
        Lets call vc_map function to "register" our custom shortcode within WPBakery Page Builder interface.

        More info: https://kb.wpbakery.com/docs/inner-api/vc_map/
        */
        vc_map( array(
            "name" => __("Service Fee Calculator", Plugin::ID),
            "description" => __("The service fee calculator of the conditions page.", Plugin::ID),
            "base" => self::SHORT_CODE_ID,
            "class" => "",
            "controls" => "full",
            "icon" => 'icon-wpb-vc-line-chart', // or css class name which you can reffer in your css file later. Example: "vc_extend_my_class"
            "category" => __('Content', 'js_composer'),
            //'admin_enqueue_js' => array(plugins_url('assets/vc_extend.js', __FILE__)), // This will load js file in the VC backend editor
            //'admin_enqueue_css' => array(plugins_url('assets/vc_extend_admin.css', __FILE__)), // This will load css file in the VC backend editor
            "params" => $this->params
        ) );
    }

    /*
    Shortcode logic how it should be rendered
    */
    public function render( $atts, $content = null ) {
        foreach ($this->params as $paramConf) {
            if (!isset($atts[$paramConf['param_name']]) && isset($paramConf['value'])) {
                $atts[$paramConf['param_name']] = $paramConf['value'];
            }
        }

        $atts['benfits'] =  '<li>' . implode('</li><li>', explode("<br />", $atts['benfits'])) . '</li>';

        $atts['content'] = wpb_js_remove_wpautop($content, true); // fix unclosed/unwanted paragraph tags in $content


        return Plugin::getProcessedTemplateString(self::SHORT_CODE_ID, $atts);
    }

    /*
    Load plugin css and javascript files which you may need on front end of your site
    */
    public function loadCssAndJs() {
        wp_register_style( 'vc_extend_style', plugins_url('assets/css/' . self::SHORT_CODE_ID . '.css', __DIR__ . '/../../'. Plugin::ID . '.php') );
        wp_enqueue_style( 'vc_extend_style' );

        // If you need any javascript files on front end, here is how you can load them.
        wp_enqueue_script( 'vc_extend_js', plugins_url('assets/js/' . self::SHORT_CODE_ID . '.js', __DIR__ . '/../../'. Plugin::ID . '.php'), array('jquery') );
    }

    /*
        Show notice if your plugin is activated but Visual Composer is not
        */
    public function showVcVersionNotice() {
        echo '<div class="updated">
          <p>'.sprintf(__('<strong>%s</strong> requires <strong><a href="http://bit.ly/vcomposer" target="_blank">Visual Composer</a></strong> plugin to be installed and activated on your site.', 'vc_extend'), Plugin::NAME).'</p>
        </div>';
    }

}