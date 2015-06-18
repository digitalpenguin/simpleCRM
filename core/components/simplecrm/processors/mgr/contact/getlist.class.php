<?php
class ContactGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'Contact';
    public $languageTopics = array('simplecrm:default');
    public $defaultSortField = 'name';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'simplecrm.contact';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'name:LIKE' => '%'.$query.'%',
                'OR:description:LIKE' => '%'.$query.'%',
            ));
        }
        return $c;
    }

    /*public function beforeIteration(array $list) {
        $rows = array();
        foreach ($list as $row){
            $row['createdby'] = $this->getUserName($row['createdby']);
            $row['editedby'] = $this->getUserName($row['editedby']);
            $rows[] = $row;
        }
        return $rows;
    }

    private function getUserName($userId) {
        $profile = $this->modx->getObject('modUserProfile', array('internalKey' => $userId));
        $fullName = $profile->get('fullname');
        return $fullName;
    }*/

}
return 'ContactGetListProcessor';