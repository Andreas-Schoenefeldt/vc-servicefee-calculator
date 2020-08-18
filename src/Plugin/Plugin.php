<?php


namespace VCServiceFeeCalculator\Plugin;


class Plugin {

    const NAME = 'VC Service Fee Calculator';

    const ID = 'vc-servicefee-calculator';


    public static function getProcessedTemplateString($fileKey, $parameters = []) {

        $template = file_get_contents(__DIR__ . '/../templates/' . $fileKey . '.tmpl.html');

        foreach ($parameters as $key => $value) {
            $template = str_replace("{{$key}}", $value, $template);
        }

        return $template;
    }

}