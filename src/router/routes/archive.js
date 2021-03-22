export default [
  // START - Import
  {
    path: '/archive/importList',
    name: 'archive-importList',
    component: () => import('@/views/archive/import/ArchiveImportList.vue'),
  },
  {
    path: '/archive/importAddNew',
    name: 'archive-importAddNew',
    component: () => import('@/views/archive/import/ArchiveImportComponent/ArchiveImportAddNew.vue'),
  },
  {
    path: '/archive/importUpdate',
    name: 'archive-importUpdate',
    component: () => import('@/views/archive/import/ArchiveImportComponent/ArchiveImportUpdate.vue'),
  },
  // END - Import

  // START - Export
  {
    path: '/archive/exportList',
    name: 'archive-exportList',
    component: () => import('@/views/archive/export/ArchiveExportList.vue'),
  },
  {
    path: '/archive/exportAddNew',
    name: 'archive-exportAddNew',
    component: () => import('@/views/archive/export/ArchiveExportComponent/ExportAddNew.vue'),
  },
  {
    path: '/archive/exportUpdate',
    name: 'archive-exportUpdate',
    component: () => import('@/views/archive/export/ArchiveExportComponent/ExportUpdate.vue'),
  },
  // END - Export
]
