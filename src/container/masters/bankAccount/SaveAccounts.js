import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';

const { Option } = Select;

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
            <Form.Item initialValue="" name="name" label="">
              <Select showSearch>
                <Option value="">Select Bank</Option>
                <Option value="SBI">SBI</Option>
              </Select>
            </Form.Item>
            <Form.Item initialValue="" name="type" label="">
              <Select showSearch>
                <Option value="">Account Type</Option>
                <Option value="Current Account">Current Account</Option>
                <Option value="Saving Account">Saving Account</Option>
                <Option value="Recurring Account">Recurring Account</Option>
                <Option value="Fixed Deposit / Account">Fixed Deposit / Account</Option>
              </Select>
            </Form.Item>
            <Form.Item name="customerID" label="">
              <Input placeholder="Customer ID" />
            </Form.Item>
            <Form.Item name="code" label="">
              <Input placeholder="Branch Code" />
            </Form.Item>
            <Form.Item name="ifsc" label="">
              <Input disabled defaultValue="ifsc" />
            </Form.Item>
            <Form.Item name="oBalance" label="">
              <Input placeholder="Opening Balance" />
            </Form.Item>
            <Form.Item name="holderName" label="">
              <Input placeholder="Account Holder" />
            </Form.Item>
            <Form.Item name="acNumber" label="">
              <Input placeholder="Account Number" />
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
