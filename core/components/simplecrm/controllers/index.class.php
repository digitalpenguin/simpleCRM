<?php
require_once dirname(dirname(__FILE__)) . '/model/simplecrm/simplecrm.class.php';
/**
 * @package simplecrm
 */
class SimpleCRMIndexManagerController extends modExtraManagerController {
    /** @var SimpleCrm $simplecrm */
     public $simplecrm;
     public function initialize() {
         $this->simplecrm = new SimpleCRM($this->modx);

         $this->addCss($this->simplecrm->config['cssUrl'].'mgr.css');
         $this->addJavascript($this->simplecrm->config['jsUrl'].'mgr/simplecrm.js');
         $this->addHtml('<script type="text/javascript">
         Ext.onReady(function() {
             SimpleCRM.config = '.$this->modx->toJSON($this->simplecrm->config).';
         });
         </script>');
         return parent::initialize();
     }
     public function getLanguageTopics() {
         return array('simplecrm:default');
     }
     public function checkPermissions() { return true;}

     public function process(array $scriptProperties = array()) {}

     public function getPageTitle() { return $this->modx->lexicon('simplecrm'); }

     public function loadCustomCssJs() {
         $this->addJavascript($this->simplecrm->config['jsUrl'].'mgr/widgets/contact.panel.js');
         $this->addJavascript($this->simplecrm->config['jsUrl'].'mgr/widgets/responses.grid.js');
         $this->addJavascript($this->simplecrm->config['jsUrl'].'mgr/widgets/contacts.grid.js');
         $this->addJavascript($this->simplecrm->config['jsUrl'].'mgr/widgets/home.panel.js');
         $this->addLastJavascript($this->simplecrm->config['jsUrl'].'mgr/sections/index.js');
     }

     public function getTemplateFile() {
         return $this->simplecrm->config['templatesPath'].'home.tpl';
     }
}

