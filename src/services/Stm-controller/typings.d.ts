declare namespace API {
  type AccessTokenResponseCustom = {
    otherClaims?: Record<string, any>;
    token?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
    refreshToken?: string;
    tokenType?: string;
    idToken?: string;
    notBeforePolicy?: number;
    sessionState?: string;
    scope?: string;
  };

  type AssignMachineRequest = {
    userId: string;
    machineIds: string[];
  };

  type AssignMachineResponse = {
    user?: UserResponse;
    machines?: StmInfoResponse[];
  };

  type blockUserParams = {
    userId: string;
  };

  type changeMachineStatusParams = {
    id: string;
    status: 'UNKNOWN' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'OFFLINE';
  };

  type ChangePasswordRequest = {
    currentPassword: string;
    newPassword: string;
  };

  type ChangePasswordResponse = {
    success?: boolean;
  };

  type checkMachineExistedParams = {
    key: string;
    value: string;
  };

  type CheckMachineExistResponse = {
    existed?: boolean;
  };

  type checkUserExistedParams = {
    key: string;
    value: string;
  };

  type CheckUserExistResponse = {
    existed?: boolean;
  };

  type CreateManagementUnitRequest = {
    code: string;
    name: string;
    location: string;
    provinceId: number;
    districtId: number;
    wardId: number;
    address: string;
  };

  type CreateRoleGroupRequest = {
    name: string;
    actionIds: number[];
  };

  type CreateStmModelRequest = {
    name: string;
    /** Values: STM | ATM | CDM */
    machineType: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    storages: StorageItemRequest[];
  };

  type CreateStmRequest = {
    /** Values: STM | ATM | CDM */
    machineType: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    machineName: string;
    terminalId: string;
    masterKey: string;
    modelId: number;
    serialNumber: string;
    privateKey: string;
    accountingAccountVND?: string;
    accountingAccountUSD?: string;
    /** Values: MINIMUM_NOTES | EQUAL_EMPTYING | MAXIMUM_NOTES */
    denominationRule?: 'MINIMUM_NOTES' | 'EQUAL_EMPTYING' | 'MAXIMUM_NOTES';
    denominations: number[];
    gate?: number;
    ipAddress: string;
    acquirerId?: string;
    /** Values: KEY_3DES */
    keyType?: 'KEY_3DES';
    /** Values: NDC */
    protocol?: 'NDC';
    mac?: string;
    managementUnitId: number;
    userIds?: string[];
    location: string;
    provinceId: number;
    districtId: number;
    wardId: number;
    address: string;
    latitude?: number;
    longitude?: number;
    note?: string;
  };

  type CreateUserRequest = {
    avatar?: string;
    staffId: string;
    name: string;
    email: string;
    phoneNumber: string;
    managementUnitId: number;
    roleGroupId: number;
  };

  type CreateVersionRequest = {
    modelId: number;
    name: string;
    file: string;
    content: string;
    condition?: string;
  };

  type Denomination = {
    id?: number;
    name?: string;
    value?: number;
    currency?: 'VND' | 'USD' | 'CNY' | 'LAK';
  };

  type District = {
    id?: number;
    name?: string;
  };

  type getAllUsersParams = {
    managementUnit?: string;
    staffId?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getAllVersionParams = {
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    modelId?: number;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getDistrictsParams = {
    provinceId: number;
  };

  type GetListDistrictResponse = {
    districts?: District[];
  };

  type getListMachinesParams = {
    location?: string;
    provinceId?: number;
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    status?: 'UNKNOWN' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'OFFLINE';
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getListModelsParams = {
    machineType: string;
  };

  type GetListProvinceResponse = {
    provinces?: Province[];
  };

  type GetListWardResponse = {
    wards?: Ward[];
  };

  type getLogsParams = {
    machineId: string;
    date: string;
  };

  type getMachineDetailParams = {
    id: string;
  };

  type getManagementUnitParams = {
    unitId: string;
  };

  type getModelDetailParams = {
    modelId: string;
  };

  type getProvincesParams = {
    location: string;
  };

  type getRoleDetailParams = {
    groupId: string;
  };

  type getSystemOperationParams = {
    module?: 'MACHINE' | 'USER' | 'MODEL' | 'MANAGEMENT_UNIT' | 'VERSION';
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getTransactionsParams = {
    machineId: string;
    from?: string;
    to?: string;
  };

  type getUserParams = {
    userId: string;
  };

  type getVersionParams = {
    versionId: string;
  };

  type getWardsParams = {
    districtId: number;
  };

  type ListDenominationsResponse = {
    denominations?: Denomination[];
  };

  type ListManagementUnitResponse = {
    managementUnits?: ManagementUnitResponse[];
  };

  type ListRoleGroupResponse = {
    roleGroups?: RoleGroupResponse[];
  };

  type ListRolesResponse = {
    roles?: Role[];
  };

  type ListStmModelResponse = {
    models?: StmModelResponse[];
  };

  type ListTransactionsResponse = {
    transactions?: Transaction[];
  };

  type LoginRequest = {
    username: string;
    password: string;
  };

  type LogoutRequest = {
    refreshToken: string;
  };

  type LogoutResponse = {
    message?: string;
  };

  type MachineLogResponse = {
    date?: string;
    machine?: StmInfoResponse;
    url?: string;
  };

  type ManagementUnitDetailResponse = {
    id?: number;
    code?: string;
    name?: string;
    location?: string;
    province?: Province;
    district?: District;
    ward?: Ward;
    address?: string;
    createdAt?: string;
    users?: UserResponse[];
    machines?: StmInfoResponse[];
  };

  type ManagementUnitResponse = {
    id?: number;
    code?: string;
    name?: string;
    location?: string;
    province?: Province;
    district?: District;
    ward?: Ward;
    address?: string;
    createdAt?: string;
  };

  type PageResponseObject = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: Record<string, any>[];
  };

  type PhysicalDevice = {
    id?: number;
    name?: string;
    code?: string;
    unit?: 'CARD' | 'PAPER' | 'TIME' | 'UNKNOWN';
  };

  type PhysicalDeviceInfo = {
    count?: number;
    deviceType?: PhysicalDevice;
    physicalStatus?:
      | 'ONLINE'
      | 'OFFLINE'
      | 'POWER_OFF'
      | 'NO_DEVICE'
      | 'HARDWARE_ERROR'
      | 'USER_ERROR'
      | 'BUSY'
      | 'FRAUD_ATTEMPT'
      | 'UNKNOWN';
    storageStatus?:
      | 'OK'
      | 'FULL'
      | 'HIGH'
      | 'LOW'
      | 'EMPTY'
      | 'INOP'
      | 'NOVAL'
      | 'NOREF'
      | 'MANIP'
      | 'OUT'
      | 'JAMMED'
      | 'NOTSUPP'
      | 'UNKNOWN';
  };

  type PhysicalDevicesResponse = {
    devices?: PhysicalDevice[];
  };

  type Province = {
    id?: number;
    name?: string;
    location?: string;
  };

  type RefreshTokenRequest = {
    refreshToken: string;
  };

  type ResetPasswordRequest = {
    token: string;
    password: string;
  };

  type ResetPasswordResponse = {
    success?: boolean;
  };

  type ResponseBaseAccessTokenResponseCustom = {
    code?: number;
    message?: string;
    data?: AccessTokenResponseCustom;
  };

  type ResponseBaseAssignMachineResponse = {
    code?: number;
    message?: string;
    data?: AssignMachineResponse;
  };

  type ResponseBaseChangePasswordResponse = {
    code?: number;
    message?: string;
    data?: ChangePasswordResponse;
  };

  type ResponseBaseCheckMachineExistResponse = {
    code?: number;
    message?: string;
    data?: CheckMachineExistResponse;
  };

  type ResponseBaseCheckUserExistResponse = {
    code?: number;
    message?: string;
    data?: CheckUserExistResponse;
  };

  type ResponseBaseGetListDistrictResponse = {
    code?: number;
    message?: string;
    data?: GetListDistrictResponse;
  };

  type ResponseBaseGetListProvinceResponse = {
    code?: number;
    message?: string;
    data?: GetListProvinceResponse;
  };

  type ResponseBaseGetListWardResponse = {
    code?: number;
    message?: string;
    data?: GetListWardResponse;
  };

  type ResponseBaseListDenominationsResponse = {
    code?: number;
    message?: string;
    data?: ListDenominationsResponse;
  };

  type ResponseBaseListManagementUnitResponse = {
    code?: number;
    message?: string;
    data?: ListManagementUnitResponse;
  };

  type ResponseBaseListRoleGroupResponse = {
    code?: number;
    message?: string;
    data?: ListRoleGroupResponse;
  };

  type ResponseBaseListRolesResponse = {
    code?: number;
    message?: string;
    data?: ListRolesResponse;
  };

  type ResponseBaseListStmModelResponse = {
    code?: number;
    message?: string;
    data?: ListStmModelResponse;
  };

  type ResponseBaseListTransactionsResponse = {
    code?: number;
    message?: string;
    data?: ListTransactionsResponse;
  };

  type ResponseBaseLogoutResponse = {
    code?: number;
    message?: string;
    data?: LogoutResponse;
  };

  type ResponseBaseMachineLogResponse = {
    code?: number;
    message?: string;
    data?: MachineLogResponse;
  };

  type ResponseBaseManagementUnitDetailResponse = {
    code?: number;
    message?: string;
    data?: ManagementUnitDetailResponse;
  };

  type ResponseBaseManagementUnitResponse = {
    code?: number;
    message?: string;
    data?: ManagementUnitResponse;
  };

  type ResponseBasePageResponseObject = {
    code?: number;
    message?: string;
    data?: PageResponseObject;
  };

  type ResponseBasePhysicalDevicesResponse = {
    code?: number;
    message?: string;
    data?: PhysicalDevicesResponse;
  };

  type ResponseBaseResetPasswordResponse = {
    code?: number;
    message?: string;
    data?: ResetPasswordResponse;
  };

  type ResponseBaseRoleGroupResponse = {
    code?: number;
    message?: string;
    data?: RoleGroupResponse;
  };

  type ResponseBaseStmDetailResponse = {
    code?: number;
    message?: string;
    data?: StmDetailResponse;
  };

  type ResponseBaseStmInfoResponse = {
    code?: number;
    message?: string;
    data?: StmInfoResponse;
  };

  type ResponseBaseStmModelDetailResponse = {
    code?: number;
    message?: string;
    data?: StmModelDetailResponse;
  };

  type ResponseBaseUpdateMachineResponse = {
    code?: number;
    message?: string;
    data?: UpdateMachineResponse;
  };

  type ResponseBaseUserDetailResponse = {
    code?: number;
    message?: string;
    data?: UserDetailResponse;
  };

  type ResponseBaseUserResponse = {
    code?: number;
    message?: string;
    data?: UserResponse;
  };

  type ResponseBaseVersionResponse = {
    code?: number;
    message?: string;
    data?: VersionResponse;
  };

  type RestResponseObject = {
    data?: Record<string, any>;
    time?: string;
    status?: number;
    message?: string;
  };

  type Role = {
    id?: number;
    name?: string;
    actions?: RoleAction[];
  };

  type RoleAction = {
    id?: number;
    action?: string;
  };

  type RoleGroupResponse = {
    id?: number;
    name?: string;
    createdAt?: string;
    createdBy?: UserResponse;
    lastModifiedBy?: UserResponse;
    actions?: RoleAction[];
    users?: UserResponse[];
  };

  type StmDetailResponse = {
    id?: string;
    machineOrder?: number;
    /** Values: STM | ATM | CDM */
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    model?: StmModelResponse;
    name?: string;
    terminalId?: string;
    serialNumber?: string;
    privateKey?: string;
    gate?: number;
    ipAddress?: string;
    acquirerId?: string;
    /** Values: KEY_3DES */
    keyType?: 'KEY_3DES';
    /** Values: NDC */
    protocol?: 'NDC';
    masterKey?: string;
    mac?: string;
    accountingAccountVND?: string;
    accountingAccountUSD?: string;
    /** Values: MINIMUM_NOTES | EQUAL_EMPTYING | MAXIMUM_NOTES */
    denominationRule?: 'MINIMUM_NOTES' | 'EQUAL_EMPTYING' | 'MAXIMUM_NOTES';
    denominations?: number[];
    managementUnit?: ManagementUnitResponse;
    managementUsers?: UserResponse[];
    location?: string;
    province?: Province;
    district?: District;
    ward?: Ward;
    address?: string;
    latitude?: number;
    longitude?: number;
    currentVersion?: VersionResponse;
    latestVersion?: VersionResponse;
    autoUpdate?: boolean;
    createdAt?: string;
    /** Values: IN_SERVICE | OUT_OF_SERVICE | OFFLINE | DISCONNECTED */
    status?: 'UNKNOWN' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'OFFLINE';
    lastUptime?: string;
    driveHealth?: number;
    devices?: PhysicalDeviceInfo[];
  };

  type StmInfoResponse = {
    id?: string;
    machineOrder?: number;
    location?: string;
    province?: Province;
    /** Values: STM | ATM | CDM */
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    name?: string;
    terminalId?: string;
    /** Values: IN_SERVICE | OUT_OF_SERVICE | OFFLINE | DISCONNECTED */
    status?: 'UNKNOWN' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'OFFLINE';
    activity?: 'UNKNOWN' | 'MAINTAINING' | 'UPGRADE' | 'DISCONNECTED';
    ipAddress?: string;
  };

  type StmModelDetailResponse = {
    id?: number;
    name?: string;
    storages?: StorageItem[];
  };

  type StmModelResponse = {
    id?: number;
    name?: string;
  };

  type StorageItem = {
    deviceType?: PhysicalDevice;
    minCapacity?: number;
  };

  type StorageItemRequest = {
    deviceTypeId: number;
    minCapacity?: number;
  };

  type Transaction = {
    id?: string;
    cardNumber?: string;
    accountNumber?: string;
    customerName?: string;
    amount?: number;
    type?:
      | 'UNKNOWN'
      | 'CARD_WITHDRAW'
      | 'QR_WITHDRAW'
      | 'FINGER_WITHDRAW'
      | 'CARD_DEPOSIT'
      | 'PIN_CHANGE'
      | 'CARD_SHOW_BALANCE'
      | 'TRANSFER'
      | 'REGISTER'
      | 'OPERATION'
      | 'CARD_LOGIN'
      | 'QR_OPEN_CARD';
    status?: 'UNKNOWN' | 'SUCCESS' | 'FAIL' | 'PROCESSING' | 'NEXT';
    error?:
      | 'UNKNOWN'
      | 'TRANSACTION_NOT_AVAILABLE'
      | 'TRANSACTION_FAILED'
      | 'CARD_INVALID'
      | 'CARD_EXPIRED'
      | 'CARD_NON_ACTIVE'
      | 'PIN_INVALID'
      | 'AMOUNT_ENTER_INVALID'
      | 'RECEIPT_FAILED'
      | 'RECEIPT_NOT_AVAILABLE'
      | 'COMMAND_INVALID'
      | 'PIN_TRYING_LIMITED_TIME'
      | 'PIN_CHANGE_DUPLICATE'
      | 'NEW_PIN_INVALID'
      | 'CASH_FULL'
      | 'MONEY_INVALID'
      | 'FAKE_MONEY'
      | 'TIMEOUT'
      | 'RECEIPT_PRINTER_NOT_PRESENT'
      | 'BALANCE_NOT_ENOUGH'
      | 'AMOUNT_LIMITED'
      | 'AMOUNT_LIMITED_BY_CUSTOMER'
      | 'NO_WITHDRAW_TURN_REMAIN'
      | 'DOOR_OPEN'
      | 'DENOMINATE_FAILED'
      | 'AMOUNT_LESS_THAN_STEP'
      | 'AMOUNT_NOT_DIV_STEP'
      | 'PIN_SHORT'
      | 'SERVER_ERROR'
      | 'OTP_INVALID'
      | 'ACCOUNT_OR_CARD_NOT_EXIST'
      | 'BANK_NOT_SUPPORT'
      | 'SUPPORT_CREDIT_CARD'
      | 'CARD_NOT_SUPPORTED_TRANSFER'
      | 'XFS_ERROR';
    time?: string;
  };

  type unBlockUserParams = {
    userId: string;
  };

  type updateMachineParams = {
    id: string;
  };

  type UpdateMachineRequest = {
    versionId: number;
    machineIds: string[];
  };

  type UpdateMachineResponse = {
    version?: VersionResponse;
    machines?: StmInfoResponse[];
  };

  type updateManagementUnitParams = {
    unitId: string;
  };

  type UpdateManagementUnitRequest = {
    code?: string;
    name?: string;
    location?: string;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
    address?: string;
  };

  type updateModelParams = {
    modelId: string;
  };

  type UpdateModelRequest = {
    name?: string;
    storages: StorageItemRequest[];
  };

  type UpdateStmRequest = {
    /** Values: STM | ATM | CDM */
    machineType: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    machineName: string;
    terminalId: string;
    masterKey: string;
    modelId: number;
    serialNumber?: string;
    privateKey?: string;
    accountingAccountVND?: string;
    accountingAccountUSD?: string;
    /** Values: MINIMUM_NOTES | EQUAL_EMPTYING | MAXIMUM_NOTES */
    denominationRule?: 'MINIMUM_NOTES' | 'EQUAL_EMPTYING' | 'MAXIMUM_NOTES';
    denominations?: number[];
    gate?: number;
    ipAddress: string;
    acquirerId?: string;
    /** Values: KEY_3DES */
    keyType: 'KEY_3DES';
    /** Values: NDC */
    protocol: 'NDC';
    mac?: string;
    managementUnitId?: number;
    userIds?: string[];
    location: string;
    provinceId: number;
    districtId: number;
    wardId: number;
    address: string;
    latitude?: number;
    longitude?: number;
    note?: string;
  };

  type updateUserParams = {
    userId: string;
  };

  type UpdateUserRequest = {
    avatar?: string;
    staffId: string;
    name: string;
    email: string;
    managementUnitId: number;
    roleGroupId: number;
  };

  type updateVersionParams = {
    versionId: string;
  };

  type UpdateVersionRequest = {
    modelId: number;
    name: string;
    file: string;
    content?: string;
    condition?: string;
  };

  type UserDetailResponse = {
    id?: string;
    avatar?: string;
    staffId?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    status?: 'UNKNOWN' | 'ACTIVE' | 'INACTIVE';
    machines?: StmInfoResponse[];
    roleGroup?: RoleGroupResponse;
    managementUnit?: ManagementUnitResponse;
  };

  type UserResponse = {
    id?: string;
    avatar?: string;
    staffId?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    status?: 'UNKNOWN' | 'ACTIVE' | 'INACTIVE';
    managementUnit?: ManagementUnitResponse;
  };

  type VersionResponse = {
    id?: number;
    name?: string;
    /** Values: STM | ATM | CDM */
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    model?: StmModelResponse;
    content?: string;
    filePath?: string;
    condition?: string;
    conditionId?: number;
    status?: 'WAITING' | 'PASSED' | 'EXECUTED';
    createdBy?: UserResponse;
    createdAt?: string;
  };

  type Ward = {
    id?: number;
    name?: string;
  };
}
