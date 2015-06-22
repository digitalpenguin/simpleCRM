<?php
class ResponseGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'Response';
    public $languageTopics = array('simplecrm:default');
    public $defaultSortField = 'persons_name';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'simplecrm.response';

    public function prepareQueryBeforeCount(xPDOQuery $c) {

        $contactId = $this->getProperty('contactId');
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'Contact id: '.$contactId);


        if (!empty($contactId)) {
            $c->where(array(
                'contact_id' => $contactId
            ));
        }
        return $c;
    }
}
return 'ResponseGetListProcessor';