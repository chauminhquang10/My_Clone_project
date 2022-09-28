import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import { EMAIL_REGEX, PHONE_REGEX } from '@/constants';
import { getAllManagementUnits } from '@/services/STM-APIs/ManagementUnitController';
import { uploadPublicFile } from '@/services/STM-APIs/MediaController';
import { getAllRoleGroup } from '@/services/STM-APIs/RoleController';
import { DeleteOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { Avatar, Button, Col, Form, Input, message, Row, Skeleton, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useCallback, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { ManagementUnitField, RoleGroupField } from './components';
import { getAddressByManagementUnitId } from './components/ManagementUnitField';
import { getActionsByRoleGroupId } from './components/RoleGroupField';
import styles from './NewUserForm.less';

type CreateFormProps = {
  title: string;
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (body: API.CreateUserRequest) => Promise<boolean>;
  userInfo?: API.UserDetailResponse;
};

const NewUserForm: React.FC<CreateFormProps> = ({
  title,
  width,
  visible,
  onVisibleChange,
  onFinish,
  userInfo,
}) => {
  const [form] = Form.useForm<
    API.CreateUserRequest & { unitAddress: string; actions: { value?: string }[] }
  >();

  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isAllowedSubmit, setIsAllowedSubmit] = useState<boolean>(false);

  // get avatar if in update form
  useEffect(() => {
    if (userInfo?.avatar) {
      setImageUrl(userInfo.avatar);
    }
  }, [userInfo, userInfo?.avatar]);

  // check file type before uploading
  const handleBeforeUpload = (file: RcFile) => {
    const isCorrectFileType = file.type === 'image/png' || file.type === 'image/jpeg';

    if (!isCorrectFileType) {
      message.error(`${file.name} không đúng định dạng file`);
      return Upload.LIST_IGNORE;
    }

    const isLessThan5M = file.size / 1024 / 1024 < 5;

    if (!isLessThan5M) {
      message.error(`${file.name} dung lượng vượt quá 5MB`);
      return Upload.LIST_IGNORE;
    }
    return isCorrectFileType && isLessThan5M;
  };

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    console.log('file info: ', info);
    if (info.file.status === 'uploading') {
      console.log('uploading');
      setLoadingImage(true);
      return;
    }
    if (info.file.status === 'done' || info.file.status === 'error') {
      console.log('done');
      try {
        const res = await uploadPublicFile(
          { bucketName: 'user', type: 'avatar' },
          {},
          info.file.originFileObj as RcFile,
        );

        const data = res.data?.previewPath?.split('/');

        setImageUrl(
          data &&
            `https://api-stmc-ca-dev.hcm.unicloud.ai/api/v1/storage/preview/public/avatar/user/${
              data[(data?.length - 1) as number]
            }`,
        );
      } catch (error) {
        console.log('error: ', error);
      }
    }
    setLoadingImage(false);
  };

  console.log('image url: ', imageUrl);

  const onReset = () => {
    form.resetFields();
    onVisibleChange(false);
  };

  const handleAllowSubmit = useCallback(() => {
    const listField = [
      'staffId',
      'name',
      'email',
      'phoneNumber',
      'managementUnitId',
      'roleGroupId',
    ];

    for (let i = 0; i < listField.length; i++) {
      if (!form.getFieldsValue()[listField[i]]) {
        setIsAllowedSubmit(false);
        return;
      }
    }

    setIsAllowedSubmit(true);
    return;
  }, [form]);

  const handleSubmit = async (values: API.CreateUserRequest) => {
    try {
      const success = await onFinish({ ...values, avatar: imageUrl });
      return success;
    } catch (error) {
      console.log('error: ', error);
    }
    return false;
  };

  const { data: managementUnitList } =
    useRequest<API.ResponseBasePageResponseManagementUnitResponse>(() => getAllManagementUnits({}));

  const { data: roleGroupList } = useRequest<API.ResponseBaseListRoleGroupResponse>(() =>
    getAllRoleGroup(),
  );

  const handleSelectManagementUnitChange = (unitId: number, address: string) => {
    form.setFieldValue('managementUnitId', unitId);
    form.setFieldValue('unitAddress', address);

    handleAllowSubmit();
  };

  const handleSelectRoleGroupChange = (roleGroupId: number, actions: { value?: string }[]) => {
    form.setFieldValue('roleGroupId', roleGroupId);
    form.setFieldValue('actions', actions);

    handleAllowSubmit();
  };

  return (
    <ModalForm
      form={form}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={handleSubmit}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
      onChange={() => {
        handleAllowSubmit();
      }}
      onInit={() => {
        form.setFieldsValue({
          staffId: userInfo?.staffId || '',
          name: userInfo?.name || '',
          phoneNumber: userInfo?.phoneNumber || '',
          email: userInfo?.email || '',
          managementUnitId: userInfo?.managementUnit?.id,
          roleGroupId: userInfo?.roleGroup?.id,
          unitAddress:
            userInfo?.managementUnit?.id && managementUnitList?.items
              ? getAddressByManagementUnitId(
                  userInfo?.managementUnit?.id,
                  managementUnitList?.items,
                )
              : '',
          actions:
            userInfo?.roleGroup?.id && roleGroupList?.roleGroups
              ? getActionsByRoleGroupId(userInfo?.roleGroup?.id, roleGroupList?.roleGroups)
              : undefined,
        });
      }}
    >
      {/* Header */}
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>{title}</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} alt="close-icon" />
          </span>
        </Col>
      </Row>
      {/* Avatar */}
      <p className={styles.avatarTitle}>Ảnh đại diện</p>
      <Row align="middle" justify="start" style={{ gap: '16px' }}>
        <Col>
          {!loadingImage ? (
            <Avatar
              size={64}
              src={imageUrl ? imageUrl : <Avatar size={64} icon={<UserOutlined />} />}
            />
          ) : (
            <Skeleton.Avatar active={true} shape={'circle'} size={64} />
          )}
        </Col>
        <Col>
          <Row style={{ gap: '8px' }}>
            <Col>
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={(file: RcFile) => handleBeforeUpload(file)}
                onChange={handleChange}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />} className={styles.uploadButton}>
                  Tải ảnh lên
                </Button>
              </Upload>
            </Col>
            <Col>
              <Button
                icon={<DeleteOutlined />}
                className={styles.deleteButton}
                onClick={() => setImageUrl('')}
              >
                <span>Xóa ảnh</span>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Create User Form */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        {/* Staff ID */}
        <Col span={12}>
          <Form.Item name="staffId" label="Mã nhân viên">
            <Input placeholder={'Nhập mã nhân viên'} />
          </Form.Item>
        </Col>
        {/* Name */}
        <Col span={12}>
          <Form.Item name="name" label="Tên nhân viên">
            <Input placeholder={'Nhập tên nhân viên'} />
          </Form.Item>
        </Col>
        {/* Phone number */}
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            validateTrigger="onSubmit"
            rules={[
              {
                pattern: PHONE_REGEX,
                message: 'Số điện thoại không hợp lệ',
              },
            ]}
          >
            <Input placeholder={'Nhập số điện thoại'} disabled={!!userInfo} />
          </Form.Item>
        </Col>
        {/* Email */}
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            validateTrigger="onSubmit"
            rules={[
              {
                pattern: EMAIL_REGEX,
                message: 'Email không hợp lệ',
              },
            ]}
          >
            <Input placeholder={'Nhập email'} />
          </Form.Item>
        </Col>
        {/* Don vi quan ly */}
        <ManagementUnitField
          data={managementUnitList?.items}
          handleSelect={handleSelectManagementUnitChange}
        />
        {/* Nhom quyen */}
        <RoleGroupField
          data={roleGroupList?.roleGroups}
          handleSelect={handleSelectRoleGroupChange}
        />
      </Row>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Button
          className={styles.submitButton}
          size="large"
          htmlType="submit"
          disabled={!isAllowedSubmit}
        >
          Hoàn tất
        </Button>
      </Row>
    </ModalForm>
  );
};

export default NewUserForm;
