import { MapIcon } from '@/assets';
import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Drawer, Form, Input, Row, Space, Table, Typography } from 'antd';
import { data, informationColumns } from '../../data';
import styles from './machineDrawer.less';

interface MachineDrawerProps {
  open: boolean;
  handleClose: () => void;
  handleCloseUpdateModal: () => void;
  handleOpenUpdateModal: () => void;
}

export default function MachineDrawer({
  handleClose,
  open,
  // handleCloseUpdateModal,
  handleOpenUpdateModal,
}: MachineDrawerProps) {
  return (
    <PageContainer>
      <Drawer className={styles.machineDrawer} width={880} open={open} onClose={handleClose}>
        <div className={styles.drawerSectionContainer}>
          <div className={styles.drawerHeader}>
            <Typography.Title level={4}>STM Ngô Gia Tự</Typography.Title>
            <Space size={10}>
              <img src={MapIcon} />
              <Typography.Text className={styles.machineLocation}>
                228-230 Ngô Gia Tự, Phường 4, Quận 10, Thành phố Hồ Chí Minh
              </Typography.Text>
            </Space>
          </div>
          <Form layout="vertical" className={styles.drawerBody}>
            <Card
              title="Tổng quan"
              size="small"
              className={styles.myCard}
              style={{ borderRadius: 12 }}
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name="Machine Type" label="Loại máy">
                    <Input disabled placeholder="Smart Teller Machine" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="Thời gian hoạt động" label="Thời gian hoạt động">
                    <Input disabled placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="phoneNumber" label="Tình trạng máy">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="Sức khoẻ máy">
              <div className={styles.statusBar}>
                {Array.from(Array(5)).map((_, i) => (
                  // eslint-disable-next-line no-param-reassign
                  <div className={styles[`status-${++i}`]} key={i} />
                ))}
              </div>
            </Card>
            <Card
              title="Phiên bản thiết bị"
              size="small"
              className={styles.myCard}
              style={{ borderRadius: 12 }}
            >
              <Row gutter={24} align="bottom">
                <Col span={8}>
                  <Form.Item name="Tên phiên bản" label="Tên phiên bản">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="Phiên bản mới" label="Phiên bản mới">
                    <Input.Search disabled placeholder={'example'} enterButton={<SyncOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="phoneNumber" label="">
                    <Button className={styles.primaryButton} block>
                      Xem danh sách phần mềm
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card
              title="Thông tin thiết bị"
              extra={
                <Button type="link" icon={<EditOutlined />} onClick={handleOpenUpdateModal}>
                  Chỉnh sửa
                </Button>
              }
              size="small"
              className={styles.myCard}
              style={{ borderRadius: 12 }}
            >
              <Row gutter={24} align="bottom">
                <Col span={6}>
                  <Form.Item name="Dòng máy" label="Dòng máy">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="Seri máy" label="Seri máy">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="Loại khoá" label="Loại khoá">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="Cổng" label="Cổng">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="Protocol" label="Protocol">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="Master (A)/(B) Key" label="Master (A)/(B) Key">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="MAC" label="MAC">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Tài khoản hạch toán USD" label="Tài khoản hạch toán USD">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Tài khoản hạch toán VNĐ" label="Tài khoản hạch toán VNĐ">
                    <Input disabled placeholder={'example'} />
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
            </Card>
            <Card
              title="Đơn vị quản lý"
              extra={
                <Button type="link" icon={<EditOutlined />}>
                  Chỉnh sửa
                </Button>
              }
              size="small"
              className={styles.myCard}
              style={{ borderRadius: 12 }}
            >
              <Row gutter={24} align="bottom">
                <Col span={8}>
                  <Form.Item name="Mã - Tên đơn vị" label="Mã - Tên đơn vị">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item name="Địa chỉ đơn vị" label="Địa chỉ đơn vị">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="Mã - Tên nhân viên quản lý" label="Mã - Tên nhân viên quản lý">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="Số điện thoại" label="Số điện thoại">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="Email" label="Email">
                    <Input disabled placeholder={'example'} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card
              title="Thông tin phần cứng"
              size="small"
              style={{ borderRadius: 12 }}
              bodyStyle={{ padding: 0 }}
            >
              <Table columns={informationColumns} dataSource={data} bordered />
            </Card>
          </Form>
        </div>
      </Drawer>
    </PageContainer>
  );
}
