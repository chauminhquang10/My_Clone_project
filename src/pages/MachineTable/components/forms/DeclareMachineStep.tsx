import { CloseIcon } from '@/assets';
import { StepsForm } from '@ant-design/pro-components';
import { Col, Form, Input, Row, Select } from 'antd';
import styles from './declareMachineForm.less';

interface DeclareMachineStepProps {
  handleCancle: () => void;
}

export default function DeclareMachineStep({ handleCancle }: DeclareMachineStepProps) {
  return (
    <StepsForm.StepForm name="step1">
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>Khai báo thiết bị</p>
        </Col>
        <Col>
          <span className={styles.closeIcon} onClick={handleCancle}>
            <img src={CloseIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Form.Item name="unitId" label="Số thứ tự">
            <Input placeholder={'Số thứ tự'} disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="area" label="Loại máy">
            <Select placeholder="Loại máy">
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="area" label="Dòng máy">
            <Select placeholder="Dòng máy">
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="city" label="Series máy">
            <Input placeholder="Series máy" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="district" label="Loại khoá">
            <Select placeholder="Loại khoá">
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="subDistrict" label="Terminal ID">
            <Input placeholder="Terminal ID" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Địa chỉ IP">
            <Input placeholder="Địa chỉ IP" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Acquirer ID">
            <Input placeholder={'Acquirer ID'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Cổng">
            <Input placeholder={'Cổng'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Master (A)/(B) Key">
            <Input placeholder={'Master (A)/(B) Key'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Protocol">
            <Select placeholder="Loại khoá">
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="address" label="Tên đường, số nhà">
            <Input placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="city" label="MAC">
            <Input placeholder="MAC" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="district" label="Quận/Huyện">
            <Select placeholder="Chọn Quận/Huyện">
              <Select.Option value="private">Private</Select.Option>
              <Select.Option value="public">Public</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Quy tắc chi tiền" label="Quy tắc chi tiền">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Loại mệnh giá tiền" label="Loại mệnh giá tiền">
            <Row gutter={12}>
              <Col span={6}>
                <Input disabled placeholder={'500'} />
              </Col>
              <Col span={6}>
                <Input disabled placeholder={'200'} />
              </Col>
              <Col span={6}>
                <Input disabled placeholder={'100'} />
              </Col>
              <Col span={6}>
                <Input disabled placeholder={'50'} />
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
}
