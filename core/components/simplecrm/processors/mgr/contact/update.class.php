<?php
class ContactUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'Contact';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.contact';

    public function initialize() {
        $editedById = $this->getProperty('id');
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'id is: '.$editedById);
        $this->setProperty('editedby',$editedById);
        $this->setProperty('editedby_name', $this->getUserName($editedById));
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'fullname is: '.$this->getProperty('editedby_name'));
        $this->setEditTime();
        return parent::initialize();
    }

    private function getUserName($userId) {
        $profile = $this->modx->getObject('modUserProfile', array('internalKey' => $userId));
        $fullName = $profile->get('fullname');
        return $fullName;
    }

    private function setEditTime() {
        date_default_timezone_set('Asia/Hong_Kong');
        $date = date('m/d/Y h:i:s a', time());
        $this->setProperty('editedon', $date);
    }

}
return 'ContactUpdateProcessor';