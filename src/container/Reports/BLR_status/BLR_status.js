import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Select, Pagination, Form, DatePicker, Radio, Divider, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperRight } from './Style';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';

const LorryReceiptRegister = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();

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

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  const dataSource = [];

  const columns = [
    {
      title: 'SR NO',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'Consign No',
      dataIndex: 'consignNO',
      key: 'consignNO',
    },
    {
      title: 'Consign Date',
      dataIndex: 'consignDate',
      key: 'consignDate',
    },
    {
      title: 'Consigner Name',
      dataIndex: 'consignerName',
      key: 'consignerName',
    },
    {
      title: 'Consignee Name',
      dataIndex: 'consigneeName',
      key: 'consigneeName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Memo No',
      dataIndex: 'memoNo',
      key: 'memoNo',
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
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
  ];

  // const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const [radioValue, setRadioValue] = useState(1);

  const onRadioChange = e => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  const handleChange = e => {
    // setInfo({
    //   ...info,
    //   [e.currentTarget.name]: e.currentTarget.value,
    // });
    console.log(e);
  };
  // const history = useHistory();
  // const showModal = () => {
  //   history.replace('/admin/save-cml');
  // };

  const onSelectChange = selectedRowKey => {
    setSelectedRowKeys(selectedRowKey);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <PageHeader ghost title="Billed Lorry Receipt Status" />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <p />
          <Select style={{ width: '250px' }} defaultValue="">
            <Select.Option value="">Select Branch</Select.Option>
            <Select.Option value="pune">Pune</Select.Option>
            <Select.Option value="kallam">Kallam</Select.Option>
          </Select>
        </Row>

        <Row>
          <Col lg={24} xs={24}>
            <Cards headless>
              <BasicFormWrapper>
                <Form form={form} name="aknowledge" onFinish={handleFinish}>
                  <Row gutter={24}>
                    {/* <Col md={18} sm={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    </Col> */}
                    <Col md={8} sm={12} style={{ width: '100%' }}>
                      <Form.Item initialValue="" name="customerName" label="">
                        <Select>
                          <Select.Option value="">Select Customer</Select.Option>
                          <Select.Option value="Ravi">Ravi</Select.Option>
                          <Select.Option value="Amit">Amit</Select.Option>
                          <Select.Option value="Ovi">Ovi</Select.Option>
                          <Select.Option value="anyone">anyone</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={10} sm={24} style={{ margin: 'auto', justifyContent: 'center', textAlign: 'center' }}>
                      <Radio.Group onChange={onRadioChange} value={radioValue}>
                        {/* <Space direction="vertical"> */}
                        <Radio value={1}>All</Radio>
                        <Radio value={2}>To Pay</Radio>
                        <Radio value={3}>Paid</Radio>
                        <Radio value={4}>TTB</Radio>
                        {/* </Space> */}
                      </Radio.Group>
                    </Col>
                    <Col md={6} sm={11}>
                      <Button
                        size="small"
                        style={{ margin: 'auto', width: '100%' }}
                        onClick={handleChange}
                        type="primary"
                      >
                        Search...
                      </Button>
                    </Col>
                  </Row>
                  {/* <Row justify="space-between" style={{ marginBottom: 20 }}>
                    <Col md={18} sm={12} style={{ width: '100%' }}>
                      <Input placeholder="Search Customer" />
                    </Col>
                    <Col md={5} sm={11}>
                      <Button
                        size="default"
                        style={{ margin: 'auto', width: '100%' }}
                        onClick={handleChange}
                        type="primary"
                      >
                        Search...
                      </Button>
                    </Col>
                  </Row> */}
                  <Divider />
                </Form>
              </BasicFormWrapper>
              <TableWrapper className="table-data-view table-responsive">
                <Table
                  rowSelection={rowSelection}
                  className="table-responsive"
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </TableWrapper>
            </Cards>
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
              Export to Excell
            </Button>
            {/* <Pagination style={{ margin: 'auto' }} simple defaultCurrent={2} total={50} /> */}
            <Pagination defaultCurrent={1} total={50} />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default LorryReceiptRegister;
