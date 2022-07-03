import React, { useState, useEffect } from 'react';
import { Row, Col, notification, Table, Popconfirm } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import DataLoader from '../../../components/utilities/DataLoader';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { getVehiclesDispatch, deleteVehicle, getVehicleDispatch } from '../../../redux/vehicles/actionCreator';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const Vehicle = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { vehicles, isLoading } = useSelector(state => {
    return {
      vehicles: state.vehicle.vehicles,
      isLoading: state.vehicle.loading,
    };
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      getVehiclesDispatch(pagination.current, pagination.pageSize, total =>
        setPagination({
          ...pagination,
          total,
        }),
      ),
    );
  }, [pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch(getVehiclesDispatch());
    }
  }, [dispatch]);

  const handleTableChange = ({ current, pageSize }) => {
    dispatch(
      getVehiclesDispatch(current, pageSize, total =>
        setPagination({
          current,
          pageSize,
          total,
        }),
      ),
    );
  };

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  // const dataSource = [
  //   {
  //     key: '1',
  //     sn: 1,
  //     vNo: 'MH 13 AA 1881',
  //     OAddress: 'Hadpsar',
  //     owner: 'Ravis',
  //     type: 'Heavy',
  //     action: (
  //       <div className="table-actions">
  //         <Link to="#" className="edit">
  //           <FeatherIcon icon="edit" size={14} />
  //         </Link>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     sn: 2,
  //     vNo: 'MH12GH2370',
  //     OAddress: 'Hadpsar',
  //     owner: 'sastri',
  //     type: 'Heavy',
  //     action: (
  //       <div className="table-actions">
  //         <Link to="#" className="edit">
  //           <FeatherIcon icon="edit" size={14} />
  //         </Link>
  //       </div>
  //     ),
  //   },
  // ];

  const dataSource = [];

  vehicles.map((vehicle, key) => {
    const { vehicle_no, voname, vtype, correspondence_address, id, customer_email, city, telephone } = vehicle;
    console.log(vehicle_no);
    return dataSource.push({
      key: id,
      sn: key + 1,
      vNo: vehicle_no,
      owner: voname,
      oAddress: 'ownar Address',
      type: vtype,
      action: (
        <div className="table-actions">
          <Link to={`/admin/update-vehicles/${id}`} className="edit">
            <FeatherIcon icon="edit" size={14} />
          </Link>
        </div>
      ),
    });
  });
  console.log(vehicles);

  const columns = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'Vehicle No',
      dataIndex: 'vNo',
      key: 'vNo',
    },
    {
      title: 'Vehicle Owner',
      dataIndex: 'owner',
      key: 'owner',
    },

    {
      title: 'Owner Address',
      dataIndex: 'oAddress',
      key: 'oAddress',
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const history = useHistory();
  const showModal = () => {
    history.replace('/admin/save-vehicles');
  };

  const onSelectChange = selectedRowKey => {
    setSelectedRowKeys(selectedRowKey);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDeleted = async () => {
    if (selectedRowKeys.length) {
      dispatch(deleteVehicle(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  const handleSearch = value => {
    dispatch(getVehicleDispatch(value));
  };

  return (
    <>
      {isLoading ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Vehicle List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Vehicle
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <AutoComplete placeholder="Search..." onSearch={handleSearch} width="200px" patterns />
          <Popconfirm title="Are you sure to delete this row?" onConfirm={handleDeleted} okText="Yes" cancelText="No">
            <Button block={block} type="dark" style={{ marginTop: block ? 15 : 0 }}>
              Delete
            </Button>
          </Popconfirm>
        </Row>

        <Row>
          <Col lg={24} xs={24}>
            <Cards headless>
              <TableWrapper className="table-data-view table-responsive">
                <Table
                  rowSelection={rowSelection}
                  className="table-responsive"
                  pagination={pagination}
                  dataSource={dataSource}
                  columns={columns}
                  onChange={handleTableChange}
                />
              </TableWrapper>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Vehicle;
