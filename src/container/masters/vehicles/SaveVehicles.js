import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const SaveVehicle = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState({
    type: '',
  });
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

  dataSource.map(({ tName, amount, pDate, eDate, description }, key) => {
    return infoTableData.push({
      sn: key + 1,
      tName,
      amount,
      pDate,
      eDate,
      description,
      action: (
        <div className="table-actions">
          <Link
            onClick={() => handleInfoEdit({ tName, amount, pDate, eDate, description }, key)}
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
      title: 'Taxi Name',
      dataIndex: 'tName',
      key: 'tName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

    {
      title: 'Paid Date',
      dataIndex: 'pDate',
      key: 'pDate',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'eDate',
      key: 'eDate',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

  const handleSelectChange = (value, name) => {
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleDateChange = (value, name) => {
    setInfo({
      ...info,
      [name]: moment(value).format('yyyy-MM-DD'),
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
          newItem.tName = info.tName;
          newItem.amount = info.amount;
          newItem.pDate = info.pDate;
          newItem.eDate = info.eDate;
          newItem.description = info.description;
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
      <PageHeader ghost title="Save Vehicle" />
      <Main>
        <Cards headless>
          <BasicFormWrapper>
            <Form form={form} name="createProject" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item initialValue="" name="owner" label="">
                    <Select showSearch>
                      <Select.Option value="">Select Owner</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="kamal">kamal</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item initialValue="" name="type" label="">
                    <Select>
                      <Select.Option value="">Select Vehicle Type</Select.Option>
                      <Select.Option value="Mrf">Mrf</Select.Option>
                      <Select.Option value="Heavy">Heavy</Select.Option>
                      <Select.Option value="Mini">Mini</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="vNo" label="">
                    <Input placeholder="Vehicle NO" />
                  </Form.Item>
                  <Form.Item name="capacity" label="">
                    <Input placeholder="capacity" />
                  </Form.Item>
                  <Form.Item name="make" label="">
                    <Input placeholder="Make" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item name="Description" label="">
                    <Input placeholder="description" />
                  </Form.Item>
                  <Form.Item name="regDate" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="Reg Date" />
                  </Form.Item>
                  <Form.Item name="expDate" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="Exp Date" />
                  </Form.Item>
                  <Form.Item name="Engine No" label="">
                    <Input placeholder="engineNo" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item name="chasisNo" label="">
                    <Input placeholder="Chasis No" />
                  </Form.Item>
                  <Form.Item name="pUCno" label="">
                    <Input placeholder="PUC No" />
                  </Form.Item>
                  <Form.Item name="pUCExp" label="">
                    <DatePicker style={{ width: '100%' }} placeholder="PUC Exp. Date" />
                  </Form.Item>
                  <Form.Item initialValue="" name="body" label="">
                    <Select>
                      <Select.Option value="">Select Body</Select.Option>
                      <Select.Option value="Open">Open</Select.Option>
                      <Select.Option value="Close">Close</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Tax Details">
                    <Select
                      onChange={value => handleSelectChange(value, 'tName')}
                      style={{ width: '100%' }}
                      name="tName"
                      defaultValue=""
                      showSearch
                    >
                      <Select.Option value="">Select Text Name</Select.Option>
                      <Select.Option value="Insurance">Insurance</Select.Option>
                      <Select.Option value="RoadText">RoadText</Select.Option>
                    </Select>
                    <br /> <br />
                    <Input name="amount" value={info.amount} onChange={handleChange} placeholder="Amount" />
                    <br /> <br />
                    <DatePicker
                      style={{ width: '100%' }}
                      name="pDate"
                      value={moment(info.pDate)}
                      onChange={value => handleDateChange(value, 'pDate')}
                      placeholder="Paid Date"
                    />
                    <br /> <br />
                    <DatePicker
                      style={{ width: '100%' }}
                      name="eDate"
                      value={moment(info.eDate)}
                      onChange={value => handleDateChange(value, 'eDate')}
                      placeholder="Expire Date"
                    />
                    <br /> <br />
                    <Input.TextArea
                      name="description"
                      value={info.description}
                      onChange={handleChange}
                      placeholder="Description"
                    />
                    <br /> <br />
                    <Button onClick={handleContactInfo} size="large" type="primary">
                      {!edit ? 'Add New' : 'Update'}
                    </Button>
                  </Cards>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={16} sm={24}>
                  <TableWrapper className="table-data-view table-responsive">
                    <h2 style={{ textAlign: 'center' }}>Current Year Tax Detals</h2>
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
                  Add Vehicle
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SaveVehicle;
