Ext.onReady(function() {
    MODx.load({ xtype: 'simplecrm-page-home'});
});

SimpleCRM.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'simplecrm-panel-home'
            ,renderTo: 'simplecrm-panel-home-div'
        }]
    });
    SimpleCRM.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.page.Home,MODx.Component);
Ext.reg('simplecrm-page-home',SimpleCRM.page.Home);