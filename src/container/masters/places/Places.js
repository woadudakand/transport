import React, { useState, useEffect } from 'react';
import { Row, Col, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SavePlace from './SavePlaces';
import UpdatePlace from './UpdatePlaces';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { getPlacesDispatch, getPlaceDispatch, deletePlace } from '../../../redux/places/actionCreator';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const Places = () => {
  const dispatch = useDispatch();
  const { places } = useSelector(state => {
    return {
      places: state.places.places,
      isLoader: state.places.loading,
    };
  });

  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();
  const [updatePlace, setUpdatePlace] = useState({});

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch(getPlacesDispatch());
    }
  }, [dispatch]);

  const dataSource = [];

  const onCancelUpdate = () => {
    setVisibleUpdate(false);
  };
  const showModalUpdate = data => {
    setVisibleUpdate(true);
    setUpdatePlace(data);
  };

  places.map((place, key) => {
    const { id, name, abbreviation } = place;
    return dataSource.push({
      key: id,
      name,
      abbreviation,
      sn: key + 1,
      action: (
        <div className="table-actions">
          <Link onClick={() => showModalUpdate(place)} to="#" className="edit">
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
      title: 'Place Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Place Abbreviation',
      dataIndex: 'abbreviation',
      key: 'abbreviation',
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
    dispatch(getPlaceDispatch(value));
  };

  const handleDeleted = () => {
    if (selectedRowKeys.length) {
      dispatch(deletePlace(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };
  return (
    <>
      <PageHeader
        ghost
        title="Place List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Place
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
        <SavePlace onCancel={onCancel} visible={visible} />
        <UpdatePlace place={updatePlace} onCancel={onCancelUpdate} visible={visibleUpdate} />
      </Main>
    </>
  );
};

export default Places;
