import React from 'react';
import { Row, Col, Select, Table, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Main, TableWrapper } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';

const Permission = () => {
  const dataSourceMaster = [
    {
      key: '1',
      menu: 'Article',
      view: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
      edit: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
    },
    {
      key: '2',
      menu: 'Places',
      view: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
      edit: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
    },
  ];

  const columnsMaster = [
    {
      title: 'Menu',
      dataIndex: 'menu',
      key: 'menu',
    },
    {
      title: 'view',
      dataIndex: 'view',
      key: 'view',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
    },
  ];

  const dataSourceTransaction = [
    {
      key: '1',
      menu: 'Lorry Receipt',
      view: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
      edit: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
    },
    {
      key: '2',
      menu: 'Loading Ship List',
      view: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
      edit: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
    },
  ];

  const columnsTransaction = [
    {
      title: 'Menu',
      dataIndex: 'menu',
      key: 'menu',
    },
    {
      title: 'view',
      dataIndex: 'view',
      key: 'view',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
    },
  ];

  return (
    <>
      <PageHeader ghost title="User Permission" />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Select defaultValue="" style={{ width: '30%', marginBottom: 15 }}>
            <Select.Option value="">Choose Branch</Select.Option>
            <Select.Option value="pune">Pune</Select.Option>
            <Select.Option value="kallam">Kallam</Select.Option>
            <Select.Option value="latur">Latur</Select.Option>
            <Select.Option value="kaij">Kaij</Select.Option>
            <Select.Option value="gulai,latur">Gulai, Latur</Select.Option>
            <Select.Option value="thane,mumbai">Thane, Mumbai</Select.Option>
          </Select>
          <Select defaultValue="" style={{ width: '30%' }}>
            <Select.Option value="">Choose User</Select.Option>
            <Select.Option value="arman">Arman</Select.Option>
          </Select>
        </Row>

        <Row>
          <Col lg={24} xs={24}>
            <Cards headless title="Master">
              <TableWrapper className="table-data-view table-responsive">
                <Table
                  className="table-responsive"
                  pagination={false}
                  dataSource={dataSourceMaster}
                  columns={columnsMaster}
                />
              </TableWrapper>
            </Cards>
          </Col>
          <Col lg={24} xs={24}>
            <Cards headless title="Transaction">
              <TableWrapper className="table-data-view table-responsive">
                <Table
                  className="table-responsive"
                  pagination={false}
                  dataSource={dataSourceTransaction}
                  columns={columnsTransaction}
                />
              </TableWrapper>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Permission;
