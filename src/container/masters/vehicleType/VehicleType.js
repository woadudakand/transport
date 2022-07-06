import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification, Popconfirm } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SaveArticle from './SaveType';
import UpdateType from './UpdateType';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import {
  getVehicleTypesDispatch,
  getVehicleTypeDispatch,
  deleteVehicleType,
} from '../../../redux/vehicleType/actionCreator';
import DataLoader from '../../../components/utilities/DataLoader';
import { getBranchListDispatch } from '../../../redux/branch/actionCreator';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const VehicleType = () => {
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();
  const [updateType, setUpdateType] = useState({});

  const dispatch = useDispatch();
  const { vehicleType, isLoader } = useSelector(state => {
    console.log(vehicleType);
    return {
      vehicleType: state.vehicleType.vehicleType,
      isLoader: state.vehicleType.loading,
    };
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      getVehicleTypesDispatch(pagination.current, pagination.pageSize, total =>
        setPagination({
          ...pagination,
          total,
        }),
      ),
    );
  }, [pathname]);

  useEffect(() => {
    if (dispatch) {
      // dispatch(getPlacesDispatch());
      dispatch(getBranchListDispatch());
    }
  }, [dispatch]);

  const handleTableChange = ({ current, pageSize }) => {
    dispatch(
      getVehicleTypesDispatch(current, pageSize, total =>
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

  const showModalUpdate = data => {
    setVisibleUpdate(true);
    setUpdateType(data);
  };

  const onCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  // const dataSource = [
  //   {
  //     key: 1,
  //     type: 'Mrf',
  //     sn: 1,
  //     tyre: 5,
  //     action: (
  //       <div className="table-actions">
  //         <Link to="#" className="edit">
  //           <FeatherIcon icon="edit" size={14} />
  //         </Link>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: 2,
  //     type: 'Heavy',
  //     sn: 2,
  //     tyre: 12,
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
  vehicleType.map((vType, key) => {
    const { id, vehicle_type, tyre_qty } = vType;
    console.log(vType);
    return dataSource.push({
      key: id,
      type: vehicle_type,
      sn: key + 1,
      tyre: tyre_qty,
      action: (
        <div className="table-actions">
          <Link onClick={() => showModalUpdate(vType)} to="#" className="edit">
            <FeatherIcon icon="edit" size={14} />
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
      title: 'Vehicle Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Tyre Quantity',
      dataIndex: 'tyre',
      key: 'tyre',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onSelectChange = selectedRowKey => {
    setSelectedRowKeys(selectedRowKey);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearch = value => {
    dispatch(getVehicleTypeDispatch(value));
  };

  const handleDeleted = () => {
    if (selectedRowKeys.length) {
      dispatch(deleteVehicleType(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  return (
    <>
      {isLoader ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Vehicle Type"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Type
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
        <SaveArticle onCancel={onCancel} visible={visible} />
        <UpdateType vType={updateType} onCancel={onCancelUpdate} visible={visibleUpdate} />
      </Main>
    </>
  );
};

export default VehicleType;
