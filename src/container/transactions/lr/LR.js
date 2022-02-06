import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperRight } from './Style';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';

const LorryReceipt = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  const dataSource = [];

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
      title: 'PayType',
      dataIndex: 'payType',
      key: 'payType',
    },
    {
      title: 'GrandTotal',
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

  return (
    <>
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
            <Select style={{ width: 200 }} defaultValue="Kaij">
              <Select.Option value="kaij">Kaij</Select.Option>
              <Select.Option value="Pune">Pune</Select.Option>
            </Select>
          </div>
          <WrapperRight className="right">
            <AutoComplete placeholder="Search..." onSearch={data => console.log(data)} width="200px" patterns />
            <Button block={block} type="dark" style={{ marginTop: block ? 15 : 0 }}>
              Delete
            </Button>
          </WrapperRight>
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

export default LorryReceipt;
