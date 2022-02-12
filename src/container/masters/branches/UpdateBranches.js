import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { updateBranch } from '../../../redux/branch/actionCreator';

const { Option } = Select;

const UpdateBranch = ({ visible, onCancel, branch }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { places } = useSelector(state => {
    return {
      places: state.places.places,
    };
  });
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

  const handleOk = values => {
    const customValues = {
      id: branch.id,
      name: values.name,
      abbreviation: values.abbreviation,
      description: values.description,
      code: values.code,
      place: values.place,
      oBalance: JSON.stringify({
        balance: values['o-balance'],
        card: values.card,
      }),
    };

    if (customValues.name) {
      dispatch(updateBranch(customValues));
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(branch);
    }
  }, [form, branch, visible]);

  return (
    <Modal
      type={state.modalType}
      title="Save Branches"
      visible={state.visible}
      forcerender
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="addBranch" onFinish={handleOk}>
            <Button htmlType="submit" size="default" type="primary" key="submit" onClick={handleOk}>
              Save
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
          <Form form={form} name="addBranch" onFinish={handleOk}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input your Code!',
                },
              ]}
              name="code"
              label="Code"
              initialValue={branch.code}
            >
              <Input placeholder="Code" />
            </Form.Item>
            <Form.Item
              initialValue={branch.abbreviation}
              rules={[
                {
                  required: true,
                  message: 'Please input your Abbreviation!',
                },
              ]}
              name="abbreviation"
              label="Abbreviation"
            >
              <Input placeholder="Abbreviation" />
            </Form.Item>
            <Form.Item
              initialValue={branch.name}
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
              name="name"
              label="Name"
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              initialValue={branch.description}
              rules={[
                {
                  required: true,
                  message: 'Please input your Description!',
                },
              ]}
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Write article description here" />
            </Form.Item>
            <Form.Item
              initialValue={branch.card}
              rules={[
                {
                  required: true,
                  message: 'Please input your Place!',
                },
              ]}
              name="place"
              label="Place"
            >
              <Select style={{ width: '100%' }}>
                <Option value="">Place</Option>
                {places.map((place, key) => (
                  <Option key={key + 1} value={place.name}>
                    {place.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              initialValue={branch.oBalance ? JSON.parse(branch.oBalance).balance : ''}
              rules={[
                {
                  required: true,
                  message: 'Please input your Balance!',
                },
              ]}
              name="o-balance"
              label="Opening Balance"
            >
              <Input placeholder="Opening Balance" />
            </Form.Item>
            <Form.Item
              initialValue={branch.oBalance ? JSON.parse(branch.oBalance).card : ''}
              rules={[
                {
                  required: true,
                  message: 'Please input your Card!',
                },
              ]}
              name="card"
              label=""
            >
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

UpdateBranch.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  branch: propTypes.object,
};

export default UpdateBranch;
