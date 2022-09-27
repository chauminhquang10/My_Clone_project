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

  type AssignUserRequest = {
    machineId: string;
    userIds: string[];
  };

  type AssignUserResponse = {
    machine?: StmInfoResponse;
    users?: UserResponse[];
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
    machineType: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    storages: StorageItemRequest[];
  };

  type CreateStmRequest = {
    machineType: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    machineName: string;
    terminalId: string;
    masterKey: string;
    modelId: number;
    serialNumber: string;
    accountingAccountVND: string;
    accountingAccountUSD?: string;
    /** Values: MINIMUM_NOTES | EQUAL_EMPTYING | MAXIMUM_NOTES */
    denominationRule: 'MINIMUM_NOTES' | 'EQUAL_EMPTYING' | 'MAXIMUM_NOTES';
    denominations: number[];
    port: number;
    ipAddress: string;
    acquirerId: string;
    /** Values: KEY_3DES */
    keyType: 'KEY_3DES';
    /** Values: NDC */
    protocol: 'NDC';
    mac: string;
    managementUnitId: number;
    userIds: string[];
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
    conditionId?: number;
  };

  type deleteManagementUnitParams = {
    unitId: string;
  };

  type deleteModelParams = {
    modelId: string;
  };

  type deleteRoleGroupParams = {
    groupId: string;
  };

  type deleteVersionParams = {
    versionId: string;
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

  type getAllManagementUnitsParams = {
    location?: string;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
    from?: string;
    to?: string;
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getAllUsersParams = {
    managementUnitId?: number;
    status?: 'UNKNOWN' | 'ACTIVE' | 'INACTIVE';
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getAllVersionParams = {
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    modelId?: number;
    from?: string;
    to?: string;
    query?: string;
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
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    from?: string;
    to?: string;
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
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
    location?: string;
  };

  type getRoleDetailParams = {
    groupId: string;
  };

  type getSystemOperationParams = {
    module?: 'MACHINE' | 'USER' | 'MODEL' | 'MANAGEMENT_UNIT' | 'VERSION';
    action?:
      | 'CREATE'
      | 'UPDATE'
      | 'CHANGE_STATUS'
      | 'BLOCK'
      | 'UNBLOCK'
      | 'ASSIGN_ACCESS'
      | 'DELETE';
    from?: string;
    to?: string;
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getTransactionConfigurationParams = {
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getTransactionsParams = {
    machineId: string;
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
    from?: string;
    to?: string;
    query?: string;
    pageNumber?: number;
    pageSize?: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: string;
  };

  type getUserNotificationParams = {
    pageNumber?: number;
    pageSize?: number;
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

  type ListRoleGroupResponse = {
    roleGroups?: RoleGroupResponse[];
  };

  type ListRolesResponse = {
    roles?: Role[];
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

  type markAsReadParams = {
    notificationId: number;
  };

  type markAsUnReadParams = {
    notificationId: number;
  };

  type Notification = {
    id?: number;
    notificationType?:
      | 'NOTI_CREATE_MACHINE'
      | 'NOTI_UPDATE_MACHINE'
      | 'NOTI_CHANGE_MACHINE_STATUS'
      | 'NOTI_UPDATE_MACHINE_VERSION'
      | 'NOTI_MACHINE_WARNING'
      | 'NOTI_CONNECT_MACHINE'
      | 'NOTI_CREATE_USER'
      | 'NOTI_UPDATE_USER'
      | 'NOTI_BLOCK_USER'
      | 'NOTI_UNBLOCK_USER'
      | 'NOTI_CREATE_MODEL'
      | 'NOTI_UPDATE_MODEL'
      | 'NOTI_CREATE_VERSION'
      | 'NOTI_UPDATE_VERSION'
      | 'NOTI_CREATE_MANAGEMENT_UNIT'
      | 'NOTI_UPDATE_MANAGEMENT_UNIT';
    time?: string;
    content?: string;
    level?: 'INFORMATION' | 'WARNING' | 'FAILURE' | 'FATAL';
    reference?: string;
    read?: boolean;
  };

  type PageResponseManagementUnitResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: ManagementUnitResponse[];
  };

  type PageResponseNotification = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: Notification[];
  };

  type PageResponseStmInfoResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: StmInfoResponse[];
  };

  type PageResponseStmModelResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: StmModelResponse[];
  };

  type PageResponseSystemOperationResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: SystemOperationResponse[];
  };

  type PageResponseTransactionConfigurationResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: TransactionConfigurationResponse[];
  };

  type PageResponseTransactionResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: TransactionResponse[];
  };

  type PageResponseUserResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: UserResponse[];
  };

  type PageResponseVersionResponse = {
    pageNumber?: number;
    size?: number;
    totalSize?: number;
    items?: VersionResponse[];
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

  type previewPrivateFileParams = {
    bucketName: string;
    type: 'screen';
    objectName: string;
  };

  type previewPublicFileParams = {
    bucketName: string;
    type: 'avatar';
    objectName: string;
  };

  type Province = {
    id?: number;
    name?: string;
    location?: string;
  };

  type ReadNotificationResponse = {
    success?: boolean;
  };

  type RefreshTokenRequest = {
    refreshToken: string;
  };

  type RequestResetPasswordRequest = {
    email: string;
  };

  type RequestResetPasswordResponse = {
    success?: boolean;
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

  type ResponseBaseAssignUserResponse = {
    code?: number;
    message?: string;
    data?: AssignUserResponse;
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

  type ResponseBasePageResponseManagementUnitResponse = {
    code?: number;
    message?: string;
    data?: PageResponseManagementUnitResponse;
  };

  type ResponseBasePageResponseNotification = {
    code?: number;
    message?: string;
    data?: PageResponseNotification;
  };

  type ResponseBasePageResponseStmInfoResponse = {
    code?: number;
    message?: string;
    data?: PageResponseStmInfoResponse;
  };

  type ResponseBasePageResponseStmModelResponse = {
    code?: number;
    message?: string;
    data?: PageResponseStmModelResponse;
  };

  type ResponseBasePageResponseSystemOperationResponse = {
    code?: number;
    message?: string;
    data?: PageResponseSystemOperationResponse;
  };

  type ResponseBasePageResponseTransactionConfigurationResponse = {
    code?: number;
    message?: string;
    data?: PageResponseTransactionConfigurationResponse;
  };

  type ResponseBasePageResponseTransactionResponse = {
    code?: number;
    message?: string;
    data?: PageResponseTransactionResponse;
  };

  type ResponseBasePageResponseUserResponse = {
    code?: number;
    message?: string;
    data?: PageResponseUserResponse;
  };

  type ResponseBasePageResponseVersionResponse = {
    code?: number;
    message?: string;
    data?: PageResponseVersionResponse;
  };

  type ResponseBasePhysicalDevicesResponse = {
    code?: number;
    message?: string;
    data?: PhysicalDevicesResponse;
  };

  type ResponseBaseReadNotificationResponse = {
    code?: number;
    message?: string;
    data?: ReadNotificationResponse;
  };

  type ResponseBaseRequestResetPasswordResponse = {
    code?: number;
    message?: string;
    data?: RequestResetPasswordResponse;
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

  type ResponseBaseStmModelResponse = {
    code?: number;
    message?: string;
    data?: StmModelResponse;
  };

  type ResponseBaseUpdateMachineResponse = {
    code?: number;
    message?: string;
    data?: UpdateMachineResponse;
  };

  type ResponseBaseUploadMediaResponse = {
    code?: number;
    message?: string;
    data?: UploadMediaResponse;
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
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    model?: StmModelResponse;
    name?: string;
    terminalId?: string;
    serialNumber?: string;
    privateKey?: string;
    port?: number;
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
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    createdBy?: UserResponse;
    createdAt?: string;
    storages?: StorageItem[];
  };

  type StmModelResponse = {
    id?: number;
    name?: string;
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    createdBy?: UserResponse;
    createdAt?: string;
  };

  type StorageItem = {
    deviceType?: PhysicalDevice;
    minCapacity?: number;
  };

  type StorageItemRequest = {
    deviceTypeId: number;
    minCapacity?: number;
  };

  type SystemOperationResponse = {
    id?: number;
    time?: string;
    action?:
      | 'CREATE'
      | 'UPDATE'
      | 'CHANGE_STATUS'
      | 'BLOCK'
      | 'UNBLOCK'
      | 'ASSIGN_ACCESS'
      | 'DELETE';
    module?: 'MACHINE' | 'USER' | 'MODEL' | 'MANAGEMENT_UNIT' | 'VERSION';
    content?: string;
    createdBy?: UserResponse;
  };

  type TransactionConfigurationResponse = {
    machine?: StmInfoResponse;
    total?: number;
    success?: number;
    failure?: number;
  };

  type TransactionResponse = {
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

  type updateRoleGroupParams = {
    groupId: string;
  };

  type UpdateRoleGroupRequest = {
    name?: string;
    actionIds?: number[];
  };

  type UpdateStmRequest = {
    machineType: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    machineName: string;
    terminalId: string;
    masterKey: string;
    modelId: number;
    serialNumber: string;
    accountingAccountVND: string;
    accountingAccountUSD?: string;
    /** Values: MINIMUM_NOTES | EQUAL_EMPTYING | MAXIMUM_NOTES */
    denominationRule: 'MINIMUM_NOTES' | 'EQUAL_EMPTYING' | 'MAXIMUM_NOTES';
    denominations?: number[];
    port: number;
    ipAddress: string;
    acquirerId: string;
    /** Values: KEY_3DES */
    keyType: 'KEY_3DES';
    /** Values: NDC */
    protocol: 'NDC';
    mac: string;
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
    modelId?: number;
    name?: string;
    file?: string;
    content?: string;
    conditionId?: number;
  };

  type UploadMediaResponse = {
    previewPath?: string;
  };

  type uploadPrivateFileParams = {
    bucketName: string;
    type: 'screen';
  };

  type uploadPublicFileParams = {
    bucketName: string;
    type: 'avatar';
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
    admin?: boolean;
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
    admin?: boolean;
  };

  type VersionResponse = {
    id?: number;
    name?: string;
    machineType?: 'UNKNOWN' | 'STM' | 'CDM' | 'ATM';
    model?: StmModelResponse;
    content?: string;
    filePath?: string;
    condition?: string;
    conditionId?: number;
    status?: 'WAITING' | 'EXECUTING' | 'EXECUTED';
    createdBy?: UserResponse;
    createdAt?: string;
    updatedMachines?: StmInfoResponse[];
    notUpdatedMachines?: StmInfoResponse[];
  };

  type Ward = {
    id?: number;
    name?: string;
  };
}
