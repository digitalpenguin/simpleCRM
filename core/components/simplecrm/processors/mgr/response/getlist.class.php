<?php
class ResponseGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'Response';
    public $languageTopics = array('simplecrm:default');
    public $defaultSortField = 'persons_name';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'simplecrm.response';

    /*public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'name:LIKE' => '%'.$query.'%',
                'OR:description:LIKE' => '%'.$query.'%',
            ));
        }
        return $c;
    }*/
}
return 'ResponseGetListProcessor';