/* eslint-disable react/jsx-no-undef */
import { Col, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';
import React, { useState } from 'react';

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
  form: FormInstance<API.CreateUserRequest>;
  managementUnitList?: API.ManagementUnitResponse[];
}

const ManagementUnitField: React.FC<ManagementUnitFieldProps> = ({ managementUnitList, form }) => {
  const [selectedValue, setSelectedValue] = useState<API.ManagementUnitResponse['id']>();

  console.log('form: ', form);

  const handleSelectChange = (value: API.ManagementUnitResponse['id']) => {
    setSelectedValue(value);
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
