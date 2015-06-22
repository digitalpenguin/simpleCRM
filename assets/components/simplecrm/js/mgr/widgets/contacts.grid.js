SimpleCRM.grid.Contacts = function(config) {
    config = config || {};

    Ext.applyIf(config,{
        id: 'simplecrm-grid-contacts'
        ,url: SimpleCRM.config.connectorUrl
        ,baseParams: { action: 'mgr/contact/getList' }
        ,fields: ['id','contacted','name','school_type','address_1','address_2','address_3','website','phone_1','phone_2','description','year_established','product_offering','extra_info','editedby','editedby_name','editedon','createdby','createdby_name','createdon','menu']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,listeners: {
            'rowclick': function(grid, index, rec){
                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelections()[0];
                }
                this.loadUpdateContactPanel(grid, row);
            }
        }
        ,columns: [{
            header: 'Contacted'
            ,dataIndex: 'contacted'
            ,align:'center'
            ,sortable: true
            ,width: 50
            ,renderer: function(value){
                var active = value ? 'greentick.png' : 'redcross.png';
                return '<img src="' + SimpleCRM.config.cssUrl + '/img/' + active + '" >';
            }
        },{
            header: _('simplecrm.name')
            ,dataIndex: 'name'
            ,sortable: true
            ,width: 100
        },{
            header: 'Location'
            ,dataIndex: 'address_3'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'simplecrm-combo-region' ,renderer: true}
        },{
            header: 'School Type'
            ,dataIndex: 'school_type'
            ,width: 100
            ,editor: { xtype: 'simplecrm-combo-schooltype' ,renderer: true}
        },{
            header: 'Website'
            ,dataIndex: 'website'
            ,width: 100
        },{
            header: _('simplecrm.description')
            ,dataIndex: 'description'
            ,sortable: false
            ,width: 350
        }],tbar:[{
            text: _('simplecrm.contact_create')
            ,handler: this.loadCreateContactPanel
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
    },loadUpdateContactPanel: function(grid, row) {
        Ext.getCmp('simplecrm-panel-home').loadContactPanel(grid, row, true);
    },loadCreateContactPanel: function() {
        var row = {};
        Ext.getCmp('simplecrm-panel-home').loadContactPanel(this, row, false);
    }

});
Ext.reg('simplecrm-grid-contacts',SimpleCRM.grid.Contacts);