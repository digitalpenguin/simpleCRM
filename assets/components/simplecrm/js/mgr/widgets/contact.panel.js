SimpleCRM.panel.Contact = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,id: 'simplecrm-panel-contact'
        ,baseCls: 'modx-formpanel'
        ,cls: 'container form-with-labels'
        ,layout: 'form'
        ,anchor: '90%'
        ,url: SimpleCRM.config.connectorUrl
        ,listeners: {
            'render': {fn:function(){
                this.setup();
            },scope:this}
        }
        ,items: [{
            text: 'Back to Contact List'
            ,xtype: 'button'
            ,id: 'back-to-grid-button'
            ,listeners: {
                'click': {fn: this.backToContactGrid, scope:this}
            }
        },{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Name'
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textarea'
            ,fieldLabel: 'Description'
            ,name: 'description'
            ,anchor: '100%'
        },{
            xtype: 'modx-actionbuttons'
        }]
    });
    SimpleCRM.panel.Contact.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.panel.Contact,MODx.FormPanel,{
    passContactId: function(contactId) {
        this.config.contactId = contactId;
    },setup: function() {
        MODx.Ajax.request({
            url: this.config.url
            ,params: {
                action: 'mgr/contact/get'
                ,id: this.config.contactId
            },
            listeners: {
                'success': {
                    fn: function(r) {
                        this.getForm().setValues(r.object);
                        this.fireEvent('ready', r.object);
                        MODx.fireEvent('ready');
                    },
                    scope: this
                }
            }
        });
    },backToContactGrid: function() {
        Ext.getCmp('simplecrm-panel-home').backToContactGrid();
    }
});
Ext.reg('simplecrm-panel-contact',SimpleCRM.panel.Contact);

/*SimpleCRM.toolbar.Contact = function(config) {
    config = config || {};
    Ext.apply(config,{

    });
};
Ext.extend(SimpleCRM.toolbar.Contact,MODx.toolbar);
Ext.reg('simplecrm-toolbar-contact',SimpleCRM.toolbar.Contact);*/