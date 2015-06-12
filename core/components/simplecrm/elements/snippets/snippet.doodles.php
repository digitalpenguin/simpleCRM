<?php
$prospect = $modx->getService('simplecrm','SimpleCrm',$modx->getOption('simplecrm.core_path',null,$modx->getOption('core_path').'components/simplecrm/').'model/simplecrm/',$scriptProperties);
if (!($prospect instanceof SimpleCRM)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'rowTpl');
$sort = $modx->getOption('sort',$scriptProperties,'name');
$dir = $modx->getOption('dir',$scriptProperties,'ASC');

/* build query */
$c = $modx->newQuery('Prospect');
$c->sortby($sort,$dir);
$prospects = $modx->getCollection('Prospect',$c);

/* iterate */
$output = '';
foreach ($prospects as $aProspect) {
    $prospectArray = $aProspect->toArray();
    $output .= $prospect->getChunk($tpl,$prospectArray);
}

return $output;