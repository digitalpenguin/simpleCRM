<?php
class ContactCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'Contact';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.contact';

    public function initialize() {
        $this->setUserId();
        $this->setCreateTime();
        $this->setCreatedByName();
        return parent::initialize();
    }

    public function beforeSave() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('Specify'));
        } else if ($this->doesAlreadyExist(array('name' => $name))) {
            $this->addFieldError('name',$this->modx->lexicon('simplecrm.contact_err_ae'));
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

    public function setCreatedByName() {
        $createdById = $user = $this->modx->getLoginUserID();;
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'id is: '.$createdById);
        $this->setProperty('createdby_name', $this->getUserName($createdById));
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'fullname is: '.$this->getProperty('createdby_name'));
    }

    private function getUserName($userId) {
        $profile = $this->modx->getObject('modUserProfile', array('internalKey' => $userId));
        $fullName = $profile->get('fullname');
        return $fullName;
    }
}
return 'ContactCreateProcessor';