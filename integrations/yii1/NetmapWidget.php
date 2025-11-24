<?php
class NetmapWidget extends CWidget
{
    public $apiBase = 'https://netmap.localhost';
    public $token;

    public function init()
    {
        if (!$this->token) {
            throw new CException('Token requerido para consumir FTTH-NETMAP');
        }
        Yii::app()->clientScript->registerScript('netmap-widget', "window.netmapToken='{$this->token}';", CClientScript::POS_HEAD);
    }

    public function run()
    {
        echo CHtml::tag('iframe', [
            'src' => $this->apiBase . '/web',
            'style' => 'width:100%; height:720px; border:0;',
            'allow' => 'fullscreen'
        ], '');
    }
}
