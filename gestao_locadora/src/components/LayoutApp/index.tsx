import React, { ReactNode, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraAddOutlined,
} from 'styles/icons';
import { Container, TitleHeader, SectionLogo, Logo, LogoMobile } from './styles';

import { LogoAuditoria, LogoAuditoriaMobile } from "assets";

const { Header, Sider, Content } = Layout;

type Props = {
    children: ReactNode
}

const LayoutApp = function ({ children }: Props){
  const [ collapsed, setCollapsed ] = useState(false);

  function toggle() {
    setCollapsed(
      !collapsed
    );
  };

  return (
    <Container>
       <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <SectionLogo>
            {
              collapsed ?
              ( <LogoMobile src={LogoAuditoriaMobile}/> ) :
              ( <Logo src={LogoAuditoria}/> )
            }
            
          </SectionLogo>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UsergroupDeleteOutlined />}>
              <Link to="/clientes">Clientes</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraAddOutlined />}>
              <Link to="/filmes">Filmes</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => toggle(),
            })}
            <TitleHeader>
              GESTÃO DE LOCAÇÃO DE FILMES
            </TitleHeader>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            { children }
          </Content>
        </Layout>
      </Layout>
    </Container>
  );
}

export { LayoutApp };