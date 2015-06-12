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
    replaceGridWithContactPanel: function(grid, row, contactId) {
        if (!Ext.getCmp('simplecrm-panel-contact')) { // stop double clicks
            var tabs = Ext.getCmp('top-tabs');
            var activeTab = tabs.getActiveTab();
            var contactGrid = Ext.getCmp('simplecrm-grid-contacts');
            var contactGridHeader = Ext.getCmp('simplecrm-grid-contacts-header');
            contactGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration:.3,
                remove: true,
                useDisplay: true
            });


            var contactPanel = new SimpleCRM.panel.Contact;
            contactPanel.passContactId(contactId); // pass id of selected contact
            var slideContactPanelIn = new Ext.util.DelayedTask(function(){ // define delay
                contactGridHeader.update(
                '<h3>'+ row.get('name')+' - Contact Details</h3>' +
                '<p>'+ 'Here is a description for the panel' +'</p>');
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
            //do nothing here (to stop more than one grid loading)
        }
    },backToContactGrid: function() {
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
            }).refresh();
            contactPanel.destroy();
        });
        slideContactPanelOut.delay(350); // keep delay slightly longer than effect
    }
});
Ext.reg('simplecrm-panel-home',SimpleCRM.panel.Home);