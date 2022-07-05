import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select, Table, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import indianStates from '../../../demoData/indianStats.json';
import { getBranchListDispatch } from '../../../redux/branch/actionCreator';
import { customerAddDispatch } from '../../../redux/customers/actionCreator';

const SaveCustomers = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { branches, isLoading } = useSelector(state => {
    return {
      branches: state.branches.list,
      isLoading: state.customer.loading,
    };
  });

  const handleFinish = async values => {
    
    dispatch(
      customerAddDispatch({
        customers: { ...values, created_at: moment().format('YYYY-MM-DD') },
        customerReferences: dataSource,
        },
        function() {},
      ),
    );
  };
  const infoTableData = [];

  const handleInfoDelete = key => {
    const newData = dataSource.filter((_, index) => index !== key);
    setDataSource(newData);
  };

  const handleInfoEdit = (data, key) => {
    setInfo(data);
    setEdit(key + 1);
  };

  useEffect(() => {
    if (dispatch) {
      dispatch(getBranchListDispatch());
    }
  }, [dispatch]);

  console.log(infoTableData);

  dataSource.map(({ name, email, designation, address, mobile }, key) => {
    return infoTableData.push({
      key,
      sn: key + 1,
      name,
      email,
      designation,
      address,
      mobile,
      action: (
        <div className="table-actions">
          <Link
            onClick={() => handleInfoEdit({ name, email, designation, address, mobile }, key)}
            to="#"
            className="edit"
          >
            <FeatherIcon icon="edit" size={14} />
          </Link>
          <Link onClick={() => handleInfoDelete(key)} to="#" className="delete">
            <FeatherIcon icon="trash-2" size={14} />
          </Link>
        </div>
      ),
    });
  });

  const columns = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const handleChange = e => {
    setInfo({
      ...info,
      [e.currentTarget.name]: e.currentTarget.value,
      created_at: moment().format('YYYY-MM-DD'),
    });
  };

  const handleContactInfo = () => {
    if (!edit) {
      setDataSource([...dataSource, info]);
      setInfo({});
    } else {
      const newData = dataSource.map((item, index) => {
        if (index === edit - 1) {
          const newItem = item;
          newItem.name = info.name;
          newItem.address = info.address;
          newItem.mobile = info.mobile;
          newItem.email = info.email;
          newItem.designation = info.designation;
          setEdit(false);
          setInfo({});
          return newItem;
        }
        setEdit(false);
        setInfo({});
        return item;
      });
      setDataSource(newData);
    }
  };

  const gotoView = () => {
    history.replace('/admin/customers');
  };

  return (
    <>
      <PageHeader
        ghost
        title="Save Customer"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={gotoView} size="small" type="primary">
              View Page
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <p />
          <Form form={form} name="customer" onFinish={handleFinish}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Select Branch',
                },
              ]}
              name="branchs_id"
              label=""
              initialValue=""
            >
              <Select style={{ width: '250px' }}>
                <Select.Option value="">Select Branch</Select.Option>
                {branches.map(item => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Row>
        <Cards headless>
          <BasicFormWrapper>
            <Form form={form} name="customer" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input customer name',
                      },
                    ]}
                    name="customer_name"
                    label="Customer Name"
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input fax no',
                      },
                    ]}
                    name="faxno"
                    label="Fax No"
                  >
                    <Input placeholder="Fax No" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select state',
                      },
                    ]}
                    initialValue=""
                    name="states"
                    label="Select State"
                  >
                    <Select>
                      <Select.Option value="">Select State</Select.Option>
                      {Object.keys(indianStates).map(key => {
                        return (
                          <Select.Option key={key} value={key}>
                            {indianStates[key]}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input vendor code',
                      },
                    ]}
                    name="vendorcode"
                    label="Vendor Code"
                  >
                    <Input placeholder="Vendor Code" />
                  </Form.Item>
                  <Row gutter={15}>
                    <Col xs={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Your Opening Balance',
                          },
                        ]}
                        name="opening_balance"
                        label="Opening Balance"
                      >
                        <Input placeholder="Opening Balance" />
                      </Form.Item>
                    </Col>
                    <Col xs={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Select card',
                          },
                        ]}
                        name="payment_type"
                        initialValue=""
                        label="Select Card"
                      >
                        <Select>
                          <Select.Option value="">Select Card</Select.Option>
                          <Select.Option value="credit">Credit</Select.Option>
                          <Select.Option value="debit">Debit</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input address',
                      },
                    ]}
                    name="correspondence_address"
                    label="Correspondence Address"
                  >
                    <Input placeholder="correspondence Address" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input CST',
                      },
                    ]}
                    name="cstno"
                    label="CST No."
                  >
                    <Input placeholder="CST No." />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select city',
                      },
                    ]}
                    initialValue=""
                    name="city"
                    label="Select City"
                  >
                    <Select>
                      <Select.Option value="">Select City</Select.Option>
                      <Select.Option value="Pune">Pune</Select.Option>
                      <Select.Option value="Kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="vatno" label="Vat No">
                    <Input placeholder="Vat No" />
                  </Form.Item>

                  <Row gutter={15}>
                    <Col xs={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Input Closing Balance',
                          },
                        ]}
                        name="closing_balance"
                        label="Closing Balance"
                      >
                        <Input placeholder="Closing Balance" />
                      </Form.Item>
                    </Col>
                    <Col xs={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Select Card',
                          },
                        ]}
                        name="closing_payment_type"
                        initialValue=""
                        label="Select Card"
                      >
                        <Select>
                          <Select.Option value="">Select Card</Select.Option>
                          <Select.Option value="credit">Credit</Select.Option>
                          <Select.Option value="debit">Debit</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Must required telephone',
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
                        message: 'Must required gst',
                      },
                    ]}
                    name="gstno"
                    label="GST No."
                  >
                    <Input placeholder="GST No." />
                  </Form.Item>
                  <Form.Item
                    name="customer_email"
                    rules={[
                      {
                        required: true,
                        message: 'Must required telephone',
                      },
                      {
                        type: 'email',
                      },
                    ]}
                    label="Email"
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item name="eccno" label="ECC No">
                    <Input placeholder="ECC No" />
                  </Form.Item>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Contact Person">
                    <Input name="name" value={info.name} onChange={handleChange} placeholder="Contact Person Name" />{' '}
                    <br /> <br />
                    <Input name="address" value={info.address} onChange={handleChange} placeholder="Address" />
                    <br /> <br />
                    <Input name="email" value={info.email} onChange={handleChange} placeholder="Email" />
                    <br /> <br />
                    <Input
                      name="designation"
                      value={info.designation}
                      onChange={handleChange}
                      placeholder="Designation"
                    />
                    <br /> <br />
                    <Input name="mobile" value={info.mobile} onChange={handleChange} placeholder="Mobile" />
                    <br /> <br />
                    <Button onClick={handleContactInfo} size="large" type="primary">
                      {!edit ? 'Add New' : 'Update'}
                    </Button>
                  </Cards>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={16} sm={24}>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      className="table-responsive"
                      pagination={false}
                      dataSource={infoTableData}
                      columns={columns}
                    />
                  </TableWrapper>
                </Col>
              </Row>

              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Add Customer {isLoading && <Spin />}
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SaveCustomers;
