import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { getBankListDispatch } from '../../../redux/banks/actionCreator';
import { bankAccountAdd } from '../../../redux/bankAccounts/actionCreator';

const { Option } = Select;

const SaveAccount = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  const [ifsc, setIfsc] = useState('ifsc');

  const { banks, isLoading } = useSelector(bState => {
    console.log(bState);
    return {
      banks: bState.bank.list,
      isLoading: bState.accounts.loading,
    };
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
      banks_id: values.banks_id,
      account_type: values.account_type,
      account_holder: values.account_holder,
      ifsc_code: ifsc,
      customer_id: values.customer_id,
      account_no: values.account_no,
      opening_balance: values.opening_balance,
      created_at: moment().format('YYYY-MM-DD'),
    };

    if (customValues.account_type) {
      dispatch(
        bankAccountAdd(customValues, function() {
          form.resetFields();
          onCancel();
        }),
      );
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (dispatch) {
      dispatch(getBankListDispatch());
    }
  }, [dispatch]);

  const handleBankChange = (_, e) => {
    setIfsc(e['data-ifsc']);
  };

  return (
    <Modal
      type={state.modalType}
      title="Save Bank Account"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="saveAccount" onFinish={handleOk}>
            <Button
              disabled={isLoading}
              htmlType="submit"
              size="default"
              type="primary"
              key="submit"
              onClick={handleOk}
            >
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
          <Form form={form} name="saveAccount" onFinish={handleOk}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Select bank',
                },
              ]}
              initialValue=""
              name="banks_id"
              label="Bank"
            >
              <Select onChange={handleBankChange}>
                <Option value="">Select Bank</Option>
                {banks.map((bank, key) => (
                  <Option key={key + 1} data-ifsc={bank.ifsc_code} value={bank.id}>
                    {bank.bank_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Select account type',
                },
              ]}
              initialValue=""
              name="account_type"
              label="Account Type"
            >
              <Select>
                <Option value="">Select</Option>
                <Option value="Current Account">Current Account</Option>
                <Option value="Saving Account">Saving Account</Option>
                <Option value="Recurring Account">Recurring Account</Option>
                <Option value="Fixed Deposit / Account">Fixed Deposit / Account</Option>
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input Customer Id',
                },
              ]}
              name="customer_id"
              label="Customer Id"
            >
              <Input placeholder="Customer ID" />
            </Form.Item>

            <Form.Item valuePropName={ifsc} initialValue={ifsc} name="ifsc" label="IFSC">
              <Input value={ifsc} disabled />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input Opening Balance',
                },
              ]}
              name="opening_balance"
              label="Opening Balance"
            >
              <Input placeholder="Opening Balance" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input Holder name',
                },
              ]}
              name="account_holder"
              label="Holder name"
            >
              <Input placeholder="Account Holder" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input Account Number',
                },
              ]}
              name="account_no"
              label="Account Number"
            >
              <Input placeholder="Account Number" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

SaveAccount.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default SaveAccount;
