import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { updateArticle } from '../../../redux/articles/actionCreator';

const { Option } = Select;

const UpdateArticles = ({ visible, onCancel, article }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { branches } = useSelector(state => {
    return {
      branches: state.branches.list,
    };
  });
  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = values => {
    const customValues = {
      id: article.id,
      title: values.title,
      description: values.description,
      branches_id: values.branches_id,
      created_at: moment().format('YYYY-MM-DD'),
    };

    if (customValues.title) {
      dispatch(updateArticle(customValues));
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(article);
    }
  }, [form, article, visible]);

  return (
    <Modal
      type={state.modalType}
      title="Save Articles"
      visible={state.visible}
      forcerender
      footer={[
        <div key="1" className="project-modal-footer">
          <Form form={form} name="createArticle" onFinish={handleOk}>
            <Button htmlType="submit" size="default" type="primary" key="submit" onClick={handleOk}>
              Save
            </Button>
            <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="createArticle" onFinish={handleOk}>
            <Form.Item name="branches_id" label="Branch">
              <Select style={{ width: '100%' }}>
                <Option value="">Choose Branch</Option>
                {branches.map((branch, key) => (
                  <Option key={key + 1} value={branch.id}>
                    {branch.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="title" label="Article Name">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Write article description here" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

UpdateArticles.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  article: propTypes.object,
};

export default UpdateArticles;
