/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SaveBank from './SaveAccounts';
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
  const { accounts, isLoading } = useSelector(state => {
    return {
      accounts: state.accounts.data,
      isLoading: state.accounts.loading,
    };
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(getBankAccounts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);
  // console.log(accounts);
  const dataSource = [];

  accounts.map(
    ({ id, ifsc_code, account_holder, bank_name, account_no, branch_name, account_type, opening_balance }, key) =>
      dataSource.push({
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
            <Link to="#" className="edit">
              <FeatherIcon icon="edit" size={14} />
            </Link>
          </div>
        ),
      }),
  );

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
        <SaveBank onCancel={onCancel} visible={visible} />
      </Main>
    </>
  );
};

export default BankAccounts;
