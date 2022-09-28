import { Button, Card, Col, Row } from 'antd';

import introduceRowStyles from './IntroduceRow.less';

import BulletProgress from './BulletProgress';

const IntroduceRow = () => (
  <>
    <Row gutter={24} align="top">
      <Col span={16}>
        <Row
          className={introduceRowStyles.introduceRow_leftContainer}
          align="middle"
          style={{ gap: '24px' }}
          wrap={false}
        >
          <Col span={4}>
            <Card className={introduceRowStyles.firstCard} bordered={false}>
              <h1 className={introduceRowStyles.firstCard_title}>Total number of machines</h1>
              <span className={introduceRowStyles.firstCard_quantity}>8,846</span>
            </Card>
          </Col>
          <Col span={20} style={{ flex: '1' }}>
            <Row gutter={20}>
              <Col span={8}>
                <Card className={introduceRowStyles.othersCard}>
                  <h1 className={introduceRowStyles.othersCard_title}>Total of STM</h1>
                  <div className={introduceRowStyles.othersCard_quantityContainer}>
                    <span className={introduceRowStyles.othersCard_quantity}>8,846</span>
                    <Button className={introduceRowStyles.othersCard_versionInfo}>
                      <span>Version: 1.0.0</span>
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card className={introduceRowStyles.othersCard}>
                  <h1 className={introduceRowStyles.othersCard_title}>Total of ATM</h1>
                  <div className={introduceRowStyles.othersCard_quantityContainer}>
                    <span className={introduceRowStyles.othersCard_quantity}>8,846</span>
                    <Button className={introduceRowStyles.othersCard_versionInfo}>
                      <span>Version: 1.0.0</span>
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card className={introduceRowStyles.othersCard}>
                  <h1 className={introduceRowStyles.othersCard_title}>Total of CDM</h1>
                  <div className={introduceRowStyles.othersCard_quantityContainer}>
                    <span className={introduceRowStyles.othersCard_quantity}>8,846</span>
                    <Button className={introduceRowStyles.othersCard_versionInfo}>
                      <span>Version: 1.0.0</span>
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={8} style={{ height: '168px', maxHeight: '168px' }}>
        <Card className={introduceRowStyles.introduceRow_rightContainer}>
          <h1 className={introduceRowStyles.rightContent_title}>Activity status</h1>
          <span className={introduceRowStyles.rightContent_quantity}>500 Users</span>
          <BulletProgress />
          <Row style={{ gap: '20px' }}>
            <Col>
              <div className={introduceRowStyles.legendContainer}>
                <span
                  className={`${introduceRowStyles.legendCircleShape} ${introduceRowStyles.legendCircleShape_active}`}
                />
                <span className={introduceRowStyles.legendCircleShape_title}>Active</span>
              </div>
            </Col>
            <Col>
              <div className={introduceRowStyles.legendContainer}>
                <span
                  className={`${introduceRowStyles.legendCircleShape} ${introduceRowStyles.legendCircleShape_inActive}`}
                />
                <span className={introduceRowStyles.legendCircleShape_title}>Inactive</span>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </>
);

export default IntroduceRow;
