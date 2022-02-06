import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';

const SaveArticles = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type={state.modalType}
      title="Save Bank Account"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={handleOk}>
            Save
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="createProject" onFinish={handleOk}>
            <Form.Item name="name" label="">
              <Input placeholder="Bank Name" />
            </Form.Item>
            <Form.Item name="branch" label="">
              <Input placeholder="Branch Name" />
            </Form.Item>
            <Form.Item name="code" label="">
              <Input placeholder="Branch Code" />
            </Form.Item>
            <Form.Item name="ifsc" label="">
              <Input placeholder="IFSC Code" />
            </Form.Item>
            <Form.Item name="micr" label="">
              <Input placeholder="MICR Code" />
            </Form.Item>
            <Form.Item name="telephone" label="">
              <Input placeholder="Telephone" />
            </Form.Item>
            <Form.Item name="email" label="">
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="address" label="">
              <Input.TextArea placeholder="Write address" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

SaveArticles.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default SaveArticles;
