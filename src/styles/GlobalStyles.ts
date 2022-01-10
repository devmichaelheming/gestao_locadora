import { createGlobalStyle } from "styled-components";
import 'antd/dist/antd.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: auto;
    background: var(--primary);

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #9DA0AA;
        border-radius: 4px;
    }

    .ant-picker-range {
      width: 100%;
    }

    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      display: none;
    }
  }

  .content {
    padding: 70px 0 24px 0px;
    width: 100%;
    height: auto;
  }
  
  *, button, input {
    font-family: "Roboto", sans-serif;
  }

  h1, h2, h3, h4, h5 {
    color: var(--secondary);
  }

  :root {
    --primary: #EEF2F4;
    --secondary: #7d8386;
    --tertiary: #707B81;
    --quaternary: #646871;
    --quinary: #393d42;
    --senary: #828386;

    --button: #0077b5;
    --buttonHover: #026091;
  }
`;
