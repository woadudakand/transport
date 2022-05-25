import React, { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, Divider, Checkbox, InputNumber } from 'antd';
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Article',
      dataIndex: 'article',
      key: 'article',
    },

    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'GCN No & Date',
      dataIndex: 'gcnNo',
      key: 'gcnNo',
    },
    {
      title: 'Hamali',
      dataIndex: 'hamali',
      key: 'hamali',
    },
    {
      title: 'Octori',
      dataIndex: 'octori',
      key: 'octori',
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
    },
  ];

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  // Input number Change
  const onInputChange = value => {
    console.log('changed', value);
  };

  // Date Change function
  // const dateChange = (date, DateString) => {
  //   console.log(date, DateString);
  // };

  // Check List for LR start
  // const [checkedList, setCheckedList] = useState(defaultCheckedList);
  // const [indeterminate, setIndeterminate] = useState(true);
  // const [checkAll, setCheckAll] = useState(false);

  // const onCheckChange = list => {
  //   setCheckedList(list);
  //   setIndeterminate(!!list.length && list.length < plainOptions.length);
  //   setCheckAll(list.length === plainOptions.length);
  // };

  // const onCheckAllChange = e => {
  //   setCheckedList(e.target.checked ? plainOptions : []);
  //   setIndeterminate(false);
  //   setCheckAll(e.target.checked);
  // };
  // Check List for LR end

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
      <PageHeader ghost title="Cash Memo List" />
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
            <Form form={form} name="cashMemoList" onFinish={handleFinish}>
              <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Col md={6} sm={12}>
                  <Form.Item name="no" label="No:">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Item name="date" label="Date">
                    <DatePicker defaultValue={moment('10/02/2015', dateFormatList[0])} format={dateFormatList} />
                    {/* <DatePicker onChange={dateChange} /> */}
                  </Form.Item>
                </Col>
                <Col md={6} sm={12} style={{ width: '100%' }}>
                  <Form.Item initialValue="" name="customer" label="Customer">
                    <Select>
                      <Select.Option value="">Select Customer</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                      <Select.Option value="Ovi">Ovi</Select.Option>
                      <Select.Option value="anyone">anyone</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Item name="vendorCode" label="Vendor Code">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={12} sm={12}>
                  <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col md={12} sm={12}>
                      <Form.Item name="lrNo" label="LR No:">
                        <Input placeholder="LR No: " type="number" />
                      </Form.Item>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Item name="date" label="Date">
                        <DatePicker style={{ width: '100%' }} placeholder="date" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                  <Form.Item name="consignor" label="Consignor :">
                    <Input placeholder="Consignor" />
                  </Form.Item>
                  <Form.Item name="consignee" label="Consignee :">
                    <Input placeholder="Consignee" />
                  </Form.Item>
                  <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col md={12} sm={12}>
                      <Form.Item name="from" label="From">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Item name="to" label="To">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col md={12} sm={12}>
                      <Form.Item name="gstNo" label="GST No:">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Item name="payable" label="GST Payable By:">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={12} sm={12}>
                  <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col md={12} sm={12}>
                      <Form.Item name="freight" label="Fright">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Item name="osc" label="O.S.C">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col md={12} sm={12}>
                      <Form.Item name="hamali" label="Hamali">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col md={12} sm={12}>
                      <Form.Item name="otherCharge" label="Other Charge">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col md={12}>
                      <Form.Item name="statistical" label="Statistical">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item name="doorDelivery" label="Door Delivery">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col md={12}>
                      <Form.Item name="total" label="Total">
                        <Input placeholder="0" type="number" />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item name="totalArticle" label="Total Article">
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                  <Form.Item name="totalWeight" label="Total Weight">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
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
                    <Form.Item name="freight" label="Freight">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="hamali" label="Hamali">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="osc" label="O.S.C">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="delCharge" label="Del Charge">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="otherCharge" label="Other Charge">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="statistical" label="Statistical">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="tds" label="TDS">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="totalAmount" label="Total Amount">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
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
                      <Input placeholder="Remarks" />
                    </Form.Item>
                  </Col>
                </Cards>
              </Row>

              {/* <Form.Item label="">
                <Button onChange={handleChange} style={{ margin: '20px' }} type="primary">
                  Save
                </Button>
                <Button onChange={handleChange} style={{ margin: '20px' }} type="primary">
                  Origional Print
                </Button>
                <Button onChange={handleChange} style={{ margin: '20px' }} type="primary">
                  Cancel
                </Button>
              </Form.Item> */}
              <Row gutter={24} style={{ justifyContent: 'center' }}>
                <Col md={8} sm={12}>
                  <Button style={{ margin: '10px auto', width: '100%' }} onClick={handleChange} type="primary">
                    Save
                  </Button>
                </Col>
                <Col md={8} sm={12}>
                  <Button style={{ margin: '10px auto', width: '100%' }} onClick={handleChange} type="primary">
                    Origional Print
                  </Button>
                </Col>
                <Col md={8} sm={12}>
                  <Button style={{ margin: '10px auto', width: '100%' }} onClick={handleChange} type="primary">
                    Cancel
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
