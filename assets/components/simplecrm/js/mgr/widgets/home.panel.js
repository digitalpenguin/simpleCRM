SimpleCRM.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,id: 'simplecrm-panel-home'
        ,baseCls: 'modx-formpanel'
        ,useLoadingMask: true
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('simplecrm.management')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,id: 'top-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,items: [{
                title: _('simplecrm.contacts')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('simplecrm.management_desc')+'</p>'
                    ,id: 'simplecrm-grid-contacts-header'
                    ,border: false
                    ,style: 'margin:20px 0 0 20px;'
                },{
                    xtype: 'simplecrm-grid-contacts'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                    ,flex: 1
                 }]
            }]
            // only to redo the grid layout after the content is rendered
            // to fix overflow components' panels, especially when scroll bar is shown up
            ,listeners: {
                'afterrender': function(tabPanel) {
                    tabPanel.doLayout();
                }
            }
        }]
    });
    SimpleCRM.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.panel.Home,MODx.Panel, {
    loadContactPanel: function(grid, row, isUpdate) {
        if (!Ext.getCmp('simplecrm-panel-contact')) { // stop double clicks

            var tabs = Ext.getCmp('top-tabs');
            var activeTab = tabs.getActiveTab();
            var contactGrid = Ext.getCmp('simplecrm-grid-contacts');
            var contactGridHeader = Ext.getCmp('simplecrm-grid-contacts-header');
            contactGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration: .3,
                remove: true,
                useDisplay: true
            });

            if (!isUpdate) {
                row = {};
            }

            var contactPanel = MODx.load({
                xtype: 'simplecrm-panel-contact'
                , isUpdate: isUpdate
                , title: (isUpdate) ? 'Update Contact' : 'Create New Contact'
                , record: row
            });
            contactPanel.getForm().setValues(row.data);
            console.log(row.data);

            /**
             * If not an update we won't set the contactId in the base params as there isn't one yet
             */
            var responseGrid;
            if (isUpdate) {
                responseGrid = MODx.load({
                    xtype: 'simplecrm-grid-responses'
                    , baseParams: {
                        action: 'mgr/response/getList'
                        , contactId: row.data.id
                    }
                });
                contactPanel.add(responseGrid);
            }
            var slideContactPanelIn = new Ext.util.DelayedTask(function(){ // define delay
                if(isUpdate) {
                    contactGridHeader.update(
                        '<h3>'+ row.get('name')+' - Contact Details</h3>' +
                        '<p>'+ row.get('description') +'</p>'+
                        '<p>Originally created by '+row.get('createdby_name')+' at '+ row.get('createdon')+'</p>'+
                        '<p>Last updated by '+row.get('editedby_name')+' at '+row.get('editedon')+'</p>');
                } else {
                    contactGridHeader.update(
                        '<h3>New Contact Details</h3>' +
                        '<p>Enter the details for the new contact here.</p>');
                }
                activeTab.add(contactPanel);
                activeTab.doLayout();
                contactPanel.getEl().slideIn('r', {
                    easing: 'easeIn',
                    duration:.3,
                    useDisplay: false
                });
            });
            slideContactPanelIn.delay(350); // keep delay slightly longer than effect
        } else {
            //do nothing here (to stop more than one inner panel loading)
        }
    },loadContactGrid: function() {
        var tabs = Ext.getCmp('top-tabs');
        var tab = tabs.getActiveTab();
        var contactPanel = Ext.getCmp('simplecrm-panel-contact');
        contactPanel.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });
        var contactGrid = Ext.getCmp('simplecrm-grid-contacts');
        var contactGridHeader = Ext.getCmp('simplecrm-grid-contacts-header');
        var slideContactPanelOut = new Ext.util.DelayedTask(function(){
            contactGridHeader.update('<p>'+_('simplecrm.management_desc')+'</p>');
            tab.remove(contactPanel);
            tab.add(contactGrid);
            tab.doLayout();
            contactGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                scope: this
            });
            contactPanel.destroy();

        });
        slideContactPanelOut.delay(350); // keep delay slightly longer than effect
        contactGrid.refresh();
    }
});
Ext.reg('simplecrm-panel-home',SimpleCRM.panel.Home);