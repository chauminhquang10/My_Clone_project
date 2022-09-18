import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import React from 'react';
import styles from './editMachine.less';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = () => {
  // const intl = useIntl();
  return (
    <ModalForm
      // form={form}
      // width={width}
      // visible={visible}
      // onVisibleChange={onVisibleChange}
      // onFinish={onFinish}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        onCancel: () => console.log('run'),
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
    >
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>{/* <p className={styles.modalTitle}>{title}</p> */}</Col>
        <Col>
          {/* <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} /> */}
          {/* </span> */}
        </Col>
      </Row>

      <p className={styles.avatarTitle}>Ảnh đại diện</p>

      <Row align="middle" justify="start" style={{ gap: '16px' }}>
        {/* <Col>
            {!loadingImage ? (
              <Avatar
                size={64}
                src={imageUrl ? imageUrl : <Avatar size={64} icon={<UserOutlined />} />}
              />
            ) : (
              <Skeleton.Avatar active={true} shape={'circle'} size={64} />
            )}
          </Col> */}
        <Col>
          <Row style={{ gap: '8px' }}>
            <Col>
              <Upload
                name="avatar"
                showUploadList={false}
                //   beforeUpload={(file: RcFile) => handleBeforeUpload(file)}
                //   onChange={handleChange}
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
                //   onClick={handleRemoveAvatar}
              >
                <span>Xóa ảnh</span>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Form.Item
            name="staffId"
            label="Mã nhân viên"
            rules={[
              {
                required: true,
                message: 'Please input your ma nhan vien',
              },
            ]}
          >
            <Input placeholder={'Nhập mã nhân viên'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="staffName" label="Tên nhân viên">
            <Input placeholder={'Nhập tên nhân viên'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phoneNumber" label="Số điện thoại">
            <Input placeholder={'Nhập số điện thoại'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="Email">
            <Input placeholder={'Nhập email'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="unitId" label="Mã - Tên đơn vị">
            <Select placeholder="Chọn đơn vị">
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="unitAddress" label="Địa chỉ đơn vị">
            <Input disabled placeholder={'Chọn đơn vị'} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="roleGroup" label="Nhóm quyền">
            <Select placeholder="Chọn nhóm quyền">
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="roles" label="Quyền tương ứng"></Form.Item>
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large">
          Huỷ bỏ
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Hoàn tất
        </Button>
      </Row>
    </ModalForm>
  );
};

export default UpdateForm;
