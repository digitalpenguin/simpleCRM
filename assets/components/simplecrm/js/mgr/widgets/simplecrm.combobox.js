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

SimpleCRM.combo.Region = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['type','display']
            ,data: [
                [0,'Hong Kong Island']
                ,[1,'Kowloon']
                ,[2,'New Territories']
                ,[3,'Outlying Islands']
            ]
        })
        ,mode: 'local'
        ,displayField: 'display'
        ,valueField: 'type'
    });
    SimpleCRM.combo.Region.superclass.constructor.call(this,config);
};
Ext.extend(SimpleCRM.combo.Region,MODx.combo.ComboBox);
Ext.reg('simplecrm-combo-region',SimpleCRM.combo.Region);