import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const SavePlaces = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleFinish = values => {
    console.log({
      ...values,
      openBalance: {
        balance: values.oBalance,
        card: values.oCard,
      },
      info: dataSource,
    });
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
      title: 'Consign No',
      dataIndex: 'consignNo',
      key: 'consignNo',
    },
    {
      title: 'Consignor',
      dataIndex: 'consignor',
      key: 'consignor',
    },

    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Consignee',
      dataIndex: 'consignee',
      key: 'consignee',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'To Pay',
      dataIndex: 'toPay',
      key: 'toPay',
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

  return (
    <>
      <PageHeader ghost title="Loading Slip Details" />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <p />
          <Select style={{ width: '250px' }} defaultValue="">
            <Select.Option value="">Select Branch</Select.Option>
            <Select.Option value="pune">Pune</Select.Option>
            <Select.Option value="kallam">Kallam</Select.Option>
          </Select>
        </Row>
        <Cards headless>
          <BasicFormWrapper>
            <Form form={form} name="lorryReceipt" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={12} sm={12}>
                  <Form.Item name="memoNo" label="Memo No:">
                    <Input placeholder="Memo No: " />
                  </Form.Item>
                  <Form.Item name="date" label="Date">
                    <DatePicker style={{ width: '100%' }} placeholder="date" />
                  </Form.Item>
                  <Form.Item initialValue="MH 13 AA 1881" name="state" label="Vehicle No:">
                    <Select>
                      <Select.Option value="MH 13 AA 1881">MH 13 AA 1881</Select.Option>
                      <Select.Option value="MH12GH2370">MH12GH2370</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="invoice" label="Vehicle Owner:">
                    <Input placeholder="Vehicle Owner" />
                  </Form.Item>
                  <Form.Item name="address" label="Owner Address:">
                    <Input placeholder="Owner Address:" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={12} sm={12}>
                  <Form.Item initialValue="MH 13 AA 1881" name="state" label="Driver Name">
                    <Select>
                      <Select.Option value="Any Driver name">Any Driver name</Select.Option>
                      <Select.Option value="MH12GH2370">MH12GH2370</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="lno" label="License no:">
                    <Input placeholder="License Number" />
                  </Form.Item>
                  <Form.Item name="mob" label="Mobile No">
                    <Input placeholder="Mobile No." />
                  </Form.Item>
                  <Form.Item initialValue="pune" name="from" label="From">
                    <Select>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item initialValue="kallam" name="to" label="To">
                    <Select>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item initialValue="" name="consignee" label="Consignee">
                    <Select>
                      <Select.Option value="">Select Consignee</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="telephone" label="Telephone">
                    <Input placeholder="Telephone" />
                  </Form.Item>
                  <Form.Item name="gst" label="GST No">
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
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item name="ecc" label="ECC No">
                    <Input placeholder="ECC No" />
                  </Form.Item>
                </Col> */}
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
                  Add Customer
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SavePlaces;
