SimpleCRM.grid.Contacts = function(config) {
    config = config || {};

    Ext.applyIf(config,{
        id: 'simplecrm-grid-contacts'
        ,url: SimpleCRM.config.connectorUrl
        ,baseParams: { action: 'mgr/contact/getList' }
        ,fields: ['id','name','school_type','address_1','address_2','address_3','website','phone_1','phone_2','description','year_established','product_offering','menu']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/contact/updateFromGrid'
        ,autosave: true
        ,listeners: {
            'rowclick': function(grid, index, rec){
                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelections()[0];
                    var contactId = row.get('id');
                }
                this.loadContactPanel(grid, row, contactId);
            }
        }
        ,columns: [{
            header: 'Contacted'
            ,dataIndex: 'contacted'
            ,sortable: true
            ,width: 50
            ,editor: { xtype: 'textfield' }
        },{
            header: _('simplecrm.name')
            ,dataIndex: 'name'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'textfield' }
        },{
            header: 'Location'
            ,dataIndex: 'address_3'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'textfield'}
        },{
            header: 'School Type'
            ,dataIndex: 'school_type'
            ,width: 100
            ,editor: { xtype: 'simplecrm-combo-schooltype' ,renderer: true}
        },{
            header: 'Website'
            ,dataIndex: 'website'
            ,width: 100
            ,editor: { xtype: 'textfield'}
        },{
            header: _('simplecrm.description')
            ,dataIndex: 'description'
            ,sortable: false
            ,width: 350
            ,editor: { xtype: 'textfield' }
        }],tbar:[{
            text: _('simplecrm.contact_create')
            ,handler: this.createContact
        },'->',{
            xtype: 'textfield'
            ,id: 'contacts-search-filter'
            ,emptyText: _('simplecrm.search...')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            xtype: 'button'
            ,id: 'contacts-filter-clear'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
        ,getMenu: function() {
            return [{
                text: _('simplecrm.contact_update')
                ,handler: this.updateContact
            },'-',{
                text: _('simplecrm.contact_remove')
                ,handler: this.removeContact
            }];

        }

    });
    SimpleCRM.grid.Contacts.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.grid.Contacts,MODx.grid.Grid, {
    search: function (tf, nv, ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }, clearFilter: function () {
        this.getStore().baseParams = {
            action: 'mgr/contact/getList'
        };
        Ext.getCmp('contacts-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },createContact: function(btn,e) {
        if (!this.createContactWindow) {
            this.createContactWindow = MODx.load({
                xtype: 'simplecrm-window-contact-create'
                ,blankValues: true
                ,listeners: {
                    'success': {fn:function() {
                        this.refresh();
                    },scope:this}
                }
            });
        }
        this.createContactWindow.show(e.target);
    },updateContact: function(btn,e) {
        if (!this.updateContactWindow) {
            this.updateContactWindow = MODx.load({
                xtype: 'simplecrm-window-contact-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateContactWindow.setValues(this.menu.record);
        this.updateContactWindow.show(e.target);
    },removeContact: function() {
        MODx.msg.confirm({
            title: _('simplecrm.contact_remove')
            ,text: _('simplecrm.contact_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/contact/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function() {
                    this.refresh();
                },scope:this}
            }
        });
    },loadContactPanel: function(grid, row, contactId) {
        Ext.getCmp('simplecrm-panel-home').replaceGridWithContactPanel(grid, row, contactId);
    }

});
Ext.reg('simplecrm-grid-contacts',SimpleCRM.grid.Contacts);


SimpleCRM.window.UpdateContact = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('simplecrm.contact_update')
        ,url: SimpleCRM.config.connectorUrl
        ,baseParams: {
            action: 'mgr/contact/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('simplecrm.name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textarea'
            ,fieldLabel: _('simplecrm.description')
            ,name: 'description'
            ,anchor: '100%'
        }]
    });
    SimpleCRM.window.UpdateContact.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.window.UpdateContact,MODx.Window);
Ext.reg('simplecrm-window-contact-update',SimpleCRM.window.UpdateContact);


SimpleCRM.window.CreateContact = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('simplecrm.contact_create')
        ,url: SimpleCRM.config.connectorUrl
        ,baseParams: {
            action: 'mgr/contact/create'
        }
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('simplecrm.name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Location'
            ,name: 'address_3'
            ,anchor: '100%'
        },{
            xtype: 'textarea'
            ,fieldLabel: _('simplecrm.description')
            ,name: 'description'
            ,anchor: '100%'
        },{
            xtype: 'simplecrm-combo-schooltype'
            ,fieldLabel: 'School Type'
            ,name: 'school_type'
            ,anchor: '100%'
        }]
    });
    SimpleCRM.window.CreateContact.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.window.CreateContact,MODx.Window);
Ext.reg('simplecrm-window-contact-create',SimpleCRM.window.CreateContact);


SimpleCRM.combo.SchoolType = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['type','display']
            ,data: [
                [0,'Kindergarten']
                ,[1,'Primary School']
                ,[2,'Learning Centre']
                ,[3,'Club House']
            ]
        })
        ,mode: 'local'
        ,displayField: 'display'
        ,valueField: 'type'
    });
    SimpleCRM.combo.SchoolType.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.combo.SchoolType,MODx.combo.ComboBox);
Ext.reg('simplecrm-combo-schooltype',SimpleCRM.combo.SchoolType);