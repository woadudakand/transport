import React from 'react';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Main, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { employeeAddDispatch } from '../../../redux/employee/actionCreator';

const SaveEmployee = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(state => state.employees.loading);

  const gotoView = () => {
    history.replace('/admin/employees');
  };

  const handleFinish = values => {
    dispatch(
      employeeAddDispatch(
        {
          ...values,
          created_at: moment().format('YYYY-MM-DD'),
        },
        () => form.resetFields(),
      ),
    );
  };

  return (
    <>
      <PageHeader
        ghost
        title="Save Employee"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={gotoView} size="small" type="primary">
              View Page
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Cards headless>
          <BasicFormWrapper>
            <Form form={form} name="createProject" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} sm={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Employee name',
                      },
                    ]}
                    name="name"
                    label="Employee Name"
                  >
                    <Input placeholder="Employee Name" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select Date of Birth',
                      },
                    ]}
                    name="dob"
                    label="Date of Birth"
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Mobile number',
                      },
                    ]}
                    name="mobileno"
                    label="Mobile"
                  >
                    <Input placeholder="Mobile" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select Join Date',
                      },
                    ]}
                    name="joiningdate"
                    label="Join Date"
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                  <Form.Item initialValue="" name="bloodgroup" label="Blood Group">
                    <Select>
                      <Select.Option value="">Blood Group</Select.Option>
                      <Select.Option value="A-">A-</Select.Option>
                      <Select.Option value="B-">B-</Select.Option>
                      <Select.Option value="AB-">AB-</Select.Option>
                      <Select.Option value="O-">O-</Select.Option>
                      <Select.Option value="A+">A+</Select.Option>
                      <Select.Option value="B+">B+</Select.Option>
                      <Select.Option value="AB+">AB+</Select.Option>
                      <Select.Option value="O+">O+</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} sm={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Correspondence Address',
                      },
                    ]}
                    name="address"
                    label="Correspondence Address"
                  >
                    <Input placeholder="Correspondence Address" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Permanent Address',
                      },
                    ]}
                    name="permanent_address"
                    label="Permanent Address"
                  >
                    <Input placeholder="Permanent Address" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Email',
                      },
                    ]}
                    name="email"
                    label="Email Id"
                  >
                    <Input placeholder="Email Id" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Qualification',
                      },
                    ]}
                    name="qualification"
                    label="Qualification"
                  >
                    <Input placeholder="Qualification" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Designation',
                      },
                    ]}
                    name="designation"
                    label="Designation"
                  >
                    <Input placeholder="Designation" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="">
                <Button disabled={isLoading} type="primary" htmlType="submit">
                  {isLoading ? 'Loading' : 'Add Employee'}
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SaveEmployee;
