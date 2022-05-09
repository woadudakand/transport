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
      title: 'Articles',
      dataIndex: 'articles',
      key: 'articles',
    },
    {
      title: 'No. Articles',
      dataIndex: 'noArticles',
      key: 'noArticles',
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actual Weight',
      dataIndex: 'actualWeight',
      key: 'actualWeight',
    },
    {
      title: 'Rate Per',
      dataIndex: 'ratePer',
      key: 'ratePer',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Freight',
      dataIndex: 'freight',
      key: 'freight',
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

  return (
    <>
      <PageHeader ghost title="Lorry Receipt Details" />
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
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item name="lrNo" label="LR No:">
                    <Input placeholder="LR No: " />
                  </Form.Item>
                  <Form.Item name="date" label="Date">
                    <DatePicker style={{ width: '100%' }} placeholder="date" />
                  </Form.Item>
                  <Form.Item name="invoice" label="Invoice No:">
                    <Input placeholder="Invoice No:" />
                  </Form.Item>
                  <Form.Item initialValue="MH 13 AA 1881" name="state" label="Truck/Tempo No:">
                    <Select>
                      <Select.Option value="MH 13 AA 1881">MH 13 AA 1881</Select.Option>
                      <Select.Option value="MH12GH2370">MH12GH2370</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item initialValue="Ravi" name="fromConsignor" label="Consignor">
                    <Select>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="fromGst" label="Consignor's GST No">
                    <Input placeholder="Consignor's GST No" />
                  </Form.Item>
                  <Form.Item name="fromAddress" label="Consignee Address:">
                    <Input placeholder="Consignee Address:" />
                  </Form.Item>

                  <Form.Item initialValue="pune" name="from" label="From">
                    <Select>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>

                  {/* <Form.Item initialValue="kallam" name="to" label="To">
                    <Select>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item> */}
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item initialValue="Ravi" name="toConsignor" label="Consignor">
                    <Select>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="toGst" label="Consignor's GST No">
                    <Input placeholder="Consignor's GST No" />
                  </Form.Item>
                  <Form.Item name="toAddress" label="Consignee Address:">
                    <Input placeholder="Consignee Address:" />
                  </Form.Item>

                  <Form.Item initialValue="pune" name="to" label="To">
                    <Select>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={12} sm={12} xs={24}>
                  {/* <Form.Item initialValue="" name="consignee" label="Consignee">
                    <Select>
                      <Select.Option value="">Select Consignee</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item> */}
                  <Form.Item initialValue="" name="delivery" label="Delivery At:">
                    <Select>
                      <Select.Option value="">Select Deliver Person</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="address" label="Address:">
                    <Input placeholder="Delivery Address" />
                  </Form.Item>
                  <Form.Item name="city" label="City:">
                    <Input placeholder="City" />
                  </Form.Item>
                  {/* <Form.Item name="gst" label="GST No">
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
                  </Form.Item> */}
                </Col>
                {/* <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item initialValue="" name="delivery" label="Delivery At:">
                    <Select>
                      <Select.Option value="">Select Deliver Person</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col style={{ marginBottom: '20px' }} md={12} sm={12} xs={24}>
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Transactions Details">
                    {/* <Input name="name" value={info.name} onChange={handleChange} placeholder="Contact Person Name" />{' '} */}
                    <Form.Item initialValue="Articles" name="articles">
                      <Select
                        // showSearch
                        // style={{ cursor: 'pointer' }}
                        // optionFilterProp="children"
                        // filterOption={(input, option) =>
                        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                        // filterSort={(optionA, optionB) =>
                        //   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        // }
                        // placeholder="Articles"
                        // value={info.articles}
                        value={info.articles}
                      >
                        <Select.Option value="pune">Box</Select.Option>
                        <Select.Option value="bag">Bag</Select.Option>
                        <Select.Option value="buccket">buccket</Select.Option>
                        <Select.Option value="buckets">Buckets</Select.Option>
                        <Select.Option value="yogini">yogini</Select.Option>
                        <Select.Option value="pramod">pramod</Select.Option>
                      </Select>
                    </Form.Item>
                    {/* <br /> <br /> */}
                    <Input
                      name="noArticles"
                      value={info.noArticles}
                      onChange={handleChange}
                      placeholder="No. Articles"
                      type="number"
                    />
                    <br /> <br />
                    <Input
                      name="description"
                      value={info.description}
                      onChange={handleChange}
                      placeholder="Description"
                    />
                    {/* <br /> <br />
                    <Input
                      name="designation"
                      value={info.designation}
                      onChange={handleChange}
                      placeholder="Designation"
                    /> */}
                    <br /> <br />
                    <Input
                      name="weight"
                      value={info.weight}
                      onChange={handleChange}
                      placeholder="Weight"
                      type="number"
                    />
                    <br /> <br />
                    <Form.Item initialValue="Rate Per" name="ratePer">
                      <Select value={info.ratePer}>
                        <Select.Option value="pune">Fixed</Select.Option>
                        <Select.Option value="bag">Kg</Select.Option>
                        <Select.Option value="buccket">Case</Select.Option>
                      </Select>
                    </Form.Item>
                    <Input
                      name="rate"
                      value={info.rate}
                      onChange={handleChange}
                      placeholder="Rate"
                      type="number"
                      disabled
                    />
                    <br /> <br />
                    <Input
                      name="freight"
                      value={info.freight}
                      onChange={handleChange}
                      placeholder="Freight"
                      type="disable"
                    />
                    <br /> <br />
                    <Button onClick={handleContactInfo} size="large" type="primary">
                      {!edit ? 'Add New' : 'Update'}
                    </Button>
                  </Cards>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={24} sm={24}>
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

              {/* <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Add Customer
                </Button>
              </Form.Item> */}
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SavePlaces;
