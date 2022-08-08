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
      isLoading: state.lorryReceipt.loading,
    };
  });

  const gotoView = () => {
    history.replace('/admin/lorryReceipt');
  };

  const handleFinish = values => {
    dispatch(
      lorryReceiptAddDispatch(
        {
          lorryReceiptData: {
            // id: 1,
            branche_id: values.branchs_id,
            lr_id: values.lr_id,
            invoice_no: values.invoice_no,
            vehicle_id: values.vehicle_id,
            customer_id_from: values.customer_id_from,
            consignorgst_from: values.consignorgst_from,
            consigner_address_from: values.consigner_address_from,
            place_id_from: values.place_id_from,
            customer_id_to: values.customer_id_to,
            consignorgst_to: values.consignorgst_to,
            consigner_address_to: values.consigner_address_to,
            place_id_to: values.place_id_to,
            delivery_at: values.delivery_at,
            delivery_address: values.delivery_address,
            city: values.city,
            created_at: moment().format('YYYY-MM-DD'),
          },
          lorryTransactionData: dataSource,
          lorryFreightData: {
            total_freight: values.total_freight,
            osc: values.osc,
            door: values.door,
            other_charges: values.other_charges,
            hamali: values.hamali,
            statistical: values.statistical,
            total: values.total,
            created_at: moment().format('YYYY-MM-DD'),
          },
          lorryBillingData: {
            material_cost: values.material_cost,
            delivery_type: values.delivery_type,
            delivery_days: values.delivery_days,
            pay_type: values.pay_type,
            to_billed: values.to_billed,
            collect_at_branch: values.collect_at_branch,
            service_tax_by: values.service_tax_by,
            remark: values.remark,
            created_at: moment().format('YYYY-MM-DD'),
          },
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

  dataSource.map(({ articale_id, no_of_article, description, weight, rate_per, rate, freight }, key) => {
    return infoTableData.push({
      key,
      sn: key + 1,
      articles: articale_id,
      noArticles: no_of_article,
      description,
      actualWeight: weight,
      ratePer: rate_per,
      rate,
      freight,
      action: (
        <div className="table-actions">
          <Link
            onClick={() => handleInfoEdit({ no_of_article, description, weight, rate_per, rate, freight }, key)}
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
      setDataSource([
        ...dataSource,
        {
          ...info,
          articale_id: 'hello',
          rate: '1',
          no_of_article: 'jkjkdj',
          rate_per: 'kdk',
          freight: 'dkjdfj',
          total_no_article: '22',
          total_weight: '111',
        },
      ]);
      setInfo({});
    } else {
      const newData = dataSource.map((item, index) => {
        if (index === edit - 1) {
          const newItem = item;
          newItem.articale_id = info.articles;
          newItem.no_of_article = info.no_of_article;
          newItem.description = info.description;
          newItem.actualWeight = info.weight;
          newItem.rate_per = info.rate_per;
          newItem.rate = info.rate;
          newItem.freight = info.freight;
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
          <Form form={form} name="lorryReceipt" onFinish={handleFinish}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Select Branch',
                },
              ]}
              name="branchs_id"
              label=""
              initialValue=""
            >
              <Select style={{ width: '250px' }}>
                <Select.Option value="">Select Branch</Select.Option>
                {branches.map(item => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Row>
        <Cards headless>
          <BasicFormWrapper>
            <Form form={form} name="lorryReceipt" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item name="lr_id" label="LR No:">
                    <Input placeholder="LR No: " />
                  </Form.Item>
                  <Form.Item name="created_at" label="Date">
                    <DatePicker style={{ width: '100%' }} placeholder="date" />
                  </Form.Item>
                  <Form.Item name="invoice_no" label="Invoice No:">
                    <Input placeholder="Invoice No:" />
                  </Form.Item>
                  <Form.Item initialValue="" name="vehicle_id" label="Truck/Tempo No:">
                    <Select>
                      <Select.Option value="">Slect Truck / Tempo No:</Select.Option>
                      <Select.Option value="MH 13 AA 1881">MH 13 AA 1881</Select.Option>
                      <Select.Option value="MH12GH2370">MH12GH2370</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item initialValue="Ravi" name="customer_id_from" label="Consignor">
                    <Select>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="consignorgst_from" label="Consignor's GST No">
                    <Input placeholder="Consignor's GST No" />
                  </Form.Item>
                  <Form.Item name="consigner_address_from" label="Consignor Address:">
                    <Input placeholder="Consignee Address:" />
                  </Form.Item>

                  <Form.Item initialValue="" name="place_id_from" label="From">
                    <Select>
                      <Select.Option value="">Select a place</Select.Option>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item initialValue="Ravi" name="customer_id_to" label="Consignee">
                    <Select>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="consignorgst_to" label="Consignee's GST No">
                    <Input placeholder="Consignee's GST No" />
                  </Form.Item>
                  <Form.Item name="consigner_address_to" label="Consignee Address:">
                    <Input placeholder="Consignee Address:" />
                  </Form.Item>

                  <Form.Item initialValue="" name="place_id_to" label="To">
                    <Select>
                      <Select.Option value="">Select a place</Select.Option>
                      <Select.Option value="pune">Pune</Select.Option>
                      <Select.Option value="kallam">Kallam</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={12} sm={12} xs={24}>
                  <Form.Item initialValue="" name="delivery_at" label="Delivery At:">
                    <Select>
                      <Select.Option value="">Select Deliver Person</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="Amit">Amit</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="delivery_address" label="Address:">
                    <Input placeholder="Delivery Address" />
                  </Form.Item>
                  <Form.Item name="city" label="City:">
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>
                <Col style={{ marginBottom: '20px' }} md={12} sm={24} xs={24}>
                  <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Transactions Details">
                    <Form.Item initialValue="Articles" name="articale_id">
                      <Select value={info.articles}>
                        <Select.Option value="pune">Box</Select.Option>
                        <Select.Option value="bag">Bag</Select.Option>
                        <Select.Option value="buccket">buccket</Select.Option>
                        <Select.Option value="buckets">Buckets</Select.Option>
                        <Select.Option value="yogini">yogini</Select.Option>
                        <Select.Option value="pramod">pramod</Select.Option>
                      </Select>
                    </Form.Item>
                    <Input
                      name="no_of_article"
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
                    <Form.Item initialValue="Rate Per" name="rate_per">
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
                    <Form.Item name="total_freight" label="Total Freight:">
                      {/* <InputNumber size="small" min={0} max={10} defaultValue={0} /> */}
                      <Input placeholder="Basic Testing" type="number" />
                    </Form.Item>
                    <Form.Item name="osc" label="O. S. C">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} />
                    </Form.Item>
                    <Form.Item name="door" label="Door/Del_Char">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} />
                    </Form.Item>
                    <Form.Item name="other_charges" label="Other Char">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} />
                    </Form.Item>
                    <Form.Item name="hamali" label="Varai/Hamali">
                      <InputNumber size="small" min={0} max={10} defaultValue={0} />
                    </Form.Item>
                    <Form.Item name="statistical" label="Statistical">
                      <InputNumber size="small" min={0} max={1000} defaultValue={25} />
                    </Form.Item>
                    <Form.Item name="total" label="Total">
                      <InputNumber size="small" min={0} max={1000} defaultValue={25} />
                    </Form.Item>
                  </Cards>
                </Col>
                {/* Table End */}
                <br />
                <br />
                <Cards bodyStyle={{ backgroundColor: '#f4f5f7', justifyContent: 'spaceBetween', display: 'flex' }}>
                  <Col md={12} sm={12}>
                    <Form.Item name="total_no_article" label="Total No. of Articles">
                      <Input placeholder="0" type="number" />
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={12}>
                    <Form.Item name="total_weight" label="Total Weight">
                      <Input placeholder="0" type="number" />
                    </Form.Item>
                  </Col>
                </Cards>
                <hr />
                <br />
                <Cards bodyStyle={{ backgroundColor: '#f4f5f7' }} headless title="Billing Details">
                  <Row>
                    <Col md={12} sm={12}>
                      <Form.Item name="material_cost" label="Material Cost">
                        <Input placeholder="Material Cost" type="number" />
                      </Form.Item>
                      <Form.Item initialValue="" name="delivery_type" label="Delivery Type">
                        <Select>
                          <Select.Option value="">Select delivery type</Select.Option>
                          <Select.Option value="door">Door</Select.Option>
                          <Select.Option value="godwan">Godwan</Select.Option>
                          <Select.Option value="office">Office</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="delivery_days" label="Delivery (in days)">
                        <Input placeholder="0" type="number" />
                      </Form.Item>
                      <Form.Item initialValue="" name="pay_type" label="Pay Type">
                        <Select>
                          <Select.Option value="">Select pay type</Select.Option>
                          <Select.Option value="ttb">TTB</Select.Option>
                          <Select.Option value="toPay">To Pay</Select.Option>
                          <Select.Option value="paid">Paid</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col style={{ marginLeft: 'auto' }} md={11} sm={11}>
                      <Form.Item initialValue="Consignor" name="to_billed" label="To Billed">
                        <Select>
                          <Select.Option value="consignor">Consignor</Select.Option>
                          <Select.Option value="consignee">Consignee</Select.Option>
                          <Select.Option value="thirdParty">Third Party</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item initialValue="" name="collect_at_branch" label="Collect At">
                        <Select>
                          <Select.Option value="pune">Pune</Select.Option>
                          <Select.Option value="kallam">Kallam</Select.Option>
                          <Select.Option value="latur">Latur</Select.Option>
                          <Select.Option value="kaij">Kaij</Select.Option>
                          <Select.Option value="mumbai">Mumbai</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item initialValue="" name="service_tax_by" label="Service Tax By">
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
                  <Divider />
                  <Row gutter={24} style={{ justifyContent: 'center' }}>
                    <Col md={6} sm={12}>
                      <Button
                        style={{ margin: '10px auto', width: '100%' }}
                        // onClick={handleContactInfo}
                        type="primary"
                        htmlType="submit"
                      >
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
