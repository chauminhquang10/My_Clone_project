import { ModalForm } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Tooltip, Upload } from 'antd';
import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd';
import { useRequest } from 'umi';
import api from '@/services/STM-APIs';
import styles from './NewVersionForm.less';

const { Option } = Select;
const { TextArea } = Input;

type NewVersionFormProps = {
  title: string;
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.CreateVersionRequest>, avatar: File) => Promise<void>;
};

const RemoveFileIcon = () => {
  return (
    <>
      <Tooltip placement="bottom" title={'Xóa file'}>
        <DeleteOutlined />
      </Tooltip>
    </>
  );
};

const NewVersionForm: React.FC<NewVersionFormProps> = ({
  title,
  width,
  visible,
  onVisibleChange,
  onFinish,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [form] = Form.useForm();
  const handleSubmit = async (values: API.CreateVersionRequest) => {
    try {
      const success = await onFinish({ ...values }, file as File);
      return success;
    } catch (error) {
      console.log('error: ', error);
    }
    return false;
  };
  const {
    run: getAllModel,
    loading: modelsLoading,
    cancel: cancelModels,
    data: listModels,
  } = useRequest<API.ResponseBasePageResponseStmModelResponse>(
    () => {
      if (form.getFieldValue('machineCategory'))
        return api.STMModelController.getListModels({
          machineType: form.getFieldValue('machineCategory'),
        });
      return new Promise(() => {
        cancelModels();
      });
    },
    {
      manual: true,
    },
  );

  const {
    run: getVersion,
    loading: conditionsLoading,
    cancel: cancelConditions,
    data: listCondition,
  } = useRequest<API.ResponseBasePageResponseStmModelResponse>(
    () => {
      if (form.getFieldValue('modelId'))
        return api.STMVersionController.getAllVersion({
          modelId: form.getFieldValue('modelId'),
        });
      return new Promise(() => {
        cancelConditions();
      });
    },
    {
      manual: true,
    },
  );
  console.log(listCondition);

  const handleUploadChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    //  Read from response and show file link
    newFileList = newFileList.map((files) => {
      if (files.response) {
        // Component will show file.url as link
        files.url = files.response.url;
      }
      return files;
    });

    setFileList(newFileList);
  };

  const props = {
    onChange: handleUploadChange,
    maxCount: 1,
    showUploadList: {
      removeIcon: <RemoveFileIcon />,
    },
  };

  const onReset = () => {
    form.resetFields();
    onVisibleChange(false);
    setTextAreaValue('');
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <ModalForm
      form={form}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={handleSubmit}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
    >
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>{title}</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item name="machineCategory" label="Loại máy">
            <Select
              placeholder="Chọn loại máy"
              onChange={() => {
                getAllModel();
              }}
            >
              <Option value="STM">STM</Option>
              <Option value="CDM">CDM</Option>
              <Option value="ATM">ATM</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="modelId" label="Dòng máy">
            <Select
              placeholder="Chọn dòng máy"
              loading={modelsLoading}
              onChange={() => {
                getVersion();
              }}
            >
              {listModels?.items?.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="conditionId" label="Điều kiện">
            <Select placeholder="Chọn điều kiện" loading={conditionsLoading}>
              {listCondition?.items?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="name" label="Tên phiên bản">
            <Input placeholder={'Tên đề xuất'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="content" label="Nội dung">
            <TextArea
              rows={2}
              showCount={{
                formatter: () => `${textAreaValue.length} / 250`,
              }}
              onChange={onChangeTextArea}
              placeholder="Nội dung (250 ký tự)"
              className={textAreaValue.length > 250 ? styles.myTextArea : ''}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="files" label="File tải">
            <Upload
              {...props}
              fileList={fileList}
              className={styles.myUploadFile}
              onChange={(e) => {
                setFile(e.file.originFileObj);
              }}
            >
              <Button icon={<UploadOutlined />} className={styles.myUploadBtn}>
                Upload File
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Hoàn tất
        </Button>
      </Row>
    </ModalForm>
  );
};

export default NewVersionForm;
