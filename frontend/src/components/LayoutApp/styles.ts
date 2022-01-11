import styled from 'styled-components';

export const Container = styled.div`
    .ant-layout {
        height: 100vh;
    }
    .trigger {
        padding: 0 24px;
        font-size: 18px;
        line-height: 64px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .site-layout .site-layout-background {
        background: #fff;
        display: flex;
    }
`;

export const TitleHeader = styled.div`
    font-size: 18px;
    font-weight: 500;
`

export const SectionLogo = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
`

export const Logo = styled.img`
    height: 17px;
    margin: 16px;
    object-fit: cover;
    flex-shrink: 0;
`
export const LogoMobile = styled.img`
    height: 50px;
    object-fit: cover;
    flex-shrink: 0;
`