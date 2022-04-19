import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
      title: values.title,
      abbrevation: values.abbrevation,
      description: values.description,
      code: values.code,
      place_id: values.place_id,
      payment_type: values.payment_type,
      opening_balance: values.opening_balance,
      updated_at: moment().format('YYYY-MM-DD'),
    };

    if (customValues.title) {
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
            <Form.Item name="code" label="Code">
              <Input placeholder="Code" />
            </Form.Item>
            <Form.Item name="abbrevation" label="Abbreviation">
              <Input placeholder="Abbreviation" />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Write Branch description here" />
            </Form.Item>
            <Form.Item name="place_id" label="Place">
              <Select style={{ width: '100%' }}>
                <Option value="">Place</Option>
                {places.map((place, key) => (
                  <Option key={key + 1} value={`${place.id}`}>
                    {place.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="opening_balance" label="Opening Balance">
              <Input placeholder="Opening Balance" />
            </Form.Item>
            <Form.Item name="payment_type" label="">
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
