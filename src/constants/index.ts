export const USER_MESSAGE_ERROR = {
  '104': 'Tài khoản không tồn tại',
  '105': 'Mật khẩu không đúng',
  '110': 'Tài khoản đang vô hiệu hóa',
  '111': 'Mật khẩu không đúng',
  '112': 'Tài khoản lần đầu đăng nhập, vui lòng thiết lập mật khẩu',
};
export const MAX_LOGIN_TIMES = 3;
export const BLOCK_TIME = 30 * 60000;
export const ERROR_CODE = {
  1: 'Failed',
  2: 'Common Error',
  3: 'Invalid param',
  4: 'Invalid session',
  5: 'Unhandled request',
  6: 'Invalid refresh token',
  7: 'Invalid date format',
  8: 'Invalid token',
  9: 'Expired token',
  10: 'Access denied. User cannot access this function',
  11: 'Current password is incorrect',
  12: 'File type is not support',
  100: 'Existed email',
  101: 'Existed phone',
  102: 'OTP was expired',
  103: 'Account did not link',
  104: 'user Not found',
  105: 'Login failed',
  106: "User's staff Id existed",
  107: "User's email existed",
  108: "User's phone number existed",
  109: 'Management user existed',
  110: 'User is inactive',
  111: 'User is blocked',
  112: 'First time login. Reset password required',
  113: 'Create new management user failed',
  114: "Duplicate user management's staff ID in request",
  115: "Duplicate user management's email in request",
  116: "Duplicate user management's phone number in request",
  117: 'internal error. Update user failed',
  118: 'User is system admin',
  301: 'Machine not found',
  302: 'Machine model not found',
  303: 'Management unit not found',
  304: 'User not in management unit',
  305: 'Duplicated terminal ID',
  306: 'Duplicated IP address',
  307: 'Duplicated serial number',
  308: 'Duplicated mac address',
  309: 'Denomination not found',
  310: 'Device not found',
  311: "Physical device's status not found",
  312: 'STM model existed',
  313: 'Invalid machine type',
  314: 'Invalid denomination rule',
  315: 'Waiting to update status from machine',
  316: 'STM was not connected',
  317: "Invalid machine's status",
  318: 'Machine model is not included in machine type',
  319: 'Min capacity must be greater than 0',
  320: "The date must be after machine's created date and one day earlier than today",
  321: "The date must be after machine's created date and earlier or equal today",
  322: 'User can not access this machine',
  323: "Can't remove machine model. There is one or more machines in this model",
  401: 'Province not found',
  402: 'District not found',
  403: 'Ward not found',
  404: "Location must be 'north' || 'south' || 'middle'",
  500: 'File extension must be .exe or .jar',
  501: 'Upload file failed',
  502: 'Uploaded file is required',
  503: 'Invalid condition',
  504: 'A version with requested name existed',
  505: 'Execute time must be after current time',
  506: 'Version not found',
  507: 'Request failed. Version was updated for machine(s)',
  508: 'Version not suitable for the machine',
  509: 'Version has been updated for the device',
  600: 'Role group existed',
  601: 'Role group not found',
  602: 'Role not found',
  603: "Invalid role group's status",
  604: 'Role action not found',
  605: 'Role groups must contain at least one role action',
  606: "Can't remove role group. There is one or more users owning this role group",
  700: 'Management unit existed',
  701: "Can't not remove management unit. This unit current includes users or machines",
};

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const MAP_ROLE_LIST = {
  machine: 'Machine management',
  version: 'Version management',
  model: 'Model management',
  management_unit: 'Management unit management',
};

export const MAP_ACTION_LIST = {
  create_machine: 'Create machine',
  update_machine: 'Update machine',
  assign_access: 'Assign access',
  change_machine_status: 'Change machine status',
  download_machine_log: 'Download machine log',
  view_transaction: 'View transaction',
  view_camera: 'View camrea',
  create_version: 'Create version',
  update_version: 'Update version',
  update_machine_version: 'Update machine version',
  delete_version: 'Delete version',
  create_model: 'Create model',
  update_model: 'Update model',
  delete_model: 'Delete model',
  create_management_unit: 'Create management unit',
  update_management_unit: 'Update management unit',
  delete_management_unit: 'Delete management unit',
};
