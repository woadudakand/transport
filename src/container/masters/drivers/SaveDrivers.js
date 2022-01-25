import React from 'react';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';

import { Main, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const SaveDrivers = () => {
  const [form] = Form.useForm();

  const handleFinish = values => {
    console.log({
      ...values,
    });
  };

  return (
    <>
      <PageHeader ghost title="Save Drivers" />
      <Main>
        <Cards headless>
          <BasicFormWrapper>
            <Form form={form} name="createProject" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item name="name" label="">
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item name="birth" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                  <Form.Item name="referenced" label="">
                    <Input placeholder="Referenced By" />
                  </Form.Item>
                  <Form.Item initialValue="" name="licenseType" label="">
                    <Select>
                      <Select.Option value="">Select License Type</Select.Option>
                      <Select.Option value="Higher-Heavy">Higher-Heavy</Select.Option>
                      <Select.Option value="Heavy">Heavy</Select.Option>
                      <Select.Option value="Non-Heavy">Non-Heavy</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                    </Select>
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
                  <Form.Item name="remark" label="">
                    <Input placeholder="Remark" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item name="address" label="">
                    <Input placeholder="Correspondence Address" />
                  </Form.Item>
                  <Form.Item name="eyesight" label="">
                    <Input placeholder="Eyesight" />
                  </Form.Item>
                  <Form.Item name="telephone" label="">
                    <Input placeholder="Telephone" />
                  </Form.Item>
                  <Form.Item name="qualification" label="">
                    <Input placeholder="Qualification" />
                  </Form.Item>
                  <Form.Item name="renew" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="Renew Date" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item name="pAddress" label="">
                    <Input placeholder="Permanent Address" />
                  </Form.Item>
                  <Form.Item name="fName" label="">
                    <Input placeholder="Father Name" />
                  </Form.Item>
                  <Form.Item name="licenseNo" label="">
                    <Input placeholder="License No." />
                  </Form.Item>
                  <Form.Item name="join" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="Joining Date" />
                  </Form.Item>
                  <Form.Item name="expiry" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="Expiry Date" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Add Driver
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SaveDrivers;
