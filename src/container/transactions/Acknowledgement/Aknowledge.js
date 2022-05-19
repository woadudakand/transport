import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, Radio, Space, Divider, Checkbox } from 'antd';
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

  // Checkbox system
  const onCheckChange = e => {
    console.log(`checked = ${e.target.checked}`);
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
      <PageHeader ghost title="LR Aknowledge" />
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
            <Form form={form} name="aknowledge" onFinish={handleFinish}>
              <Row gutter={24}>
                {/* <div style={{display: 'flex', justifyContent: "space-between"}}> */}
                <Col md={18} sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item name="from" label="From" style={{ width: '100%', marginRight: '15px' }}>
                    <DatePicker
                      defaultValue={moment('01/01/2015', dateFormatList[0])}
                      format={dateFormatList}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item name="to" label="To" style={{ width: '100%', marginLeft: '15px' }}>
                    <DatePicker
                      defaultValue={moment('10/02/2015', dateFormatList[0])}
                      format={dateFormatList}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Button style={{ margin: 'auto 30px' }} type="primary">
                    Go
                  </Button>
                </Col>
                {/* </div> */}
                <Col md={6} sm={12} style={{ margin: 'auto' }}>
                  <Radio.Group onChange={onRadioChange} value={radioValue}>
                    {/* <Space direction="vertical"> */}
                    <Radio value={1}>All</Radio>
                    <Radio value={2}>Loaded</Radio>
                    <Radio value={3}>Un Loaded</Radio>
                    {/* </Space> */}
                  </Radio.Group>
                </Col>
              </Row>
              <Divider />
              <Row gutter={24}>
                <Col md={8}>
                  <Form.Item name="srNo" label="SR No:">
                    <Input placeholder="SR No: " />
                  </Form.Item>
                  <Form.Item name="unLoadDate" label="Unload Date:">
                    <DatePicker style={{ width: '100%' }} placeholder="date" />
                  </Form.Item>
                  <Form.Item initialValue="Select Branch" name="state" label="Unload No:">
                    <Select>
                      <Select.Option value="Pune">Pune</Select.Option>
                      <Select.Option value="Lakhno">Lakhno</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="paidAmount" label="To Paid Amount: ">
                    <Input placeholder="" />
                  </Form.Item>
                  <Checkbox onChange={onCheckChange}>Given To Driver</Checkbox>
                </Col>
                <Col md={8}>
                  <Form.Item name="freightNo" label="freight Memo No:">
                    <Input placeholder="freight Memo No: " />
                  </Form.Item>
                  <Form.Item name="deliveryDate" label="Delivery Date:">
                    <DatePicker style={{ width: '100%' }} placeholder="date" />
                  </Form.Item>
                  <Form.Item initialValue="Pay Type" name="state" label="Pay Type">
                    <Select>
                      <Select.Option value="Bank">Bank</Select.Option>
                      <Select.Option value="Card">Card</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="paidAmount" label="To Paid Amount: ">
                    <TextArea rows={4} />
                  </Form.Item>
                  {/* <Checkbox onChange={onCheckChange}>Given To Driver</Checkbox> */}
                </Col>
                <Col md={8}>
                  <Form.Item name="wayBill" label="Way Bill No:">
                    <Input placeholder="Way Bill No: " />
                  </Form.Item>
                  <Form.Item name="deliveryPlace" label="Delivery Place:">
                    <Input placeholder=" " />
                  </Form.Item>
                  {/* <Form.Item name="deliveryDate" label="Delivery Date:">
                    <DatePicker style={{ width: '100%' }} placeholder="date" />
                  </Form.Item> */}
                  <Form.Item initialValue="To Billed" name="state" label="To Billed">
                    <Select>
                      <Select.Option value="Bank">Bank</Select.Option>
                      <Select.Option value="Card">Card</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item initialValue="Unload To:" name="state" label="Unload To:">
                    <Select>
                      <Select.Option value="Bank">Bank</Select.Option>
                      <Select.Option value="Card">Card</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="receivable" label="Receivable Amount:">
                    <Input placeholder=" " />
                  </Form.Item>
                  <Form.Item initialValue="Collect At" name="state" label="Collect At">
                    <Select>
                      <Select.Option value="Bank">Bank</Select.Option>
                      <Select.Option value="Card">Card</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <br />
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
