<?php
class ContactCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'Contact';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.contact';

    public function beforeSave() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('simplecrm.contact_err_ns_name'));
        } else if ($this->doesAlreadyExist(array('name' => $name))) {
            $this->addFieldError('name',$this->modx->lexicon('simplecrm.contact_err_ae'));
        }
        return parent::beforeSave();
    }
}
return 'ContactCreateProcessor';