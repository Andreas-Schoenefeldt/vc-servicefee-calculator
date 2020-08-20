<?php

namespace VCServiceFeeCalculator\VC;

use VCServiceFeeCalculator\Plugin\Plugin;

class VCPerformanceChart extends AbstractVCComponent {

    function __construct() {

        parent::__construct('performance-chart');

        $this->params = [
            [
                'type' => 'textfield',
                "heading" => __("Amount Label above the tabs", Plugin::ID),
                "param_name" => "amount_label",
                "value" => "Wählen Sie einen Anlagebetrag, um die Auswirkungen zu sehen:",
            ],
            array(
                "type" => "textarea",
                "class" => "",
                "heading" => __("Amounts", Plugin::ID),
                "param_name" => "amounts",
                "description" => __("Selectable amounts, one per Line.", Plugin::ID),
            ),
            [
                'type' => 'textfield',
                "heading" => __("Explanation Label", Plugin::ID),
                "param_name" => "explanation_label",
                "value" => "Berechnungshinweis",
            ],
            [
                'type' => 'textarea_html',
                "heading" => __("Explanation Popup Text", Plugin::ID),
                "param_name" => "content",
                "value" => "<p>Annahmen: Fondsrendite 5% p. a., Ausgabeaufschlag von 5%, Haltedauer Fonds 4 Jahre, Erstattung Bestandspflegeprovisionen 0,7% p. a., Depot / Transaktionskosten 0,15% p. a., Kosten BELVOIR DIRECT lt. Preisverzeichnis</p>",
            ],
            [
                "type" => 'colorpicker',
                "heading" => __("Chart Color", Plugin::ID),
                "param_name" => "chart_color",
                "value" => '#89674e'
            ],
            [
                "type" => 'textfield',
                "heading" => __("Chart Label", Plugin::ID),
                "param_name" => "chart_label",
                "value" => 'Kostenersparnis / Mehrertrag'
            ],
            [
                'type' => 'textfield',
                "heading" => __("Grow Factor after 5 Years", Plugin::ID),
                "param_name" => "grow_factor_5",
                "value" => "0.1252",
            ],
            [
                'type' => 'textfield',
                "heading" => __("Grow Factor after 10 Years", Plugin::ID),
                "param_name" => "grow_factor_10",
                "value" => "0.2426",
            ],
            [
                'type' => 'textfield',
                "heading" => __("Grow Factor after 20 Years", Plugin::ID),
                "param_name" => "grow_factor_20",
                "value" => "0.6645",
            ],

        ];

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

    /**
     * @param array $atts
     * @return array
     */
    protected function processAttributes($atts) {
        $atts['amounts'] = explode("<br />", $atts['amounts']);
        $atts['amounts_count'] = count($atts['amounts']);

        $amountsHtml = '';

        foreach ($atts['amounts'] as $i => $amount) {
            $amountsHtml .= '<div data-amount="' . $amount . '" class="price' . ($i === 0 ? ' active': '') . '" id="amount' . $i . '">' . number_format($amount, 0, ',', '.') . '</div>';
        }

        $atts['amounts_html'] = $amountsHtml;
        return $atts;
    }
}