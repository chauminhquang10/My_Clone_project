import { CloseIcon } from '@/assets';
import { StepsForm } from '@ant-design/pro-components';
import { Card, Col, Form, Input, Row, Table, Typography } from 'antd';
import { data, informationColumns } from '../../data';
import styles from './editMachine.less';

interface DeclareUnitStepProps {
  handleCancle: () => void;
}

export default function DeclareUnitStep({ handleCancle }: DeclareUnitStepProps) {
  return (
    <StepsForm.StepForm name="step2">
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>Khai báo đơn vị quản lý</p>
        </Col>
        <Col>
          <span className={styles.closeIcon} onClick={handleCancle}>
            <img src={CloseIcon} />
          </span>
        </Col>
      </Row>

      <Form layout="vertical" className={styles.drawerBody}>
        <Card
          title="Đơn vị quản lý"
          size="small"
          className={styles.myCard}
          style={{ borderRadius: 12 }}
        >
          <Row gutter={24} align="bottom">
            <Col span={12}>
              <Form.Item name="Mã - Tên đơn vị" label="Mã - Tên đơn vị">
                <Input disabled placeholder={'Mã - Tên đơn vị'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Seri máy" label="Địa chỉ đơn vị">
                <Input disabled placeholder={'Địa chỉ đơn vị'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Loại khoá" label="Mã - Tên nhân viên quản lý">
                <Input disabled placeholder={'example'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Cổng" label="Danh sách nhân viên quản lý">
                <Table columns={informationColumns} dataSource={data} pagination={false} bordered />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Địa chỉ máy" size="small" style={{ borderRadius: 12, marginTop: 24 }}>
          <Row gutter={[24, 24]} align="bottom">
            <Col span={12}>
              <Form.Item name="Mã - Tên đơn vị" label="Khu vực">
                <Input disabled placeholder={'Khu vực'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Seri máy" label="Tỉnh/ Thành phố">
                <Input disabled placeholder={'Tỉnh/ Thành phố'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Loại khoá" label="Quận/ Huyện">
                <Input disabled placeholder={'Quận/ Huyện'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Loại khoá" label="Phường/ Xã">
                <Input disabled placeholder={'Phường/ Xã'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Loại khoá" label="Tên đường, Số nhà">
                <Input disabled placeholder={'Tên đường, Số nhà'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Loại khoá" label="Tên máy">
                <Input disabled placeholder={'Tên máy'} />
                <Typography.Text disabled>
                  Tên máy là duy nhất, không chứa ký tự đặc biệt, tối đa 50 ký tự
                </Typography.Text>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </StepsForm.StepForm>
  );
}
