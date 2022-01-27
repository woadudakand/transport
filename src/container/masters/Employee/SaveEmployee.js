import React from 'react';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';

import { Main, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const SaveEmployee = () => {
  const [form] = Form.useForm();

  const handleFinish = values => {
    console.log({
      ...values,
    });
  };

  return (
    <>
      <PageHeader ghost title="Save Employee" />
      <Main>
        <Cards headless>
          <BasicFormWrapper>
            <Form form={form} name="createProject" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} sm={12}>
                  <Form.Item name="name" label="">
                    <Input placeholder="Employee Name" />
                  </Form.Item>
                  <Form.Item name="birth" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                  <Form.Item name="mobile" label="">
                    <Input placeholder="Mobile" />
                  </Form.Item>
                  <Form.Item name="joining" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                  <Form.Item initialValue="" name="blood" label="">
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
                  <Form.Item name="address" label="">
                    <Input placeholder="Correspondence Address" />
                  </Form.Item>
                  <Form.Item name="pAddress" label="">
                    <Input placeholder="Permanent Address" />
                  </Form.Item>
                  <Form.Item name="email" label="">
                    <Input placeholder="EmailId" />
                  </Form.Item>
                  <Form.Item name="qualification" label="">
                    <Input placeholder="Qualification" />
                  </Form.Item>
                  <Form.Item name="designation" label="">
                    <Input placeholder="Designation" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Add Employee
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
