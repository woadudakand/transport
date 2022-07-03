import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { updatePlace } from '../../../redux/places/actionCreator';

const UpdateType = ({ visible, onCancel, vType }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoader } = useSelector(state => {
    return {
      isLoader: state.vtype.loading,
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
      id: vType.id,
      type: values.type,
      quantity: values.quantity,
      // updated_at: moment().format('YYYY-MM-DD'),
    };

    if (customValues.type) {
      dispatch(updatePlace(customValues));
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(vType);
    }
  }, [form, vType, visible]);

  return (
    <Modal
      type={state.modalType}
      title="Edit Type"
      visible={state.visible}
      forcerender
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="addPlace" onFinish={handleOk}>
            <Button disabled={isLoader} htmlType="submit" size="default" type="primary" key="submit" onClick={handleOk}>
              Update
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
            <Form.Item initialValue={vType.type} name="type" label="">
              <Input placeholder="Vehicle Type" />
            </Form.Item>
            <Form.Item initialValue={vType.quantity} name="quantity" label="">
              <Input placeholder="Tyre Quantity" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

UpdateType.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  vType: propTypes.object,
};

export default UpdateType;
