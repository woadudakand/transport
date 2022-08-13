import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Select, notification, Popconfirm } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { WrapperRight } from './Style';
import moment from 'moment';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import DataLoader from '../../../components/utilities/DataLoader';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import {
  getLorryReceiptsDispatch,
  deleteLorryReceipt,
  getLorryReceiptDispatch,
} from '../../../redux/lorryReceipt/actionCreator';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const LorryReceipt = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { lorryReceipt, isLoading } = useSelector(state => {
    return {
      lorryReceipt: state.lorryReceipt.lorryReceipt,
      isLoading: state.lorryReceipt.loading,
    };
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      getLorryReceiptsDispatch(pagination.current, pagination.pageSize, total =>
        setPagination({
          ...pagination,
          total,
        }),
      ),
    );
  }, [pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch(getLorryReceiptsDispatch());
    }
  }, [dispatch]);

  const handleTableChange = ({ current, pageSize }) => {
    dispatch(
      getLorryReceiptsDispatch(current, pageSize, total =>
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

  const dataSource = [];

  lorryReceipt.map((lrorry, key) => {
    const {
      id,
      invoice_no,
      created_at,
      customer_id_from,
      consigner_address_from,
      customer_id_to,
      consigner_address_to,
      lorry_billings,
      lorry_freights,
    } = lrorry;
    console.log(lrorry);
    return dataSource.push({
      key: id,
      sn: key + 1,
      lrNo: invoice_no,
      date: moment(created_at).format('YYYY-MM-DD'),
      consigner: customer_id_from,
      from: consigner_address_from,
      consignee: customer_id_to,
      to: consigner_address_to,
      payType: lorry_billings.pay_type,
      // grandTotal: lorry_freights.total,
      action: (
        <div className="table-actions">
          <Link to={`/admin/update-lr/${id}`} className="edit">
            <FeatherIcon icon="edit" size={14} />
          </Link>
        </div>
      ),
    });
  });
  // console.log(lorryReceipt);

  const columns = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'LR No',
      dataIndex: 'lrNo',
      key: 'lrNo',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Consigner',
      dataIndex: 'consigner',
      key: 'consigner',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Consignee',
      dataIndex: 'consignee',
      key: 'consignee',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Pay Type',
      dataIndex: 'payType',
      key: 'payType',
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const history = useHistory();

  const showModal = () => {
    history.replace('/admin/save-lr');
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
      dispatch(deleteLorryReceipt(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  const handleSearch = value => {
    dispatch(getLorryReceiptDispatch(value));
  };

  return (
    <>
      {isLoading ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Lorry Receipt"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              New LR
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <div className="left">
            <p>Branch:</p>
            <Select style={{ width: 200 }} defaultValue="Select a Branch">
              <Select.Option value="kaij">Kaij</Select.Option>
              <Select.Option value="Pune">Pune</Select.Option>
            </Select>
          </div>
          <WrapperRight className="right">
            <AutoComplete placeholder="Search..." onSearch={handleSearch} width="200px" patterns />
            <Popconfirm title="Are you sure to delete this row?" onConfirm={handleDeleted} okText="Yes" cancelText="No">
              <Button block={block} type="dark" style={{ marginTop: block ? 15 : 0 }}>
                Delete
              </Button>
            </Popconfirm>
          </WrapperRight>
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

export default LorryReceipt;
