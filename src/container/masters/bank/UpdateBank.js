import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import propTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { updateBank } from '../../../redux/banks/actionCreator';

const SaveBank = ({ visible, onCancel, bank }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => {
    return {
      isLoading: state.bank.loading,
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
      id: bank.id,
      bank_name: values.bank_name,
      branch_name: values.branch_name,
      branch_code: values.branch_code,
      ifsc_code: values.ifsc_code,
      micr_code: values.micr_code,
      email: values.email,
      telephone: values.telephone,
      address: values.address,
      updated_at: moment().format('YYYY-MM-DD'),
    };

    if (customValues.bank_name) {
      dispatch(
        updateBank(customValues, function() {
          onCancel();
        }),
      );
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(bank);
    }
  }, [form, bank, visible]);

  return (
    <Modal
      type={state.modalType}
      title="Update Bank"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="createArticle" onFinish={handleOk}>
            <Button
              disabled={isLoading}
              htmlType="submit"
              size="default"
              type="primary"
              key="submit"
              onClick={handleOk}
            >
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
          <Form form={form} name="editBank" onFinish={handleOk}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input bank name',
                },
              ]}
              name="bank_name"
              label="Bank Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input branch name',
                },
              ]}
              name="branch_name"
              label="Branch Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input branch code',
                },
              ]}
              name="branch_code"
              label="Branch Code "
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input IFSC code',
                },
              ]}
              name="ifsc_code"
              label="IFSC Code"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input MICR code',
                },
              ]}
              name="micr_code"
              label="MICR Code"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input Telephone number',
                },
              ]}
              name="telephone"
              label="Telephone"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input email',
                },
              ]}
              name="email"
              label="Email"
            >
              <Input />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input address',
                },
              ]}
              name="address"
              label="Address"
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

SaveBank.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  bank: propTypes.object,
};

export default SaveBank;
