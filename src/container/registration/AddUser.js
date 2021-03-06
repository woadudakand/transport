import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import { BasicFormWrapper } from '../styled';
import { registerUser } from '../../redux/users/actionCreator';

const { Option } = Select;

const AddUser = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
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

  const handleOk = async values => {
    const customValues = {
      userId: new Date().getTime(),
      branch: values.branch,
      employee: values.employee,
      password: values.password,
      username: values.username,
      role: values.role,
    };

    if (customValues.branch) {
      dispatch(registerUser(customValues));
      onCancel();
    }
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
          <Form form={form} name="createProject" onFinish={handleOk}>
            <Button htmlType="submit" size="default" type="primary" key="submit" onClick={handleOk}>
              User Add
            </Button>
            <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="createProject" onFinish={handleOk}>
            <Form.Item name="branch" initialValue="" label="Branches">
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
            <Form.Item name="role" initialValue="" label="Role">
              <Select style={{ width: '100%' }}>
                <Option value="">User Type</Option>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
            <Form.Item name="employee" initialValue="" label="Employee">
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
