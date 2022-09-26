import icon from '@/assets/icons/role-list-item-icon.svg';
import { MAP_ACTION_LIST } from '@/constants';
import { Card, Col, Row } from 'antd';
import React from 'react';
import styles from '../UserDetailDrawer.less';

const RoleGroupRow: React.FC<API.RoleGroupResponse> = ({ name, actions }) => {
  return (
    <Col span={24}>
      <Card title="Nhóm quyền sở hữu" size="small" className={styles.myCard}>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <div className={styles.roleListTitle}>{name}</div>
            <ul className={styles.roleList}>
              {actions &&
                actions.map((item) => (
                  <li className={styles.roleListItem} key={item.id}>
                    <img src={icon} alt="icon-item" />
                    {item.action && MAP_ACTION_LIST[item.action]}
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default RoleGroupRow;
