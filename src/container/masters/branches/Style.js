import styled from 'styled-components';

export const FormValidationWrap = styled.div`
  .ant-card-body {
    padding: 30px 25px 50px 25px !important;
  }
  .ant-form-item-has-error {
    .ant-form-item-explain {
      font-size: 13px;
    }
  }
  .sDash_agree-check {
    .ant-form-item-control-input {
      min-height: auto;
    }
    .ant-form-item-has-error {
      .ant-checkbox-wrapper {
        span {
          font-size: 13px;
          color: ${({ theme }) => theme['danger-color']};
        }
        .ant-checkbox {
          border-color: ${({ theme }) => theme['danger-color']}30;
          &.ant-checkbox-checked {
            border-color: ${({ theme }) => theme['danger-color']}30;
            &:after {
              border-color: ${({ theme }) => theme['danger-color']}30;
            }
            .ant-checkbox-inner {
              &:after {
                border-color: ${({ theme }) => theme['danger-color']};
              }
            }
          }
          .ant-checkbox-inner {
            border-color: ${({ theme }) => theme['danger-color']}30;
            background-color: ${({ theme }) => theme['danger-color']}30;
          }
        }
      }
    }
    .ant-form-item-explain {
      margin-left: 25px;
      font-size: 13px;
    }
  }
  .sDash_form-action {
    button {
      border-radius: 4px;
      padding: 6.4px 29.2px;
      height: 44px;
    }
  }
`;

export const VerticalFormStyleWrap = styled.div`
  .ant-card {
    margin-bottom: 25px;
  }
  .ant-input-affix-wrapper > input.ant-input {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .ant-input-affix-wrapper .ant-input-prefix svg {
    color: ${({ theme }) => theme['gray-color']};
  }
  .sDash_form-action {
    margin: -7.5px;
    button {
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      margin: 7.5px;
      padding: 6.4px 19px;
      &.ant-btn-light {
        height: 44px;
        background-color: #f1f2f6;
        border-color: #f1f2f6;
      }
    }
    .ant-form-item {
      margin-bottom: 25px !important;
    }
    .ant-btn-light {
      background-color: #f8f9fb;
    }
  }
`;
