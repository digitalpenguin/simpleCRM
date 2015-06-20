<?php
class ResponseCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'Response';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.response';

    public function initialize() {
        $this->setUserId();
        $this->setCreateTime();
        return parent::initialize();
    }

    public function beforeSave() {
        $name = $this->getProperty('persons_name');

        if (empty($name)) {
            $this->addFieldError('persons_name',$this->modx->lexicon('Specify'));
        } else if ($this->doesAlreadyExist(array('persons_name' => $name))) {
            $this->addFieldError('persons_name',$this->modx->lexicon('simplecrm.contact_err_ae'));
        }
        return parent::beforeSave();
    }

    private function setUserId() {
        $user = $this->modx->getLoginUserID();
        $this->setProperty('createdby', $user);
    }

    private function setCreateTime() {
        date_default_timezone_set('Asia/Hong_Kong');
        $date = date('m/d/Y h:i:s a', time());
        $this->setProperty('createdon', $date);
    }
}
return 'ResponseCreateProcessor';