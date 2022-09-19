/* eslint-disable react/jsx-no-undef */
import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import { Col, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';

function getAddressByManagementUnitId(
  id: API.ManagementUnitResponse['id'],
  list?: API.ManagementUnitResponse[],
) {
  if (!id || !list || list.length < 1) return 'Chọn đơn vị';

  const foundUnit = list.find((item) => item.id === id);

  if (!foundUnit) return 'Chọn đơn vị';
  return `${foundUnit?.ward?.name}, ${foundUnit?.district?.name}, ${foundUnit?.province?.name}`;
}

const { Option } = Select;

interface ManagementUnitFieldProps {
  onChangeManagementUnit: (id: API.ManagementUnitResponse['id']) => void;
}

const ManagementUnitField: React.FC<ManagementUnitFieldProps> = ({ onChangeManagementUnit }) => {
  const [managementUnitList, setManagementUnitList] = useState<
    API.ManagementUnitResponse[] | undefined
  >();
  const [selectedValue, setSelectedValue] = useState<API.ManagementUnitResponse['id']>();

  useEffect(() => {
    const getManagementUnitList = async () => {
      try {
        const res = await Api.ManagementUnitController.getAllManagementUnits();
        setManagementUnitList(res.data?.managementUnits);
      } catch (error) {
        console.log('error: ', error);
        openNotification('error', 'Đã có lỗi xảy ra', 'Vui lòng thử lại sau');
      }
    };

    getManagementUnitList();
  }, []);

  const handleSelectChange = (value: API.ManagementUnitResponse['id']) => {
    setSelectedValue(value);
    onChangeManagementUnit(value);
  };

  return (
    <>
      <Col span={12}>
        <Form.Item
          name="managementUnitId"
          label="Mã - Tên đơn vị"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn đơn vị',
            },
          ]}
        >
          <Select placeholder="Chọn đơn vị" onChange={handleSelectChange}>
            {managementUnitList?.map((unit) => {
              return (
                <Option key={unit.id} value={unit.id}>
                  {unit.code} - {unit.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="unitAddress" label="Địa chỉ đơn vị">
          <Input
            disabled
            placeholder={getAddressByManagementUnitId(selectedValue, managementUnitList)}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default ManagementUnitField;
