import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, Divider, Checkbox, InputNumber } from 'antd';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['P1-201902', 'P1-201910', 'P1-201912', 'P1-001234', 'P1-004323', 'P1-000456', 'P1-004324'];
const defaultCheckedList = ['P1-201902', 'P1-001234'];

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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: 'Article or Weight',
      dataIndex: 'aow',
      key: 'aow',
    },
    {
      title: 'Way Bill No & Date',
      dataIndex: 'billDate',
      key: 'billDate',
    },
    {
      title: 'Memo No',
      dataIndex: 'memoNo',
      key: 'memoNo',
    },
    {
      title: 'Vehicle No',
      dataIndex: 'vehicleNo',
      key: 'vehicleNo',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  // Check List for LR start
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onCheckChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  // Check List for LR end

  // Input number Change
  const onInputChange = value => {
    console.log('changed', value);
  };

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
      <PageHeader ghost title="New Bill" />
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
            <Form form={form} name="billList" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col md={6} sm={12}>
                  <Form.Item name="billNo" label="Bill No:" md={6}>
                    <Input placeholder="Bill No" />
                  </Form.Item>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Item name="billDate" label="Bill Date">
                    <DatePicker defaultValue={moment('10/02/2015', dateFormatList[0])} format={dateFormatList} />
                  </Form.Item>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Item initialValue="" name="customerNames" label="Customer Names">
                    <Select>
                      <Select.Option value="">Customer</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                      <Select.Option value="Ovi">Ovi</Select.Option>
                      <Select.Option value="anyone">anyone</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={6} sm={12} style={{ margin: 'auto' }}>
                  <Button
                    onClick={handleContactInfo}
                    style={{ margin: 'auto', padding: '20px', width: '100%' }}
                    type="primary"
                  >
                    Show LR
                  </Button>
                </Col>
              </Row>
              <br />
              <Row gutter={24}>
                <Col md={18} sm={12}>
                  <Button onClick={handleContactInfo} style={{ display: 'block', width: '100%' }} type="primary">
                    LR
                  </Button>
                </Col>
                <Col md={6} sm={12}>
                  <Button onClick={handleContactInfo} style={{ display: 'block', width: '100%' }} type="primary">
                    + Add
                  </Button>
                </Col>
                <Divider />
                <Col md={24}>
                  <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                  </Checkbox>
                  {/* <Divider /> */}
                  <CheckboxGroup
                    style={{ marginLeft: '25%' }}
                    options={plainOptions}
                    value={checkedList}
                    onChange={onCheckChange}
                  />
                </Col>
              </Row>
              <Divider />
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
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Payment Details">
                    <Form.Item name="totalAmount" label="Total Amount">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="serviceTax" label="Service Tax (%)">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="total" label="Total">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="dueDate" label="Due Date">
                      <DatePicker
                        size="small"
                        defaultValue={moment('23/05/2017', dateFormatList[0])}
                        format={dateFormatList}
                      />
                    </Form.Item>
                  </Cards>
                </Col>
                <Cards bodyStyle={{ backgroundColor: '#f4f5f7', justifyContent: 'spaceBetween', display: 'flex' }}>
                  {/* <Col md={12} sm={12}>
                    <Form.Item initialValue="Select a Branch" name="brance" label="Ack Branch">
                      <Select>
                        <Select.Option value="pune">Pune</Select.Option>
                        <Select.Option value="kallam">Kallam</Select.Option>
                        <Select.Option value="latur">Latur</Select.Option>
                        <Select.Option value="kaij">Kaij</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col> */}
                  <Col md={24} sm={24}>
                    <Form.Item name="remarks" label="Remarks">
                      <Input placeholder="Remarks" onChange={handleChange} />
                    </Form.Item>
                  </Col>
                </Cards>
              </Row>

              <Form.Item label="">
                <Button onClick={handleContactInfo} style={{ margin: '20px' }} type="primary">
                  Save
                </Button>
                <Button onClick={handleContactInfo} style={{ margin: '20px' }} type="primary">
                  Origional Print
                </Button>
                <Button onClick={handleContactInfo} style={{ margin: '20px' }} type="primary">
                  Cancel
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
