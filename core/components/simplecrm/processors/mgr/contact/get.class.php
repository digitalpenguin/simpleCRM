<?php
class SimpleCRMContactGetProcessor extends modObjectGetProcessor {
    public $classKey = 'Contact';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.contact';
}
return 'SimpleCRMContactGetProcessor';