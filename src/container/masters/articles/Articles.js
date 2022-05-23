import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Table, notification, Popconfirm } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import SaveArticle from './SaveArticles';
import UpdateArticle from './UpdateArticles';
import { Main, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { getArticleDispatch, deleteArticle, getArticlesDispatch } from '../../../redux/articles/actionCreator';
import DataLoader from '../../../components/utilities/DataLoader';
import { getBranchListDispatch } from '../../../redux/branch/actionCreator';

const openNotificationWithIcon = () => {
  notification.error({
    message: 'Deleted!',
    description: 'Please Select minimum one row.',
  });
};

const Articles = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [block, setBlock] = useState(false);
  const { pathname } = useLocation();
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [updateArticle, setUpdateArticle] = useState({});

  const [pagination, setPagination] = useState({
    data: [],
    pagi: {
      current: 1,
      pageSize: 1,
    },
    loading: false,
  });

  const getRandomuserParams = params => {
    return {
      results: params.pagination.pageSize,
      page: params.pagination.current,
      total: 100,
      ...params,
    };
  };

  const fetch = useCallback((params = {}) => {
    console.log(getRandomuserParams(params));
    // fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     setPagination({
    //       loading: false,
    //       data: data.results,
    //       pagi: {
    //         ...params.pagination,
    //         total: 200,
    //       },
    //     });
    //   });
  }, []);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      const { pagi } = pagination;
      fetch({ pagination: pagi });
    }

    return () => (unmounted = true);
  }, [fetch, pagination]);

  const handleTableChange = (pagi, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: pagi,
      ...filters,
    });
  };

  const dispatch = useDispatch();
  const { articles, isLoader } = useSelector(state => {
    return {
      articles: state.articles.articles,
      isLoader: state.articles.loading,
    };
  });

  useEffect(() => {
    if (window.innerWidth <= 375) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [pathname]);

  const showModalUpdate = data => {
    setVisibleUpdate(true);
    setUpdateArticle(data);
  };

  const onCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  const dataSource = [];
  articles.map((article, key) => {
    const { id, title, description } = article;
    return dataSource.push({
      key: id,
      name: title,
      description,
      sn: key + 1,
      action: (
        <div className="table-actions">
          <Link onClick={() => showModalUpdate(article)} to="#" className="edit">
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
      title: 'Article Name',
      dataIndex: 'name',
      key: 'name',
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

  useEffect(() => {
    if (dispatch) {
      dispatch(getArticlesDispatch());
      dispatch(getBranchListDispatch());
    }
  }, [dispatch]);

  const handleSearch = value => {
    dispatch(getArticleDispatch(value));
  };

  const handleDeleted = () => {
    if (selectedRowKeys.length) {
      dispatch(deleteArticle(selectedRowKeys.toString()));
    } else {
      openNotificationWithIcon();
    }
  };

  return (
    <>
      {isLoader ? <DataLoader /> : null}
      <PageHeader
        ghost
        title="Articles List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={showModal} size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add Articles
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <AutoComplete placeholder="Search..." onSearch={handleSearch} width="200px" patterns />
          <Popconfirm title="Are you sure to delete this row?" onConfirm={handleDeleted} okText="Yes" cancelText="No">
            <Button block={block} type="dark" style={{ marginTop: block ? 15 : 0 }}>
              Delete
            </Button>
          </Popconfirm>
        </Row>

        <Row>
          <Col lg={24} xs={24}>
            <Cards headless>
              <TableWrapper className="table-data-view table-responsive">
                <Table
                  rowSelection={rowSelection}
                  className="table-responsive"
                  pagination={pagination.pagi}
                  dataSource={dataSource}
                  columns={columns}
                  onChange={handleTableChange}
                />
              </TableWrapper>
            </Cards>
          </Col>
        </Row>
        <SaveArticle onCancel={onCancel} visible={visible} />
        <UpdateArticle onCancel={onCancelUpdate} visible={visibleUpdate} article={updateArticle} />
      </Main>
    </>
  );
};

export default Articles;
