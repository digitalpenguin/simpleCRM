<?php
class ResponseRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'Response';
    public $languageTopics = array('simplecrm:default');
    public $objectType = 'simplecrm.response';
}
return 'ResponseRemoveProcessor';