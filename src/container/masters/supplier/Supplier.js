import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification, Popconfirm } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import DataLoader from '../../../components/utilities/DataLoader';
import { getSuppliersDispatch, deleteSupplier, getSupplierDispatch } from '../../../redux/supplier/actionCreator';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const Supplier = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { suppliers, isLoading } = useSelector(state => {
    return {
      suppliers: state.suppliers.suppliers,
      isLoading: state.suppliers.loading,
    };
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      getSuppliersDispatch(pagination.current, pagination.pageSize, total =>
        setPagination({
          ...pagination,
          total,
        }),
      ),
    );
  }, [pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch(getSuppliersDispatch());
    }
  }, [dispatch]);

  const handleTableChange = ({ current, pageSize }) => {
    dispatch(
      getSuppliersDispatch(current, pageSize, total =>
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
  //     name: 'Ravi',
  //     address: 'Hadpsar',
  //     city: 'Pune',
  //     contact: '0175555',
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

  suppliers.map((supplier, key) => {
    const { supplier_name, address, id, email, city, telephone } = supplier;
    return dataSource.push({
      key: id,
      sn: key + 1,
      name: supplier_name,
      address,
      email,
      city,
      contact: telephone,
      action: (
        <div className="table-actions">
          <Link to={`/admin/update-supplier/${id}`} className="edit">
            <FeatherIcon icon="edit" size={14} />
          </Link>
        </div>
      ),

      // action: (
      //   <div className="table-actions">
      //     <Link to="#" className="edit">
      //       <FeatherIcon icon="edit" size={14} />
      //     </Link>
      //   </div>
      // ),
    });
  });

  console.log(suppliers);

  const columns = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'Supplier Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Supplier Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Email Id',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const history = useHistory();

  const showModal = () => {
    history.replace('/admin/save-supplier');
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
      dispatch(deleteSupplier(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  const handleSearch = value => {
    dispatch(getSupplierDispatch(value));
  };

  return (
    <>
      {isLoading ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Supplier List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Supplier
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          {/* <AutoComplete placeholder="Search..." onSearch={data => console.log(data)} width="200px" patterns /> */}
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

export default Supplier;
