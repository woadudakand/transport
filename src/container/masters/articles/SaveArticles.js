import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { getBranchesDispatch } from '../../../redux/branch/actionCreator';
import { articlesAddDispatch } from '../../../redux/articles/actionCreator';

const { Option } = Select;

const SaveArticles = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { branches } = useSelector(state => {
    return {
      branches: state.branches.branches,
    };
  });

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(getBranchesDispatch());
    }
  }, [dispatch]);

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
      name: values.name,
      description: values.description,
      branch: values.branch,
    };

    if (customValues.name) {
      dispatch(articlesAddDispatch(customValues));
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      type={state.modalType}
      title="Save Articles"
      visible={state.visible}
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
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Select Branch',
                },
              ]}
              name="branch"
              initialValue=""
              label="Branch"
            >
              <Select style={{ width: '100%' }}>
                <Option value="">Choose Branch</Option>
                <Option value="kolkata">Kolkata</Option>
                {branches.map((branch, key) => (
                  <Option key={key + 1} value={branch.name}>
                    {branch.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input Article name',
                },
              ]}
              name="name"
              label="Article Name"
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Input Description',
                },
              ]}
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Write article description here" />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

SaveArticles.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default SaveArticles;
