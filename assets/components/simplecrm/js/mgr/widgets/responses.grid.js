SimpleCRM.grid.Responses = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'simplecrm-grid-responses'
        ,url: SimpleCRM.config.connectorUrl
        ,fields: ['id','contact_id','persons_name','position','method_of_contact','number_called','time_of_contact','followup_time','editedby','createdby','menu']
        ,paging: true
        ,remoteSort: true
        ,anchor:'98%'
        ,save_action: 'mgr/response/updatefromgrid'
        ,autosave: true
        ,columns: [{
            header: 'Contact Name'
            ,dataIndex: 'persons_name'
            ,sortable: true
            ,width: 1
            ,editor: { xtype: 'textfield' }
        },{
            header: 'Position'
            ,dataIndex: 'position'
            ,sortable: true
            ,width: 1
            ,editor: { xtype: 'textfield' }
        },{
            header: 'Method of Contact'
            ,dataIndex: 'method_of_contact'
            ,sortable: true
            ,width: 1
            ,editor: { xtype: 'textfield' }
        },{
            header: 'Number Called'
            ,dataIndex: 'number_called'
            ,sortable: true
            ,width: 1
            ,editor: { xtype: 'textfield' }
        },{
            header: 'Time of Contact'
            ,dataIndex: 'time_of_contact'
            ,sortable: true
            ,width: 1
            ,editor: { xtype: 'xdatetime' }
        },{
            header: 'Follow Up Time'
            ,dataIndex: 'followup_time'
            ,sortable: true
            ,width: 1
            ,editor: { xtype: 'xdatetime' }
        }]
        ,tbar:[{
            text: 'Log Contact Response'
            ,handler: this.createResponse
            ,scope: this
        }]
    });
    SimpleCRM.grid.Responses.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.grid.Responses,MODx.grid.Grid,{
    windows: {}
    ,search: function (tf, nv, ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }, clearFilter: function () {
        this.getStore().baseParams = {
            action: 'mgr/response/getList'
        };
        Ext.getCmp('response-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        var m = [];
        m.push({
            text: 'Update Response'
            ,handler: this.updateResponse
        });
        m.push('-');
        m.push({
            text: 'Remove Response'
            ,handler: this.removeResponse
        });
        this.addContextMenuItem(m);
    },createResponse: function(btn,e) {
        this.createUpdateResponse(btn, e, false);
    },updateResponse: function(btn,e) {
        this.createUpdateResponse(btn, e, true);
    },createUpdateResponse: function(btn, e, isUpdate) {
        var r;
        if(isUpdate){
            if (!this.menu.record || !this.menu.record.id) return false;
            r = this.menu.record;
        }else{
            r = {};
        }
        this.windows.createUpdateResponse = MODx.load({
            xtype: 'simplecrm-window-response-create-update'
            ,isUpdate: isUpdate
            ,title: (isUpdate) ?  'Update Response' : 'Create Response'
            ,record: r
            ,listeners: {
                'success': {fn:function() { this.refresh(); },scope:this}
            }
        });
        this.windows.createUpdateResponse.fp.getForm().reset();
        this.windows.createUpdateResponse.fp.getForm().setValues(r);
        this.windows.createUpdateResponse.show(e.target);
    },removeResponse: function(btn,e) {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: 'Remove Response'
            ,text: 'Are you sure you want to remove this response? It will be be lost forever in the wasteland!'
            ,url: this.config.url
            ,params: {
                action: 'mgr/response/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }
});
Ext.reg('simplecrm-grid-responses',SimpleCRM.grid.Responses);

SimpleCRM.window.CreateUpdateResponse = function(config) {
    config = config || {};
    this.contactId = Ext.getCmp('simplecrm-panel-contact').getForm().getValues().id;
    this.ident = config.ident || 'response-window'+Ext.id();
    Ext.applyIf(config, {
        id: this.ident
        ,url: SimpleCRM.config.connectorUrl
        ,baseParams: {
            action: (config.isUpdate)? 'mgr/response/update':'mgr/response/create'
            ,contactId: this.contactId
        }
        ,closeAction: 'close'
        ,fields: [{
            xtype:'textfield'
            ,name:'id'
            ,id: this.ident+'-id'
            ,hidden:true
        },{
            xtype:'hidden'
            ,name:'contact_id'
        },{
            xtype:'textfield'
            ,fieldLabel: 'Person\'s Name'
            ,name:'persons_name'
            ,id: this.ident+'-name'
            ,anchor: '100%'
        },{
            xtype:'textfield'
            ,fieldLabel: 'Position'
            ,name:'position'
            ,id: this.ident+'-position'
            ,anchor: '100%'
        },{
            xtype:'numberfield'
            ,fieldLabel: 'Method of Contact'
            ,name:'method_of_contact'
            ,id: this.ident+'-method'
            ,anchor: '100%'
        },{
            xtype:'textfield'
            ,fieldLabel: 'Number Called'
            ,name:'number_called'
            ,id: this.ident+'-numbercalled'
            ,anchor: '100%'
        },{
            xtype:'xdatetime'
            ,fieldLabel: 'Time of Contact'
            ,name:'time_of_contact'
            ,id: this.ident+'-timeofcontact'
            ,anchor: '100%'
        },{
            xtype:'xdatetime'
            ,fieldLabel: 'Follow Up Time'
            ,name:'followup_time'
            ,id: this.ident+'-fuptime'
            ,anchor: '100%'
        }]
    });
    SimpleCRM.window.CreateUpdateResponse.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.window.CreateUpdateResponse,MODx.Window);
Ext.reg('simplecrm-window-response-create-update',SimpleCRM.window.CreateUpdateResponse);