<?php


namespace VCServiceFeeCalculator\VC;


use VCServiceFeeCalculator\Plugin\Plugin;

class AbstractVCComponent {

    protected $shortCodeId;

    protected $params = [];

    protected $vcMap = [];

    public function __construct($shortCodeId) {

        $this->shortCodeId = $shortCodeId;

        // We safely integrate with VC with this hook
        add_action( 'init', array( $this, 'integrateWithVC' ) );

        // Use this when creating a shortcode addon
        add_shortcode( $this->shortCodeId, array( $this, 'render' ) );

        // Register CSS and JS
        add_action( 'wp_enqueue_scripts', array( $this, 'loadCssAndJs' ) );
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
        vc_map( $this->vcMap );
    }

    /*
    Load plugin css and javascript files which you may need on front end of your site
    */
    public function loadCssAndJs() {
        wp_register_style( 'vc_extend_style', plugins_url('assets/css/' . $this->shortCodeId . '.css', __DIR__ . '/../../'. Plugin::ID . '.php') );
        wp_enqueue_style( 'vc_extend_style' );

        // If you need any javascript files on front end, here is how you can load them.
        wp_enqueue_script( 'vc_extend_js', plugins_url('assets/js/' . $this->shortCodeId . '.js', __DIR__ . '/../../'. Plugin::ID . '.php'), array('jquery') );
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

        $atts = $this->processAttributes($atts);

        if ($content) {
            $atts['content'] = wpb_js_remove_wpautop($content, true); // fix unclosed/unwanted paragraph tags in $content
        }

        return Plugin::getProcessedTemplateString($this->shortCodeId, $atts);
    }

    protected function processAttributes ($atts) {
        return $atts;
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