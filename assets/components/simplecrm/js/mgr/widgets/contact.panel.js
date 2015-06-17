SimpleCRM.panel.Contact = function(config) {

    config = config || {};
    config.update = false;
    Ext.apply(config,{
        border: false
        ,id: 'simplecrm-panel-contact'
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,layout: 'form'
        ,anchor: '90%'
        ,url: SimpleCRM.config.connectorUrl
        ,baseParams: {
            action: (config.update)? 'mgr/contact/update':'mgr/contact/create'
        }
        ,listeners: {
            'render': {fn:function(){
                this.setup();
            },scope:this}
        }
        ,items: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'container'
            ,layout:'hbox'
            ,align:'stretch'
            ,defaults: {
                labelWidth:120
            }
            ,items:[{
                xtype:'container'
                ,layout:'form'
                ,flex:1
                ,style:'padding:20px;'
                ,items:[{
                    xtype: 'textfield'
                    ,fieldLabel: 'Name'
                    ,name: 'name'
                    ,anchor: '100%'
                },{
                    fieldLabel:'Contacted'
                    ,xtype: 'container'
                    ,defaultType: 'radio'
                    ,anchor: '100%;'
                    ,flex:1
                    ,items: [{
                        boxLabel:'Yes'
                        ,checked: false
                        ,name:'contacted'
                        ,inputValue:1
                    },{
                        boxLabel:'No'
                        ,checked: true
                        ,name:'contacted'
                        ,inputValue:0
                    }]
                },{
                    xtype: 'textarea'
                    ,fieldLabel: 'Description'
                    ,name: 'description'
                    ,anchor: '100%'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: 'Street Address'
                    ,name: 'address_1'
                    ,anchor: '100%'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: 'Suburb'
                    ,name: 'address_2'
                    ,anchor: '100%'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: 'Region'
                    ,name: 'address_3'
                    ,anchor: '100%'
                },{
                    xtype: 'simplecrm-combo-schooltype'
                    ,fieldLabel: 'School Type'
                    ,name: 'school_type'
                    ,hiddenName: 'school_type'
                    ,anchor: '100%'
                }]
            },{
                xtype:'container'
                ,layout:'form'
                ,flex:1
                ,style:'padding:20px;'
                ,items:[{
                    xtype:'textfield'
                    ,fieldLabel:'Website'
                    ,name:'website'
                    ,anchor:'100%'
                },{
                    xtype:'textfield'
                    ,fieldLabel:'Contact Name'
                    ,name:'contact_name'
                    ,anchor:'100%'
                },{
                    xtype:'textfield'
                    ,fieldLabel:'Phone Number'
                    ,name:'phone_1'
                    ,anchor:'100%'
                },{
                    xtype:'textfield'
                    ,fieldLabel:'Phone Number 2'
                    ,name:'phone_2'
                    ,anchor:'100%'
                },{
                    xtype:'textfield'
                    ,fieldLabel:'Year Established'
                    ,name:'year_established'
                    ,anchor:'100%'
                },{
                    xtype:'textarea'
                    ,fieldLabel:'Extra Information'
                    ,name:'extra_info'
                    ,anchor:'100%'
                }]
            }]
        }]
        ,tbar:[{
            text: 'Back to Contact List'
            ,xtype: 'button'
            ,id: 'back-to-grid-button'
            ,listeners: {
                'click': {fn: this.backToContactGrid, scope:this}
            }
        },{
            xtype: 'modx-actionbuttons'
            ,items:[{
                xtype:'button'
                ,text: 'Save'
                ,listeners: {
                    'click': {fn: this.saveContact, scope:this}
                }
            }, {
                xtype:'button'
                ,text:'Apply Changes'
                ,listeners: {
                    'click': {fn:this.applyChanges, scope:this}
                }
            },{
                xtype:'button'
                ,text: 'Close'
                ,listeners: {
                    'click': {fn: this.backToContactGrid, scope:this}
                }
            }]
        }]
    });
    SimpleCRM.panel.Contact.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.panel.Contact,MODx.FormPanel,{
    passContactId: function(contactId) {
        this.config.contactId = contactId;
    },setIsUpdate: function(){
        this.config.update = true;
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
    },saveContact: function() {
        this.submit();
        this.backToContactGrid();
    },applyChanges: function() {
        this.submit();
        this.refresh();
        Ext.getCmp('simplecrm-grid-contacts-header').refresh();
    }
});
Ext.reg('simplecrm-panel-contact',SimpleCRM.panel.Contact);