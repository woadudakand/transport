import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import { BasicFormWrapper } from '../styled';

const { Option } = Select;

const AddUser = ({ visible, onCancel }) => {
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
      title="User Registration"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={handleOk}>
            User Add
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
            <Form.Item name="branch" initialValue="" label="">
              <Select style={{ width: '100%' }}>
                <Option value="">Choose Branch</Option>
                <Option value="pune">Pune</Option>
                <Option value="kallam">Kallam</Option>
                <Option value="latur">Latur</Option>
                <Option value="kaij">Kaij</Option>
                <Option value="gulai,latur">Gulai, Latur</Option>
                <Option value="thane,mumbai">Thane, Mumbai</Option>
              </Select>
            </Form.Item>
            <Form.Item name="type" initialValue="" label="">
              <Select style={{ width: '100%' }}>
                <Option value="">User Type</Option>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
            <Form.Item name="employee" initialValue="" label="">
              <Select style={{ width: '100%' }}>
                <Option value="">Select Employee</Option>
                <Option value="ravis">Ravis</Option>
                <Option value="Ramcharan">Ramcharan</Option>
                <Option value="Tuka">Tuka</Option>
              </Select>
            </Form.Item>

            <Form.Item name="username" label="User Name">
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

AddUser.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default AddUser;
