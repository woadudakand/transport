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
      title: 'Bill No',
      dataIndex: 'billNo',
      key: 'billNo',
    },
    {
      title: 'Bill Date',
      dataIndex: 'billDate',
      key: 'billDate',
    },

    {
      title: 'Total Bill Amount',
      dataIndex: 'tba',
      key: 'tba',
    },
    {
      title: 'Remain',
      dataIndex: 'remain',
      key: 'remain',
    },
    {
      title: 'Received',
      dataIndex: 'received',
      key: 'received',
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
      <PageHeader ghost title="Payment Collection" />
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
                  <Form.Item initialValue="Select Type" name="type" label="Type ">
                    <Select>
                      <Select.Option value="Bill">Bill</Select.Option>
                      <Select.Option value="ToPay">To Pay</Select.Option>
                    </Select>
                  </Form.Item>
                {/* </Col> */}
                {/* <Col md={8} sm={12}> */}
                  <Form.Item initialValue="Select Customer" name="customer" label="Customer Name ">
                    <Select>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                      <Select.Option value="Name">Name</Select.Option>
                      <Select.Option value="Any Name">Any Name</Select.Option>
                    </Select>
                  </Form.Item>
                {/* </Col> */}
                {/* <Col md={8} sm={12}> */}
                  <Button style={{ margin: 'auto 30px' }} type="primary">
                    Show Bills
                  </Button>
                {/* </Col> */}
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
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Charges">
                    <Form.Item name="totalToPay" label="Total to Pay">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="billed" label="Total Billed">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="hire" label="Hire Rs">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="advance" label="Advance Rs">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="commision" label="Commision">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="hamali" label="Hamali">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="stackingRs" label="StackingRs">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="total" label="Total">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                  </Cards>
                </Col>
              </Row>
              <br /> <br />
              <Row gutter={24}>
                <Col md={12}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    Add
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
