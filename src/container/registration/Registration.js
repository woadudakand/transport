import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Table, Popconfirm } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import { Main, TableWrapper } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { getUsersDispatch, deleteUser, getUserDispatch } from '../../redux/users/actionCreator';
import DataLoader from '../../components/utilities/DataLoader';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, isLoader } = useSelector(state => {
    return {
      users: state.users.users,
      isLoader: state.users.loading,
    };
  });

  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [branch, setBranch] = useState('*');
  const [updateUser, setUpdateUser] = useState({});

  const dataSource = [];

  const handleDeleted = id => {
    dispatch(deleteUser(id));
  };

  const showModalUpdate = data => {
    setVisibleUpdate(true);
    setUpdateUser(data);
  };

  users.map((user, key) => {
    const { id, username, employee, password } = user;
    return dataSource.push({
      key: id,
      username,
      employee,
      password,
      sn: key + 1,
      action: (
        <div className="table-actions">
          <Link onClick={() => showModalUpdate(user)} to="#" className="edit">
            <FeatherIcon icon="edit" size={14} />
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDeleted(id)}
            okText="Yes"
            cancelText="No"
          >
            <Link className="delete" to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </Popconfirm>
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
      title: 'Employee Name',
      dataIndex: 'employee',
      key: 'employee',
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

  const onCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  useEffect(() => {
    if (dispatch) {
      dispatch(getUsersDispatch('*'));
    }
  }, [dispatch]);

  const handleBranch = value => {
    setBranch(value);
    dispatch(getUsersDispatch(value));
    console.log(branch);
  };

  const handleSearch = value => {
    dispatch(getUserDispatch(value));
  };

  return (
    <>
      {isLoader ? <DataLoader /> : null}
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
          <div>
            Select Branch : &nbsp;&nbsp;&nbsp;&nbsp;
            <Select onChange={handleBranch} defaultValue="*" style={{ width: 200, marginBottom: 15 }}>
              <Select.Option value="*">All</Select.Option>
              <Select.Option value="pune">Pune</Select.Option>
              <Select.Option value="kallam">Kallam</Select.Option>
              <Select.Option value="latur">Latur</Select.Option>
              <Select.Option value="kaij">Kaij</Select.Option>
              <Select.Option value="gulai,latur">Gulai, Latur</Select.Option>
              <Select.Option value="thane,mumbai">Thane, Mumbai</Select.Option>
            </Select>
          </div>
          <AutoComplete placeholder="Search..." onSearch={handleSearch} width="200px" patterns />
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
        <UpdateUser user={updateUser} onCancel={onCancelUpdate} visible={visibleUpdate} />
      </Main>
    </>
  );
};

export default Dashboard;
