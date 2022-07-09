/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification, Popconfirm } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SaveAccount from './SaveAccounts';
import UpdateAccount from './updateAccounts';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { deleteBankAccount, getBankAccount, getBankAccounts } from '../../../redux/bankAccounts/actionCreator';
import DataLoader from '../../../components/utilities/DataLoader';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const BankAccounts = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const { accounts, isLoading } = useSelector(state => {
    return {
      accounts: state.accounts.data,
      isLoading: state.accounts.loading,
    };
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      getBankAccounts(pagination.current, pagination.pageSize, total =>
        setPagination({
          ...pagination,
          total,
        }),
      ),
    );
  }, [pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch(getBankAccounts());
    }
  }, [dispatch]);

  const handleTableChange = ({ current, pageSize }) => {
    dispatch(
      getBankAccounts(current, pageSize, total =>
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
    setUpdateData(data);
  };
  const onCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  const dataSource = [];

  accounts.map((value, key) => {
    const { id, ifsc_code, account_holder, bank_name, account_no, branch_name, account_type, opening_balance } = value;
    return dataSource.push({
      key: id,
      name: bank_name,
      sn: key + 1,
      acNumber: account_no,
      holderName: account_holder,
      branch: branch_name,
      type: account_type,
      oBalance: opening_balance,
      ifsc: ifsc_code,

      action: (
        <div className="table-actions">
          <Link onClick={() => showModalUpdate(value)} to="#" className="edit">
            <FeatherIcon icon="edit" size={14} />
          </Link>
        </div>
      ),
    });
  });

  const columns = [
    {
      title: 'SR',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'Account Number',
      dataIndex: 'acNumber',
      key: 'acNumber',
    },
    {
      title: 'Holder Name',
      dataIndex: 'holderName',
      key: 'holderName',
    },
    {
      title: 'Account Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Bank Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'IFSC',
      dataIndex: 'ifsc',
      key: 'ifsc',
    },

    {
      title: 'Opening Balance',
      dataIndex: 'oBalance',
      key: 'oBalance',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '50px',
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

  const handleDeleted = () => {
    if (selectedRowKeys.length) {
      dispatch(deleteBankAccount(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  const handleSearch = value => {
    dispatch(getBankAccount(value));
  };

  return (
    <>
      {isLoading ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Bank Account List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Account
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <AutoComplete placeholder="Search..." onSearch={data => handleSearch(data)} width="200px" patterns />
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
        <SaveAccount onCancel={onCancel} visible={visible} />
        <UpdateAccount onCancel={onCancelUpdate} visible={visibleUpdate} account={updateData} />
      </Main>
    </>
  );
};

export default BankAccounts;
