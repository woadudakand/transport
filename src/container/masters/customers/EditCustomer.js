import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select, Table, notification, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { DataService } from '../../../config/dataService/dataService';
import DataLoader from '../../../components/utilities/DataLoader';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

const UpdatePlaces = () => {
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const [info, setInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [branch, setBranch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        setLoading(true);
        const res = await DataService.get(`/customer/updateData?id=${id}`);

        setLoading(false);
        if (res.data.status === 200) {
          setEditData(res.data.data[0]);
          setBranch(res.data.data[0].branch);
          setDataSource(JSON.parse(res.data.data[0].contactPerson));
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    if (pathname) {
      getDataFromServer();
    }
  }, [pathname, id]);

  const handleFinish = async values => {
    const customer = {
      ...values,
      id,
      branch,
      oBalance: JSON.stringify({
        balance: values.oBalance,
        card: values.oCard,
      }),
      cBalance: JSON.stringify({
        balance: values.cBalance,
        card: values.cCard,
      }),
      contactPerson: JSON.stringify(dataSource),
    };

    try {
      setLoading(true);

      const res = await DataService.put('/customer', customer);
      if (res.data.status === 200) {
        openNotificationWithIcon('success', res.data.message, res.data.description);
        setLoading(false);
        setEditData(res.data.data[0]);
      } else {
        setLoading(false);
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      openNotificationWithIcon('error', 'Update Customer!', err.toString());
    }
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

  dataSource.map(({ name, email, designation, address, mobile }, key) => {
    return infoTableData.push({
      key: key + 1,
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

  const handleBranch = value => {
    setBranch(value);
  };

  return (
    <>
      <PageHeader ghost title="Update Customer" />
      {editData ? (
        <Main>
          <Row justify="space-between" style={{ marginBottom: 20 }}>
            <p />
            <Select defaultValue={branch} value={branch} onChange={handleBranch} style={{ width: '250px' }}>
              <Select.Option value="">Select Branch</Select.Option>
              <Select.Option value="pune">Pune</Select.Option>
              <Select.Option value="kallam">Kallam</Select.Option>
            </Select>
          </Row>
          <Cards headless>
            <BasicFormWrapper>
              <Form form={form} name="createProject" onFinish={handleFinish}>
                <Row gutter={24}>
                  <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                    <Form.Item initialValue={editData.name} name="name" label="Customer Name">
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item name="fax" initialValue={editData.fax} label="Fax No">
                      <Input placeholder="Fax No" />
                    </Form.Item>
                    <Form.Item initialValue={editData.state} name="state" label="Select State">
                      <Select>
                        <Select.Option value="">Select State</Select.Option>
                        <Select.Option value="pune">Pune</Select.Option>
                        <Select.Option value="kallam">Kallam</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item initialValue={editData.vCode} name="vCode" label="Vendor Code">
                      <Input placeholder="Vendor Code" />
                    </Form.Item>
                    <Row gutter={15}>
                      <Col xs={12}>
                        <Form.Item
                          initialValue={JSON.parse(editData.oBalance).balance}
                          name="oBalance"
                          label="Opening Balance"
                        >
                          <Input placeholder="Opening Balance" />
                        </Form.Item>
                      </Col>
                      <Col xs={12}>
                        <Form.Item initialValue={JSON.parse(editData.oBalance).card} name="oCard" label="Select Card">
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
                      initialValue={editData.correspondenceAddress}
                      name="correspondenceAddress"
                      label="Correspondence Address"
                    >
                      <Input placeholder="correspondence Address" />
                    </Form.Item>
                    <Form.Item initialValue={editData.cst} name="cst" label="CST No.">
                      <Input placeholder="CST No." />
                    </Form.Item>
                    <Form.Item initialValue={editData.city} name="city" label="Select City">
                      <Select>
                        <Select.Option value="">Select City</Select.Option>
                        <Select.Option value="pune">Pune</Select.Option>
                        <Select.Option value="kallam">Kallam</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="vat" initialValue={editData.vat} label="Vat No">
                      <Input placeholder="Vat No" />
                    </Form.Item>

                    <Row gutter={15}>
                      <Col xs={12}>
                        <Form.Item
                          name="cBalance"
                          initialValue={JSON.parse(editData.cBalance).balance}
                          label="Closing Balance"
                        >
                          <Input placeholder="Closing Balance" />
                        </Form.Item>
                      </Col>
                      <Col xs={12}>
                        <Form.Item name="cCard" initialValue={JSON.parse(editData.cBalance).card} label="Select Card">
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
                    <Form.Item name="telephone" initialValue={editData.telephone} label="Telephone">
                      <Input placeholder="Telephone" />
                    </Form.Item>
                    <Form.Item name="gst" initialValue={editData.gst} label="GST No.">
                      <Input placeholder="GST No." />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: 'email',
                        },
                      ]}
                      label="Email"
                      initialValue={editData.email}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="ecc" initialValue={editData.ecc} label="ECC No">
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
                    Update Customer {isLoading && <Spin />}
                  </Button>
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </Cards>
        </Main>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default UpdatePlaces;