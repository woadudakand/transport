import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { updatePlace } from '../../../redux/places/actionCreator';

const SavePlaces = ({ visible, onCancel, place }) => {
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
      id: place.id,
      name: values.name,
      abbreviation: values.abbreviation,
    };

    if (customValues.name) {
      dispatch(updatePlace(customValues));
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(place);
    }
  }, [form, place, visible]);

  return (
    <Modal
      type={state.modalType}
      title="Save Place"
      visible={state.visible}
      forcerender
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="updatePlace" onFinish={handleOk}>
            <Button htmlType="submit" size="default" type="primary" key="submit">
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
          <Form form={form} name="updatePlace" onFinish={handleOk}>
            <Form.Item initialValue={place.name} name="name" label="">
              <Input placeholder="Place Name" />
            </Form.Item>
            <Form.Item initialValue={place.abbreviation} name="abbreviation" label="">
              <Input placeholder="Place abbreviation" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

SavePlaces.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  place: propTypes.object,
};

export default SavePlaces;
