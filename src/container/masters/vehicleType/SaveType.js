import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { vehicleTypeAddDispatch } from '../../../redux/vehicleType/actionCreator';

const SaveType = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isLoader } = useSelector(state => {
    return {
      isLoader: state.vType.loading,
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

  const handleOk = async values => {
    const customValues = {
      type: values.type,
      tyre_qty: values.tyre,
      description: values.description,
      created_at: moment().format('YYYY-MM-DD'),
    };

    // console.log(customValues.type);
    if (customValues.type) {
      dispatch(
        vehicleTypeAddDispatch(customValues, () => {
          form.resetFields();
          onCancel();
        }),
      );
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type={state.modalType}
      title="Save Type"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="addVehicleType" onFinish={handleOk}>
            <Button disabled={isLoader} htmlType="submit" size="default" type="primary" key="submit" onClick={handleOk}>
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
          <Form form={form} name="createProject" onFinish={handleOk}>
            <Form.Item name="type" label="">
              <Input placeholder="Vehicle Type" />
            </Form.Item>
            <Form.Item name="quantity" label="">
              <Input placeholder="Tyre Quantity" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

SaveType.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default SaveType;
