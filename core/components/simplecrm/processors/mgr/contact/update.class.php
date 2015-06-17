<?php
class ContactUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'Contact';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.contact';
}
return 'ContactUpdateProcessor';