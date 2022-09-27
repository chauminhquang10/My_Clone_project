import component from './vi-VN/component';
import globalHeader from './vi-VN/globalHeader';
import menu from './vi-VN/menu';
import pages from './vi-VN/pages';
import pwa from './vi-VN/pwa';
import settingDrawer from './vi-VN/settingDrawer';
import settings from './vi-VN/settings';
import common from './vi-VN/common';
import unitTable from './vi-VN/UnitTable/table';
import unitForm from './vi-VN/UnitTable/forms/form';
import unitDetail from './vi-VN/UnitTable/forms/detailDrawer';
import roleGroupTable from './vi-VN/GroupAuthorizeTable/table';
import roleGroupForm from './vi-VN/GroupAuthorizeTable/forms/form';
import roleGroupDetail from './vi-VN/GroupAuthorizeTable/forms/detailDrawer';
import configMachineTable from './vi-VN/ConfigMachineTable/table';
import configMachineForm from './vi-VN/ConfigMachineTable/forms/form';
import configMachineDetail from './vi-VN/ConfigMachineTable/forms/detailDrawer';

export default {
  navBar_language: 'VI',
  navBar_languageIcon: '🇻🇳',

  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
  ...common,
  ...unitTable,
  ...unitForm,
  ...unitDetail,
  ...roleGroupTable,
  ...roleGroupForm,
  ...roleGroupDetail,
  ...configMachineTable,
  ...configMachineForm,
  ...configMachineDetail,
};
