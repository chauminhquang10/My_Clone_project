/* eslint-disable react/jsx-no-undef */
import { Col, Form, Input, Select } from 'antd';

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
  data?: API.ManagementUnitResponse[];
  handleSelect: (unitId: number, address: string) => void;
}

const ManagementUnitField: React.FC<ManagementUnitFieldProps> = ({ data, handleSelect }) => {
  const handleSelectChange = (value?: number) => {
    if (!value || !handleSelect) return;

    handleSelect(value, getAddressByManagementUnitId(value, data));
  };

  return (
    <>
      <Col span={12}>
        <Form.Item name="managementUnitId" label="Mã - Tên đơn vị">
          <Select placeholder="Chọn đơn vị" onChange={handleSelectChange}>
            {data?.map((unit) => {
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
          <Input disabled placeholder="Chọn địa chỉ" />
        </Form.Item>
      </Col>
    </>
  );
};

export default ManagementUnitField;
