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
    Shortcode logic how it should be rendered
    */
    public function render( $atts, $content = null ) {

        if (!is_array($atts)) {
            $atts = [];
        }

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