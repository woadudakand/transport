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
                  <Form.Item name="name" label="Driver Name">
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item name="birth" label="Date of Birth">
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                  <Form.Item name="reference" label="Referenced By">
                    <Input placeholder="Referenced By" />
                  </Form.Item>
                  <Form.Item initialValue="" name="licenseType" label="License Type">
                    <Select>
                      <Select.Option value="">Select License Type</Select.Option>
                      <Select.Option value="Higher-Heavy">Higher-Heavy</Select.Option>
                      <Select.Option value="Heavy">Heavy</Select.Option>
                      <Select.Option value="Non-Heavy">Non-Heavy</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item initialValue="" name="blood" label="Blood Group">
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
                  <Form.Item name="remark" label="Remark">
                    <Input placeholder="Remark" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item name="cAddress" label="Correspondence Address">
                    <Input placeholder="Correspondence Address" />
                  </Form.Item>
                  <Form.Item initialValue="" name="eyesight" label="Eyesight">
                    <Select>
                      <Select.Option value="">Select</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                      <Select.Option value="Good">Good</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="telephone" label="Telephone">
                    <Input placeholder="Telephone" />
                  </Form.Item>
                  <Form.Item name="qualifications" label="Qualification">
                    <Input placeholder="Qualification" />
                  </Form.Item>
                  <Form.Item name="renew" label="Renew Date">
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item name="pAddress" label="Permanent Address">
                    <Input placeholder="Permanent Address" />
                  </Form.Item>
                  <Form.Item name="fName" label="Father Name">
                    <Input placeholder="Father Name" />
                  </Form.Item>
                  <Form.Item name="license" label="License No.">
                    <Input placeholder="License No." />
                  </Form.Item>
                  <Form.Item name="joinDate" label="Join Date">
                    <DatePicker style={{ width: '100%' }} placeholder="Joining Date" />
                  </Form.Item>
                  <Form.Item name="expireDate" label="Expiry Date">
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
