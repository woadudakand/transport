import React, { useState, useEffect } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import dayjs from 'dayjs';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { updateSupplier, getSingleSupplierDispatch } from '../../../redux/supplier/actionCreator';

const EditSupplier = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, suppliers } = useSelector(state => {
    return {
      isLoading: state.suppliers.loading,
      suppliers: state.suppliers.suppliers,
    };
  });

  const gotoView = () => {
    history.replace('/admin/supplier');
  };

  const handleFinish = async values => {
    dispatch(
      updateSupplier(
        {
          suppliersData: { ...values, id, updated_at: moment().format('YYYY-MM-DD') },
          suplierDetailsData: dataSource,
        },
        () => {
          gotoView();
        },
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
      dispatch(getSingleSupplierDispatch(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (suppliers[0]) {
      setDataSource(suppliers[0].suppliers_contact_person_details);
      form.setFieldsValue({
        ...suppliers[0],
        opening_balance_date: dayjs(suppliers[0].opening_balance_date, 'YYYY-MM-DD'),
        closing_balance_date: dayjs(suppliers[0].closing_balance_date, 'YYYY-MM-DD'),
      });
    }
  }, [suppliers, form]);

  dataSource.map(({ name, email, designation, address, mobile }, key) => {
    return infoTableData.push({
      sn: key + 1,
      key: key + 1,
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
      updated_at: moment().format('YYYY-MM-DD'),
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

  return (
    <>
      <PageHeader
        ghost
        title="Update Supplier"
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
            <Form form={form} name="updateProject" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input supplier name',
                      },
                    ]}
                    name="supplier_name"
                    label="Supplier Name"
                  >
                    <Input placeholder="Supplier Name" />
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
                    <Input placeholder="Address" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select supplier type',
                      },
                    ]}
                    initialValue=""
                    name="supplier_type"
                    label="Supplier Type"
                  >
                    <Select>
                      <Select.Option value="">Supplier Type</Select.Option>
                      <Select.Option value="Vehicle">Vehicle</Select.Option>
                      <Select.Option value="Garage">Garage</Select.Option>
                      <Select.Option value="Pump">Pump</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Select state',
                      },
                    ]}
                    initialValue=""
                    name="state"
                    label="Select State"
                  >
                    <Select>
                      <Select.Option value="">Select State</Select.Option>
                      <Select.Option value="Pune">Pune</Select.Option>
                      <Select.Option value="Kolkata">Kolkata</Select.Option>
                      <Select.Option value="Rajastan">Rajastan</Select.Option>
                    </Select>
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
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input telephone number',
                      },
                    ]}
                    name="telephone"
                    label="Telephone"
                  >
                    <Input placeholder="Telephone" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Input Email',
                      },
                      {
                        type: 'email',
                      },
                    ]}
                    label="Email"
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input PAN no',
                      },
                    ]}
                    name="pan_no"
                    label="PAN No"
                  >
                    <Input placeholder="PAN No" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input vendor code',
                      },
                    ]}
                    name="vendor_code"
                    label="Vendor Code"
                  >
                    <Input placeholder="Vendor Code" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input CST No',
                      },
                    ]}
                    name="cst_no"
                    label="CST No"
                  >
                    <Input placeholder="CST No." />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input Vat No',
                      },
                    ]}
                    name="vat_no"
                    label="Vat No"
                  >
                    <Input placeholder="Vat No." />
                  </Form.Item>

                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Input ECC No',
                      },
                    ]}
                    name="ecc_no"
                    label="ECC No"
                  >
                    <Input placeholder="ECC No" />
                  </Form.Item>
                  <Row gutter={15}>
                    <Col xs={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Input opening balance',
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
                            message: 'Select Card',
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
                    <Col style={{ margin: '25px 0' }} xs={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Select Date',
                          },
                        ]}
                        name="opening_balance_date"
                        label="Date "
                      >
                        <DatePicker style={{ width: '100%' }} placeholder="yyyy/mm/dd" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={15}>
                    <Col xs={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Input closing balance',
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
                        name="closing_balance_type"
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
                    <Col style={{ marginTop: '20px' }} xs={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Select Date',
                          },
                        ]}
                        name="closing_balance_date"
                        label="Date"
                      >
                        <DatePicker style={{ width: '100%' }} placeholder="Date" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Contact Person">
                    <Input name="name" value={info.name} onChange={handleChange} placeholder="Person Name" /> <br />
                    <br />
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
                  Update Supplier {isLoading && <Spin />}
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default EditSupplier;
