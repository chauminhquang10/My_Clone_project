import { ModalForm } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import styles from './NewUnitForm.less';

const { Option } = Select;

type CreateFormProps = {
  title: string;
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.CreateManagementUnitRequest>) => Promise<void>;
};

const INITIAL_ENABLE_STATE = {
  provinceDisabled: true,
  districtDisabled: true,
  wardDisabled: true,
};

const NewUnitForm: React.FC<CreateFormProps> = ({
  title,
  width,
  visible,
  onVisibleChange,
  onFinish,
}) => {
  const [handleEnableDropdownList, setHandleEnableDropdownList] = useState<{
    [key: string]: boolean;
  }>(INITIAL_ENABLE_STATE);

  // khu vực đang chọn
  //const [selectedLocation, setSelectedLocation] = useState<string>('');

  const [form] = Form.useForm();

  // xử lí lấy danh sách dữ liệu về province
  //   const handleAdd = async (fields: API.RuleListItem) => {
  //     const hide = message.loading('正在添加');
  //     try {
  //       await addRule({ ...fields });
  //       hide();
  //       message.success('Added successfully');
  //       return true;
  //     } catch (error) {
  //       hide();
  //       message.error('Adding failed, please try again!');
  //       return false;
  //     }
  //   };

  const onReset = () => {
    form.resetFields();
    onVisibleChange(false);
  };

  const handleSelectChange = (determineSelect: string | number, selectValue: string | number) => {
    console.log(determineSelect, selectValue);
    setHandleEnableDropdownList(INITIAL_ENABLE_STATE);
    // switch (determineSelect) {
    //   case 'location':
    //     setHandleEnableDropdownList({ ...handleEnableDropdownList, provinceDisabled: false });
    //     break;
    //   case 'province':
    //     setHandleEnableDropdownList({ ...handleEnableDropdownList, districtDisabled: false });
    //     break;
    //   case 'district':
    //     setHandleEnableDropdownList({ ...handleEnableDropdownList, wardDisabled: false });
    //     break;
    // }
  };

  return (
    <ModalForm
      form={form}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={onFinish}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
    >
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>{title}</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item name="code" label="Mã đơn vị">
            <Input placeholder={'Nhập mã đơn vị'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="name" label="Tên đơn vị">
            <Input placeholder={'Nhập tên đơn vị'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="location" label="Khu vực">
            <Select
              placeholder="Chọn khu vực"
              onChange={(selectValue) => handleSelectChange('location', selectValue)}
            >
              <Option value="north">Miền Bắc</Option>
              <Option value="middle">Miền Trung</Option>
              <Option value="south">Miền Nam</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="provinceId" label="Tỉnh/Thành phố">
            <Select
              placeholder="Chọn Tỉnh/Thành phố"
              onChange={(selectValue) => handleSelectChange('province', selectValue)}
              disabled={handleEnableDropdownList.provinceDisabled ? true : false}
            >
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="districtId" label="Quận/Huyện">
            <Select
              placeholder="Chọn Quận/Huyện"
              onChange={(selectValue) => handleSelectChange('district', selectValue)}
              disabled={handleEnableDropdownList.districtDisabled ? true : false}
            >
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="wardId" label="Phường/Xã">
            <Select
              placeholder="Chọn Phường/Xã"
              onChange={(selectValue) => handleSelectChange('', selectValue)}
              disabled={handleEnableDropdownList.wardDisabled ? true : false}
            >
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="address" label="Tên đường, số nhà">
            <Input placeholder={'example'} />
          </Form.Item>
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Hoàn tất
        </Button>
      </Row>
    </ModalForm>
  );
};

export default NewUnitForm;
