export default [
  {
    title: 'Warehouse',
    icon: 'ArchiveIcon',
    tag: '5',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Input',
        route: 'warehouses-input',
        icon: 'SkipBackIcon',
        resource: 'WarehousesInput',
      },
      {
        title: 'Output',
        route: 'warehouses-output',
        icon: 'SkipForwardIcon',
        resource: 'WarehousesOutput',
      },
      {
        title: 'Inventory',
        route: 'warehouses-inventory',
        icon: 'FileTextIcon',
        resource: 'WarehousesInventory',
      },
      {
        title: 'ExchangeGoods',
        route: 'warehouses-exchange-damaged-goods',
        icon: 'RepeatIcon',
        resource: 'WarehousesExchangeDamagedGoods',
      },
      {
        title: 'Combo',
        route: 'warehouses-combo',
        icon: 'LayersIcon',
        resource: 'WarehousesCombo',
      },
    ],
  },

]
