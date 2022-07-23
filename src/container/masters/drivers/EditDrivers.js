import React, { useEffect } from 'react';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Main, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { updateDriver, getDriverSingle } from '../../../redux/driver/actionCreator';

const UpdateDrivers = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, driver } = useSelector(state => {
    return {
      isLoading: state.driver.loading,
      driver: state.driver.driver,
    };
  });
  const { id } = useParams();
  useEffect(() => {
    if (dispatch) {
      dispatch(getDriverSingle(id));
    }
  }, [dispatch, id]);

  const gotoView = () => {
    history.replace('/admin/drivers');
  };

  const handleFinish = async values => {
    const customValues = {
      name: values.name,
    };

    if (customValues.name) {
      dispatch(
        updateDriver({ ...values, id, updated_at: moment().format('YYYY-MM-DD') }, () => {
          gotoView();
        }),
      );
    }

    // if (customValues.name) {
    //   dispatch(updateDriver({ ...values, id, updated_at: moment().format('YYYY-MM-DD') }));
    // }
  };

  useEffect(() => {
    if (driver[0]) {
      form.setFieldsValue({
        ...driver[0],
        joiningdate: dayjs(driver[0].joiningdate, 'YYYY-MM-DD'),
        dob: dayjs(driver[0].dob, 'YYYY-MM-DD'),
        renewdate: dayjs(driver[0].renewdate, 'YYYY-MM-DD'),
        expirydate: dayjs(driver[0].expirydate, 'YYYY-MM-DD'),
      });
    }
  }, [driver, form]);

  return (
    <>
      <PageHeader
        ghost
        title="Edi Driver"
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
            <Form form={form} name="editDriver" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input driver name',
                      },
                    ]}
                    name="name"
                    label="Driver Name"
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select birth date',
                      },
                    ]}
                    name="dob"
                    label="Date of Birth"
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                  <Form.Item name="referenced" label="Referenced By">
                    <Input placeholder="Referenced By" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select License Type',
                      },
                    ]}
                    initialValue=""
                    name="licensetype"
                    label="License Type"
                  >
                    <Select>
                      <Select.Option value="">Select License Type</Select.Option>
                      <Select.Option value="Higher-Heavy">Higher-Heavy</Select.Option>
                      <Select.Option value="Heavy">Heavy</Select.Option>
                      <Select.Option value="Non-Heavy">Non-Heavy</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                    </Select>
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
                  <Form.Item name="remark" label="Remark">
                    <Input placeholder="Remark" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
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
                        message: 'Select eye sight',
                      },
                    ]}
                    initialValue=""
                    name="eyesight"
                    label="Eyesight"
                  >
                    <Select>
                      <Select.Option value="">Select</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                      <Select.Option value="Good">Good</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Telephone',
                      },
                    ]}
                    name="telephone"
                    label="Telephone"
                  >
                    <Input placeholder="Telephone" />
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
                  <Form.Item name="renewdate" label="Renew Date">
                    <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
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
                        message: 'Input Father Name',
                      },
                    ]}
                    name="father_name"
                    label="Father Name"
                  >
                    <Input placeholder="Father Name" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input License Number',
                      },
                    ]}
                    name="licenseno"
                    label="License No."
                  >
                    <Input placeholder="License No." />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select Join date',
                      },
                    ]}
                    name="joiningdate"
                    label="Join Date"
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="Joining Date" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select expire date',
                      },
                    ]}
                    name="expirydate"
                    label="Expiry Date"
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="Expiry Date" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="">
                {isLoading ? (
                  <Button type="white">Loading....</Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Update Driver
                  </Button>
                )}
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default UpdateDrivers;
