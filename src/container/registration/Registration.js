import React, { useState } from 'react';
import { Row, Col, Select, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import AddUser from './AddUser';
import { Main, TableWrapper } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AutoComplete } from '../../components/autoComplete/autoComplete';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      sn: 1,
      action: (
        <div className="table-actions">
          <Link className="edit">
            <FeatherIcon icon="edit" size={14} />
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link className="delete" to="#">
            <FeatherIcon icon="trash-2" size={14} />
          </Link>
        </div>
      ),
    },
    {
      key: '2',
      name: 'John',
      sn: 2,
      action: (
        <div className="table-actions">
          <Link className="edit">
            <FeatherIcon icon="edit" size={14} />
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link className="delete" to="#">
            <FeatherIcon icon="trash-2" size={14} />
          </Link>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'Employee Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
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

  return (
    <>
      <PageHeader
        ghost
        title="User List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Register User
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option>
          </Select>
          <AutoComplete placeholder="Search..." onSearch={data => console.log(data)} width="200px" patterns />
        </Row>

        <Row>
          <Col lg={24} xs={24}>
            <Cards headless>
              <TableWrapper className="table-data-view table-responsive">
                <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
              </TableWrapper>
            </Cards>
          </Col>
        </Row>
        <AddUser onCancel={onCancel} visible={visible} />
      </Main>
    </>
  );
};

export default Dashboard;
