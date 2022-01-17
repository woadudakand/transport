import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';

const { Option } = Select;

const SaveBranch = ({ visible, onCancel }) => {
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
      title="Save Branches"
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
            <Form.Item name="code" label="">
              <Input placeholder="Code" />
            </Form.Item>
            <Form.Item name="abbreviation" label="">
              <Input placeholder="Abbreviation" />
            </Form.Item>
            <Form.Item name="name" label="">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="description" label="">
              <Input.TextArea placeholder="Write article description here" />
            </Form.Item>
            <Form.Item name="place" initialValue="" label="">
              <Select style={{ width: '100%' }}>
                <Option value="">Place</Option>
                <Option value="pune">Pune</Option>
                <Option value="kallam">Kallam</Option>
                <Option value="latur">Latur</Option>
                <Option value="kaij">Kaij</Option>
                <Option value="gulai,latur">Gulai, Latur</Option>
                <Option value="thane,mumbai">Thane, Mumbai</Option>
              </Select>
            </Form.Item>
            <Form.Item name="o-balance" label="">
              <Input.TextArea placeholder="Opening Balance" />
            </Form.Item>
            <Form.Item name="place" initialValue="" label="">
              <Select style={{ width: '100%' }}>
                <Option value="">Chose Card</Option>
                <Option value="credit">Credit</Option>
                <Option value="debit">Debit</Option>
              </Select>
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

SaveBranch.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default SaveBranch;
