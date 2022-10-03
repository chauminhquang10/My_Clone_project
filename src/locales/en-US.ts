import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pages from './en-US/pages';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import common from './en-US/common';
import unitTable from './en-US/UnitTable/table';
import unitForm from './en-US/UnitTable/forms/form';
import unitDetail from './en-US/UnitTable/forms/detailDrawer';
import roleGroupTable from './en-US/GroupAuthorizeTable/table';
import roleGroupForm from './en-US/GroupAuthorizeTable/forms/form';
import roleGroupDetail from './en-US/GroupAuthorizeTable/forms/detailDrawer';
import configMachineTable from './en-US/ConfigMachineTable/table';
import configMachineForm from './en-US/ConfigMachineTable/forms/form';
import configMachineDetail from './en-US/ConfigMachineTable/forms/detailDrawer';
import historyListTable from './en-US/HistoryList/tables';
import historyList from './en-US/HistoryList/index';
import userTable from './en-US/UserTable/index';
import userTableColumn from './en-US/UserTable/tables';
import userTableDetailHeader from './en-US/UserTable/Detail/Header';
import userTableDetailUserInfo from './en-US/UserTable/Detail/UserInfoRow';
import userTableForm from './en-US/UserTable/forms/index';
import stmError from './en-US/stmError';
import MachineTable from './en-US/MachineTable';
import UpdateVersionTable from './en-US/UpdateVersionTable/table';
import UpdateVersionForm from './en-US/UpdateVersionTable/form';

export default {
  navBar_language: 'EN',
  navBar_languageIcon: '🇺🇸',

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
  ...historyListTable,
  ...historyList,
  ...userTable,
  ...userTableColumn,
  ...userTableDetailHeader,
  ...userTableDetailUserInfo,
  ...userTableForm,
  ...stmError,
  ...MachineTable,
  ...UpdateVersionTable,
  ...UpdateVersionForm,
};
