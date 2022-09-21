import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import Api from '@/services/STM-APIs';
import { DeleteOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { Avatar, Button, Col, Form, Input, message, Row, Skeleton, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useCallback, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { ManagementUnitField, RoleGroupField } from './components';
import styles from './NewUserForm.less';

type CreateFormProps = {
  title: string;
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (body: API.CreateUserRequest, avatar?: File) => Promise<boolean>;
  userInfo?: API.UserDetailResponse;
};

const NewUserForm: React.FC<CreateFormProps> = ({
  title,
  width,
  visible,
  onVisibleChange,
  // onFinish,
  userInfo,
}) => {
  const [form] = Form.useForm<API.CreateUserRequest>();

  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();
  const [isAllowedSubmit, setIsAllowedSubmit] = useState<boolean>(false);

  // get avatar if in update form
  useEffect(() => {
    if (userInfo?.avatar) {
      setImageUrl(userInfo.avatar);
    }
  }, [userInfo?.avatar]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Check loại file khi upload file
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
    if (info.file.status === 'uploading') {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === 'done') {
      if (!info.file.url && !info.file.preview) {
        info.file.preview = await getBase64(info.file.originFileObj as RcFile);
      }
      setLoadingImage(false);
      setImageUrl(info.file.url || (info.file.preview as string));
      setImageFile(info.file.originFileObj);
    }
  };

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

  // const hanleChangeManagementUnit = (id: API.ManagementUnitResponse['id']) => {
  //   form.setFieldValue('managementUnitId', id);
  //   handleAllowSubmit();
  // };

  const handleChangeRoleGroup = (id: number) => {
    form.setFieldValue('roleGroupId', id);
    handleAllowSubmit();
  };

  const handleSubmit = async (values: API.CreateUserRequest) => {
    console.log('values: ', values);
    console.log('imageUrl: ', imageUrl);
    console.log('imageFile: ', imageFile);

    return true;
    // chua handle avatar upload
    // try {
    //   const success = await onFinish({ ...values }, imageFile);
    //   return success;
    // } catch (error) {
    //   console.log('error: ', error);
    // }
    // return false;
  };

  const { data: managementUnitList, loading: managementUnitLoading } = useRequest<
    API.ManagementUnitResponse[]
  >(() => {
    return Api.ManagementUnitController.getAllManagementUnits({});
  });

  const { data: roleGroupList, loading: roleGroupLoading } = useRequest<API.RoleGroupResponse[]>(
    () => {
      return Api.RoleController.getAllRoleGroup();
    },
  );

  console.log('managementUnitList: ', managementUnitList);
  console.log('roleGroupList: ', roleGroupList);
  console.log('roleGroupLoading: ', roleGroupLoading);

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
        console.log('onInit!!!');

        form.setFieldValue('staffId', userInfo?.staffId || '');
        form.setFieldValue('name', userInfo?.name || '');
        form.setFieldValue('phoneNumber', userInfo?.phoneNumber || '');
        form.setFieldValue('email', userInfo?.email || '');
        form.setFieldValue('managementUnitId', userInfo?.managementUnit?.id);
        form.setFieldValue('roleGroupId', userInfo?.roleGroup?.id || '');

        console.log('form data: ', form.getFieldsValue());
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
          <Form.Item
            name="staffId"
            label="Mã nhân viên"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã nhân viên',
              },
            ]}
          >
            <Input placeholder={'Nhập mã nhân viên'} />
          </Form.Item>
        </Col>
        {/* Name */}
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên nhân viên"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên nhân viên',
              },
            ]}
          >
            <Input placeholder={'Nhập tên nhân viên'} />
          </Form.Item>
        </Col>
        {/* Phone number */}
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
              },
            ]}
          >
            <Input placeholder={'Nhập số điện thoại'} />
          </Form.Item>
        </Col>
        {/* Email */}
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
            ]}
          >
            <Input placeholder={'Nhập email'} />
          </Form.Item>
        </Col>
        {/* Don vi quan ly */}
        {!managementUnitLoading && (
          <ManagementUnitField
            form={form}
            managementUnitList={
              (managementUnitList as API.PageResponseManagementUnitResponse).items
            }
          />
        )}
        {/* Nhom quyen */}
        <RoleGroupField onChangeRoleGroup={handleChangeRoleGroup} />
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
