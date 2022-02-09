import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import { BasicFormWrapper } from '../styled';
import { updateUser } from '../../redux/users/actionCreator';

const { Option } = Select;

const UpdateUser = ({ visible, onCancel, user }) => {
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
      id: user.id,
      branch: values.branch,
      employee: values.employee,
      password: values.password,
      username: values.username,
      role: values.role,
    };

    if (customValues.branch) {
      dispatch(updateUser(customValues));
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(user);
    }
  }, [form, user, visible]);

  return (
    <Modal
      type={state.modalType}
      title="User Registration"
      visible={state.visible}
      forcerender="true"
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="updateProject" onFinish={handleOk}>
            <Button htmlType="submit" size="default" type="primary" key="submit" onClick={handleOk}>
              User Update
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
          <Form form={form} name="updateProject" onFinish={handleOk}>
            <Form.Item name="branch" initialValue={user.branch} label="Branches">
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
            <Form.Item name="role" initialValue={user.role} label="Role">
              <Select style={{ width: '100%' }}>
                <Option value="">User Type</Option>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
            <Form.Item name="employee" initialValue={user.employee} label="Employee">
              <Select style={{ width: '100%' }}>
                <Option value="">Select Employee</Option>
                <Option value="ravis">Ravis</Option>
                <Option value="Ramcharan">Ramcharan</Option>
                <Option value="Tuka">Tuka</Option>
              </Select>
            </Form.Item>

            <Form.Item name="username" initialValue={user.username} label="User Name">
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              initialValue={user.password}
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
              initialValue={user.password}
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

UpdateUser.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  user: propTypes.object,
};

export default UpdateUser;
