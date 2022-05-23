import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Select, DatePicker, Divider } from 'antd';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { useLocation, useHistory } from 'react-router-dom';
import { WrapperRight } from './Style';
import { BasicFormWrapper, Main, TableWrapper } from '../../styled';
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
      title: 'Date & Time',
      dataIndex: 'd&t',
      key: 'd&t',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      key: 'debit',
    },
    {
      title: 'Bank/Account Number',
      dataIndex: 'baNo',
      key: 'baNo',
    },
    {
      title: 'Chalan Number',
      dataIndex: 'cNo',
      key: 'cNo',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];
  // Date format
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  const history = useHistory();
  const showModal = () => {
    history.replace('/admin/save-pch');
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
        title="Petty Cash History"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              New Transaction
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
              <Row gutter={24}>
                <Col md={12} sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <DatePicker
                    defaultValue={moment('01/01/2015', dateFormatList[0])}
                    format={dateFormatList}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col md={12} sm={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <DatePicker
                    defaultValue={moment('10/02/2015', dateFormatList[0])}
                    format={dateFormatList}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              <Divider />
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
