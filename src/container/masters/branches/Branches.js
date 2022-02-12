import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SaveBranch from './SaveBranches';
import UpdateBranch from './UpdateBranches';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { getBranchDispatch, deleteBranch, getBranchesDispatch } from '../../../redux/branch/actionCreator';
import DataLoader from '../../../components/utilities/DataLoader';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const Branches = () => {
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();
  const [updateBranch, setUpdateBranch] = useState({});

  const dispatch = useDispatch();
  const { branches, isLoader } = useSelector(state => {
    return {
      branches: state.branches.branches,
      isLoader: state.branches.loading,
    };
  });

  const showModalUpdate = data => {
    setVisibleUpdate(true);
    setUpdateBranch(data);
  };

  const onCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch(getBranchesDispatch());
    }
  }, [dispatch]);

  const dataSource = [];

  branches.map((branch, key) => {
    const { id, name, abbreviation, code, description } = branch;
    return dataSource.push({
      key: id,
      name,
      abbreviation,
      code,
      description,
      sn: key + 1,
      action: (
        <div className="table-actions">
          <Link onClick={() => showModalUpdate(branch)} to="#" className="edit">
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Abbreviation',
      dataIndex: 'abbreviation',
      key: 'abbreviation',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

  const onSelectChange = selectedRowKey => {
    setSelectedRowKeys(selectedRowKey);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearch = value => {
    dispatch(getBranchDispatch(value));
  };

  const handleDeleted = () => {
    if (selectedRowKeys.length) {
      dispatch(deleteBranch(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  return (
    <>
      {isLoader ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Branch List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Branch
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
        <SaveBranch onCancel={onCancel} visible={visible} />
        <UpdateBranch onCancel={onCancelUpdate} visible={visibleUpdate} branch={updateBranch} />
      </Main>
    </>
  );
};

export default Branches;
