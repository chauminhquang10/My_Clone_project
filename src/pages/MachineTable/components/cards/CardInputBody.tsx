import { genKey } from '@/utils';
import { Col, ColProps, Form, FormItemProps, Input, Row, RowProps } from 'antd';
import { ReactNode } from 'react';

export interface CardCol {
  props: ColProps;
  formItemProps: FormItemProps;
  inputProps?: typeof Input.defaultProps;
  formItemChildren?: ReactNode;
}

export interface CardInputBodyProps extends RowProps {
  cols: CardCol[];
}

export default function CardInputBody({ cols, ...rowProps }: CardInputBodyProps) {
  return (
    <Row {...rowProps}>
      {cols.map((col) => (
        <Col {...col.props} key={genKey()}>
          <Form.Item {...col.formItemProps}>
            {col.inputProps ? <Input {...col.inputProps} /> : col.formItemChildren}
          </Form.Item>
        </Col>
      ))}
    </Row>
  );
}
