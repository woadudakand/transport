import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { placeAddDispatch } from '../../../redux/places/actionCreator';

const SavePlaces = ({ visible, onCancel }) => {
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
      title: values.title,
      placeabbre: values.placeabbre,
      created_at: moment().format('YYYY-MM-DD'),
    };

    if (customValues.title) {
      dispatch(placeAddDispatch(customValues));
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type={state.modalType}
      title="Save Place"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="addPlace" onFinish={handleOk}>
            <Button htmlType="submit" size="default" type="primary" key="submit">
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
          <Form form={form} name="addPlace" onFinish={handleOk}>
            <Form.Item name="title" label="">
              <Input placeholder="Place Name" />
            </Form.Item>
            <Form.Item name="placeabbre" label="">
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
};

export default SavePlaces;
