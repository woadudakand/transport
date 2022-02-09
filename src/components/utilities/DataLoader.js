import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00000020;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
`;

const DataLoader = () => {
  return (
    <Loader>
      <Spin />
    </Loader>
  );
};

export default DataLoader;
