import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, InputNumber, Divider, Radio, Checkbox } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const { TextArea } = Input;

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

  // Input number Change
  const onInputChange = value => {
    console.log('changed', value);
  };

  // Date Change
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // Radio Change
  const [value, setValue] = useState(1);

  const onRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // Checked change
  const [checked, setChecked] = useState(true);
  const onCheckChange = (e) => {
    console.log('checked = ', e.target.checked);
    // setChecked(e.target.checked);
  };
  // const label = `${value ? 'Debit' : 'Credit'}`;
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
      <PageHeader ghost title="Petty Cash Transaction" />
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
                <Col md={12}>
                  <Form.Item name="available" label="Available Balance">
                    <InputNumber size="" min={0} max={10} defaultValue={45546} onChange={onInputChange} />
                  </Form.Item>
                  <Form.Item name="date" label="Date">
                    <DatePicker onChange={onDateChange} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name="available" label="Available Balance">
                    <InputNumber size="" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                  </Form.Item>
                  <Form.Item initialValue="Select type" name="type" label="Type">
                    <Select>
                      <Select.Option value="customer">Customer</Select.Option>
                      <Select.Option value="driver">Driver</Select.Option>
                      <Select.Option value="employee">Employee</Select.Option>
                      <Select.Option value="supplier">Supplier</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="tType" label="Transaction Type ">
                    {/* <DatePicker onChange={onDateChange} style={{ width: '100%' }} /> */}
                    <Radio.Group onChange={onRadioChange} value={value}>
                      <Radio value={1}>Credit</Radio>
                      <Radio value={2}>Debit</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item initialValue="Select Branch" name="challan" label="Challan Advance">
                    <Checkbox onChange={onCheckChange}>Debit</Checkbox>
                    <Select>
                      <Select.Option value="p1-000045">P1-000045</Select.Option>
                      <Select.Option value="p1-223322">P1-223322</Select.Option>
                      <Select.Option value="p1-222276">P1-222276</Select.Option>
                      <Select.Option value="p1-213442">P1-213442</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item initialValue="Select type name" name="typeName" label="Type Name">
                    <Select>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="Kallam">Kallam</Select.Option>
                      <Select.Option value="Latur">Latur</Select.Option>
                      <Select.Option value="Kaij">Kaij</Select.Option>
                      <Select.Option value="Thane">Thane</Select.Option>
                      <Select.Option value="Mumbai">Mumbai</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="description" label="Description">
                    <TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={24}>
                <Col md={4}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    Save
                  </Button>
                </Col>
                <Col md={6}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    Cancle
                  </Button>
                </Col>
                <Col md={6}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    New Transaction
                  </Button>
                </Col>
                <Col md={8}>
                  <Button style={{ margin: 'auto', width: '100%' }} type="primary">
                    Transaction In Petty Cash
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
