import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { DataService } from '../../../config/dataService/dataService';
import DataLoader from '../../../components/utilities/DataLoader';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const Customers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  useEffect(() => {
    async function getDataFromServer() {
      try {
        setLoading(true);
        const res = await DataService.get(`/customer`);

        setLoading(false);
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    if (pathname) {
      getDataFromServer();
    }
  }, [pathname]);

  const dataSource = [];

  data.map((customer, key) => {
    const { name, address, id, email, city, telephone } = customer;
    return dataSource.push({
      key: id,
      sn: key + 1,
      name,
      address,
      email,
      city,
      telephone,
      lrCreate: '15',
      action: (
        <div className="table-actions">
          <Link to={`/admin/update-customers/${id}`} className="edit">
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Contact Number',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Total LR Created',
      dataIndex: 'lrCreate',
      key: 'lrCreate',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const history = useHistory();
  const showModal = () => {
    history.replace('/admin/save-customers');
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
      // dispatch(deleteBranch(selectedRowKeys.toString()));
      setLoading(true);
      const res = await DataService.delete(`/customer?id=${selectedRowKeys.toString()}`);
      if (res.data.status === 200) {
        setLoading(false);
        setData(res.data.data);
      } else {
        setLoading(false);
        console.log('data not found');
      }
    } else {
      setLoading(false);
      openNotificationWithIcon();
    }
  };

  const handleSearch = async value => {
    try {
      setLoading(true);
      const res = await DataService.get(`/customer/query?data=${value}`);

      if (res.data.status === 200) {
        setLoading(false);
        setData(res.data.data);
      } else {
        setLoading(false);
        console.log('data not found');
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Customer List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Customer
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <AutoComplete placeholder="Search..." onSearch={handleSearch} width="200px" patterns />
          <Button onClick={handleDeleted} block={block} type="dark" style={{ marginTop: block ? 15 : 0 }}>
            Delete
          </Button>
        </Row>

        <Row>
          <Col lg={24} xs={24}>
            <Cards headless>
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
      </Main>
    </>
  );
};

export default Customers;
