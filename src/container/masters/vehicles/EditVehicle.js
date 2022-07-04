import React, { useState, useEffect } from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Table, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Main, TableWrapper, BasicFormWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { getBranchListDispatch } from '../../../redux/branch/actionCreator';
import { updateVehicle, getSingleVehicleDispatch } from '../../../redux/vehicles/actionCreator';

const EditVehicles = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState({});
  const [edit, setEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { branches, isLoading, vehicles } = useSelector(state => {
    return {
      branches: state.branches.list,
      isLoading: state.vehicle.loading,
      vehicles: state.vehicle.vehicles,
    };
  });

  const gotoView = () => {
    history.replace('/admin/vehicles');
  };

  const handleFinish = async values => {
    // console.log({
    //   ...values,
    //   openBalance: {
    //     balance: values.oBalance,
    //     card: values.oCard,
    //   },
    //   info: dataSource,
    // });
    dispatch(
      updateVehicle(
        {
          vehicles: { ...values, id, created_at: moment().format('YYYY-MM-DD') },
          vehicleReferences: dataSource,
        },
        () => {
          gotoView();
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
      dispatch(getSingleVehicleDispatch(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (vehicles[0]) {
      setDataSource(vehicles[0].vehicle_references);
      form.setFieldsValue({
        ...vehicles[0],
      });
    }
  }, [vehicles, form]);

  dataSource.map(({ tName, amount, pDate, eDate, description }, key) => {
    return infoTableData.push({
      key,
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

  return (
    <>
      <PageHeader
        ghost
        title="Update Vehicle"
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
          <Form form={form} name="vehicle" onFinish={handleFinish}>
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
            <Form form={form} name="createProject" onFinish={handleFinish}>
              <Row gutter={24}>
                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item initialValue="" name="owner" label="Select Owner">
                    <Select showSearch>
                      <Select.Option value="">Select Owner</Select.Option>
                      <Select.Option value="Ravi">Ravi</Select.Option>
                      <Select.Option value="kamal">kamal</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item initialValue="" name="type" label="Select Vehicle Type">
                    <Select>
                      <Select.Option value="">Select Vehicle Type</Select.Option>
                      <Select.Option value="Mrf">Mrf</Select.Option>
                      <Select.Option value="Heavy">Heavy</Select.Option>
                      <Select.Option value="Mini">Mini</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="vNo" label="Vehicle NO">
                    <Input placeholder="Vehicle NO" />
                  </Form.Item>
                  <Form.Item name="capacity" label="capacity">
                    <Input placeholder="capacity" />
                  </Form.Item>
                  <Form.Item name="make" label="Make">
                    <Input placeholder="Make" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12}>
                  <Form.Item name="Description" label="Description">
                    <Input placeholder="description" />
                  </Form.Item>
                  <Form.Item name="regDate" label="Reg Date">
                    <DatePicker style={{ width: '100%' }} placeholder="Reg Date" />
                  </Form.Item>
                  <Form.Item name="expDate" label="Exp Date">
                    <DatePicker style={{ width: '100%' }} placeholder="Exp Date" />
                  </Form.Item>
                  <Form.Item name="Engine No" label="Engine No">
                    <Input placeholder="engineNo" />
                  </Form.Item>
                </Col>

                <Col style={{ marginBottom: '20px' }} md={8} sm={12} xs={24}>
                  <Form.Item name="chasisNo" label="Chasis No">
                    <Input placeholder="Chasis No" />
                  </Form.Item>
                  <Form.Item name="pUCno" label="PUC No">
                    <Input placeholder="PUC No" />
                  </Form.Item>
                  <Form.Item name="pUCExp" label="PUC Exp. Date">
                    <DatePicker style={{ width: '100%' }} placeholder="PUC Exp. Date" />
                  </Form.Item>
                  <Form.Item initialValue="" name="body" label="Select Body">
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
                  Update Vehicle {isLoading && <Spin />}
                </Button>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Cards>
      </Main>
    </>
  );
};

export default EditVehicles;
