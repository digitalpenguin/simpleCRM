var SimpleCRM = function(config) {
    config = config || {};
    SimpleCRM.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
});
Ext.reg('simplecrm',SimpleCRM);
SimpleCRM = new SimpleCRM();