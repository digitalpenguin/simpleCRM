SimpleCRM.grid.Responses = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'simplecrm-grid-responses'
        ,url: SimpleCRM.config.connectorUrl
        ,baseParams: {action: 'mgr/contact/getList'}
        ,fields: ['id','contact_id','persons_name','position','method_of_contact','number_called','time_of_contact','followup_time','editedby', 'createdby', 'menu']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,columns: [{
            header: 'Contact Name'
            ,dataIndex: 'persons_name'
            ,sortable: true
            ,width: 50
        },{
            header: 'Position'
            ,dataIndex: 'position'
            ,sortable: true
            ,width: 50
        },{
            header: 'Method of Contact'
            ,dataIndex: 'method_of_contact'
            ,sortable: true
            ,width: 50
        },{
            header: 'Number Called'
            ,dataIndex: 'number_called'
            ,sortable: true
            ,width: 50
        },{
            header: 'Time of Contact'
            ,dataIndex: 'time_of_contact'
            ,sortable: true
            ,width: 50
        },{
            header: 'Follow Up Time'
            ,dataIndex: 'followup_time'
            ,sortable: true
            ,width: 50
        }]
    });
};
Ext.extend(SimpleCRM.grid.Responses,MODx.grid.Grid);
Ext.reg('simplecrm-grid-responses',SimpleCRM.grid.Responses);