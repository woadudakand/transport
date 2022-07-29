import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, InputNumber, Divider } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { getBranchListDispatch } from '../../../redux/branch/actionCreator';
import { lorryReceiptAddDispatch } from '../../../redux/lorryReceipt/actionCreator';

const SavePlaces = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { branches, isLoading } = useSelector(state => {
    return {
      branches: state.branches.list,
      isLoading: state.customer.loading,
    };
  });

  const gotoView = () => {
    history.replace('/admin/lorryReceipt');
  };

  const handleFinish = values => {
    dispatch(
      lorryReceiptAddDispatch(
        {
          lorryReceiptData: { ...values, created_at: moment().format('YYYY-MM-DD') },
          lorryReceiptReferences: dataSource,
        },
        () => {
          form.resetFields();
        },
      ),
    );
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

  useEffect(() => {
    if (dispatch) {
      dispatch(getBranchListDispatch());
    }
  }, [dispatch]);

  dataSource.map(({ name, email, designation, address, mobile }, key) => {
    return infoTableData.push({
      key,
      sn: key + 1,
      articles: 'aritcale',
      noArticles: 32,
      description: 'description',
      actualWeight: 325,
      ratePer: 'kg',
      rate: 500,
      freight: 'freight',
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

  const handleChange = e => {
    setInfo({
      ...info,
      [e.currentTarget.name]: e.currentTarget.value,
      created_at: moment().format('YYYY-MM-DD'),
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
      <PageHeader
        ghost
        title="Lorry Receipt Details"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={gotoView} size="small" type="primary">
              View Page
            </Button>
          </div>,
        ]}
      />
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
                  <Form.Item name="fromAddress" label="Consignor Address:">
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
                  <Form.Item initialValue="Ravi" name="toConsignee" label="Consignee">
                    <Select>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="toGst" label="Consignee's GST No">
                    <Input placeholder="Consignee's GST No" />
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
                </Col>
                <Col style={{ marginBottom: '20px' }} md={12} sm={24} xs={24}>
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
                    <Button onClick={handleContactInfo} size="default" type="primary">
                      {!edit ? 'Add New' : 'Update'}
                    </Button>
                  </Cards>
                </Col>
                {/* Table start */}
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
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Freight Details">
                    <Form.Item name="totalFreight" label="Total Freight:">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="osc" label="O. S. C">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="door" label="Door/Del_Char">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="otherChar" label="Other Char">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="varai" label="Varai/Hamali">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="statistical" label="Statistical">
                      <InputNumber size="small" min={0} max={1000} defaultValue={25} onChange={onInputChange} />
                    </Form.Item>
                    <Form.Item name="total" label="Total">
                      <InputNumber size="small" min={0} max={1000} defaultValue={25} onChange={onInputChange} />
                    </Form.Item>
                  </Cards>
                </Col>
                {/* Table End */}
                <br />
                <br />
                <Cards bodyStyle={{ backgroundColor: '#f4f5f7', justifyContent: 'spaceBetween', display: 'flex' }}>
                  <Col md={12} sm={12}>
                    <Form.Item name="totalNoArticle" label="Total No. of Articles">
                      <Input placeholder="0" type="number" />
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={12}>
                    <Form.Item name="totalWeight" label="Total Weight">
                      <Input placeholder="0" type="number" />
                    </Form.Item>
                  </Col>
                </Cards>
                <hr />
                <br />
                <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Billing Details">
                  <Row>
                    <Col md={12} sm={12}>
                      <Form.Item name="materialCost" label="Material Cost">
                        <Input placeholder="Material Cost" type="number" />
                      </Form.Item>
                      <Form.Item initialValue="Door" name="deliveryType" label="Delivery Type">
                        <Select>
                          <Select.Option value="door">Door</Select.Option>
                          <Select.Option value="godwan">Godwan</Select.Option>
                          <Select.Option value="office">Office</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="inDays" label="Delivery (in days)">
                        <Input placeholder="0" type="number" />
                      </Form.Item>
                      <Form.Item initialValue="TTB" name="payType" label="Pay Type">
                        <Select>
                          <Select.Option value="ttb">TTB</Select.Option>
                          <Select.Option value="toPay">To Pay</Select.Option>
                          <Select.Option value="paid">Paid</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }} md={11} sm={11}>
                      <Form.Item initialValue="Consignor" name="toBilled" label="To Billed">
                        <Select>
                          <Select.Option value="consignor">Consignor</Select.Option>
                          <Select.Option value="consignee">Consignee</Select.Option>
                          <Select.Option value="thirdParty">Third Party</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item initialValue="Consignor" name="collectAt" label="Collect At">
                        <Select>
                          <Select.Option value="pune">Pune</Select.Option>
                          <Select.Option value="kallam">Kallam</Select.Option>
                          <Select.Option value="latur">Latur</Select.Option>
                          <Select.Option value="kaij">Kaij</Select.Option>
                          <Select.Option value="mumbai">Mumbai</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item initialValue="" name="serviceTax" label="Service Tax By">
                        <Select>
                          <Select.Option value="consignor">Consignor</Select.Option>
                          <Select.Option value="consignee">Consignee</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="remark" label="Remark">
                        <Input placeholder="Remark" />
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Row gutter={24} style={{ margin: '0 auto', justifyContent: 'center' }}>
                    <Button style={{ margin: '10px' }} onClick={handleContactInfo} size="large" type="primary">
                      {!edit ? 'Save' : 'Update'}
                    </Button>
                    <Button style={{ margin: '10px' }} onClick={handleContactInfo} size="large" type="primary">
                      {!edit ? 'Origional Print' : 'Update'}
                    </Button>
                    <Button style={{ margin: '10px' }} onClick={handleContactInfo} size="large" type="primary">
                      {!edit ? 'Print Without Value' : 'Update'}
                    </Button>
                    <Button style={{ margin: '10px' }} onClick={handleContactInfo} size="large" type="primary">
                      {!edit ? 'cancel' : 'Update'}
                    </Button>
                  </Row> */}
                  <Divider />
                  <Row gutter={24} style={{ justifyContent: 'center' }}>
                    <Col md={6} sm={12}>
                      <Button style={{ margin: '10px auto', width: '100%' }} onClick={handleContactInfo} type="primary">
                        Save
                      </Button>
                    </Col>
                    <Col md={6} sm={12}>
                      <Button style={{ margin: '10px auto', width: '100%' }} onClick={handleContactInfo} type="primary">
                        Origional Print
                      </Button>
                    </Col>
                    <Col md={6} sm={12}>
                      <Button style={{ margin: '10px auto', width: '100%' }} onClick={handleContactInfo} type="primary">
                        Print Without Value
                      </Button>
                    </Col>
                    <Col md={6} sm={12}>
                      <Button style={{ margin: '10px auto', width: '100%' }} onClick={handleContactInfo} type="primary">
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Cards>
              </Row>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default SavePlaces;
