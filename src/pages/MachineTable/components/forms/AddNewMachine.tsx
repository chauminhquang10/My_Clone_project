import { StepsForm } from '@ant-design/pro-components';
import { Button, Modal, Row } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import styles from './declareMachineForm.less';
import DeclareMachineStep from './DeclareMachineStep';
import DeclareUnitStep from './DeclareUnitStep';

interface AddNewMachineProps {
  visible: boolean;
  handleModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewMachine({ handleModalVisible, visible }: AddNewMachineProps) {
  const [step, setStep] = useState(0);
  const handleCancle = () => handleModalVisible(false);

  return (
    <StepsForm
      current={step}
      onCurrentChange={(current) => setStep(current)}
      stepsRender={() => undefined}
      stepsFormRender={(dom) => {
        return (
          <Modal
            width="934px"
            bodyStyle={{ padding: 32, paddingTop: 0 }}
            onCancel={handleCancle}
            open={visible}
            closable={false}
            footer={
              <>
                <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
                  {step === 0 && (
                    <Button className={styles.cancelButton} size="large" onClick={handleCancle}>
                      Huỷ bỏ
                    </Button>
                  )}
                  {step === 1 && (
                    <Button className={styles.cancelButton} size="large" onClick={() => setStep(0)}>
                      Quay lại
                    </Button>
                  )}
                  <Button
                    className={styles.submitButton}
                    size="large"
                    htmlType="submit"
                    onClick={
                      step === 0
                        ? () => setStep(1)
                        : () => {
                            handleCancle();
                            console.log('Done');
                          }
                    }
                  >
                    {step === 0 ? 'Tiếp tục' : 'Hoàn tất'}
                  </Button>
                </Row>
              </>
            }
            destroyOnClose
          >
            {dom}
          </Modal>
        );
      }}
    >
      <DeclareMachineStep handleCancle={handleCancle} />
      <DeclareUnitStep handleCancle={handleCancle} />
    </StepsForm>
  );
}
