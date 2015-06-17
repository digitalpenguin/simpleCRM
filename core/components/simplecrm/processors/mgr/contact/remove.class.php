<?php
class ContactRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'Contact';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.contact';
}
return 'ContactRemoveProcessor';