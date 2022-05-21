import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, Radio, Space, Divider, Checkbox, InputNumber } from 'antd';
import moment from 'moment';
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
      title: 'T.H.C No',
      dataIndex: 'thcNO',
      key: 'thcNO',
    },
    {
      title: 'Date',
      dataIndex: 'paDate',
      key: 'paDate',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Remain',
      dataIndex: 'remain',
      key: 'remain',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
  ];

  // Checkbox system
  const onCheckChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  // Input number Change
  const onInputChange = value => {
    console.log('changed', value);
  };

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const [radioValue, setRadioValue] = useState(1);

  const onRadioChange = e => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  const { TextArea } = Input;

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
      <PageHeader ghost title="Payment Advice" />
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
            <Form form={form} name="paymentCollection" onFinish={handleFinish}>
              <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <div style={{display: 'flex', justifyContent: "space-between"}}> */}
                {/* <Col md={8} sm={12}> */}
                  {/* <Form.Item initialValue="Select Type" name="type" label="Type ">
                    <Select>
                      <Select.Option value="Bill">Bill</Select.Option>
                      <Select.Option value="ToPay">To Pay</Select.Option>
                    </Select>
                  </Form.Item> */}
                {/* </Col> */}
                <Col md={18} sm={12}>
                  <Form.Item initialValue="Select Supplier" name="supplier" label="Supplier Name ">
                    <Select>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                      <Select.Option value="Name">Name</Select.Option>
                      <Select.Option value="Any Name">Any Name</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={6} sm={12}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    Show Bills
                  </Button>
                </Col>
              </Row>
              <Divider />
              <br />
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={18} sm={24}>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      className="table-responsive"
                      pagination={false}
                      dataSource={infoTableData}
                      columns={columns}
                    />
                  </TableWrapper>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={6} sm={24}>
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Bill Details">
                    <Form.Item name="date" label="Date ">
                      {/* <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} /> */}
                      <DatePicker
                        defaultValue={moment('01/01/2015', dateFormatList[0])}
                        format={dateFormatList}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    <Form.Item name="outstanding" label="Outstanding">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="paid" label="Paid">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item initialValue="Select Branch" name="payMode" label="Pay Mode">
                      {/* <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} /> */}
                      <Select>
                        <Select.Option value="Pune">Cash</Select.Option>
                        <Select.Option value="Lakhno">Cheque</Select.Option>
                        <Select.Option value="neftRtgs">NEFT / RTGS</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="bankName" label="Bank Name">
                      <Input placeholder="Bank Name" />
                    </Form.Item>
                    <Form.Item name="chequeNo" label="Cheque No">
                      <Input placeholder="Cheque No" type=" number " />
                    </Form.Item>
                    <Form.Item name="chequeDate" label="Cheque Date">
                      <DatePicker
                        defaultValue={moment('01/01/2015', dateFormatList[0])}
                        format={dateFormatList}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Cards>
                </Col>
              </Row>
              <br /> <br />
              <Row gutter={24}>
                <Col md={12}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    Save
                  </Button>
                </Col>
                <Col md={12}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    Cancle
                  </Button>
                </Col>
              </Row>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SavePlaces;
