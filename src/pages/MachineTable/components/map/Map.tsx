import { AimOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row } from 'antd';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ChangeView from './ChangeView';

export interface MapProps {
  coordinate: [number, number];
}

export default function Map({ coordinate }: MapProps) {
  return (
    <MapContainer
      center={coordinate}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100%', height: 348 }}
    >
      <Card
        bodyStyle={{ padding: 0 }}
        style={{
          position: 'absolute',
          zIndex: 400,
          right: 16,
          top: 16,
        }}
      >
        <Row>
          <Card size="small" title="Vĩ độ">
            <Input disabled value={coordinate[0]} />
          </Card>
        </Row>
        <Row>
          <Card size="small" title="Kinh độ">
            <Input disabled value={coordinate[1]} />
          </Card>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Button>
              <AimOutlined />
            </Button>
          </Col>
          <Col span={16}>
            <Button block>Xác nhận</Button>
          </Col>
        </Row>
      </Card>
      <ChangeView coordinate={coordinate} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinate}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
