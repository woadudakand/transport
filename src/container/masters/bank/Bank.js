/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SaveBank from './SaveBank';
import UpdateBankModal from './UpdateBank';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { deleteBank, getBankDispatch, getBanksDispatch } from '../../../redux/banks/actionCreator';
import DataLoader from '../../../components/utilities/DataLoader';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const Bank = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [updateBank, setUpdateBank] = useState({});

  const { banks, isLoading } = useSelector(state => {
    return {
      banks: state.bank.data,
      isLoading: state.bank.loading,
    };
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(getBanksDispatch());
    }
  }, [dispatch]);

  const showModalUpdate = data => {
    setVisibleUpdate(true);
    setUpdateBank(data);
  };

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  const dataSource = [];

  banks.map((value, key) => {
    const { id, bank_name, branch_name, branch_code, ifsc_code, micr_code, telephone, email, address } = value;

    return dataSource.push({
      key: id,
      name: bank_name,
      sn: key + 1,
      branch: branch_name,
      code: branch_code,
      address,
      ifsc: ifsc_code,
      micr: micr_code,
      telephone,
      email,
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
      title: 'Bank Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Branch Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'IFSC',
      dataIndex: 'ifsc',
      key: 'ifsc',
    },
    {
      title: 'MICR',
      dataIndex: 'micr',
      key: 'micr',
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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

  const handleSearch = value => {
    dispatch(getBankDispatch(value));
  };

  const handleDeleted = () => {
    if (selectedRowKeys.length) {
      dispatch(deleteBank(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  const onCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  return (
    <>
      {isLoading ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Bank List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Bank
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
        <UpdateBankModal onCancel={onCancelUpdate} visible={visibleUpdate} bank={updateBank} />
      </Main>
    </>
  );
};

export default Bank;
