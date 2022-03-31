import React, { useRef, useState } from "react";
import { Breadcrumb, Divider, Layout, Menu, Switch } from "antd";
import {
  CoffeeOutlined,
  ContactsOutlined,
  ContainerOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  PhoneOutlined,
  ReadOutlined,
  ShoppingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Banner from "./Banner";
import MenuFood from "./MenuFood";
import News from "./News";
import Preview from "./Preview";
import Address from "./Address";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function Homepage() {
  const [closeTab, setCloseTab] = useState(false);
  const home = useRef();
  const banner = useRef();
  const menu = useRef();
  const address = useRef();
  const news = useRef();
  const preview = useRef();

  //fireStore

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="sider"
        theme="light"
        style={closeTab ? { display: "block" } : { display: "none" }}
      >
        <div className="logo" />
        <Menu defaultSelectedKeys={["home"]} mode="inline">
          <Menu.Item
            key="home"
            icon={<HomeOutlined />}
            onClick={() => home.current.scrollIntoView()}
          >
            TRANG CHỦ
          </Menu.Item>
          <Menu.Item
            key="banner"
            icon={<ContainerOutlined />}
            onClick={() => banner.current.scrollIntoView()}
          >
            BÀI VIẾT
          </Menu.Item>
          <SubMenu
            key="information"
            icon={<ContactsOutlined />}
            title="LIÊN HỆ"
          >
            <Menu.Item
              key="phone"
              icon={<PhoneOutlined />}
              onClick={() => address.current.scrollIntoView()}
            >
              GỌI ĐIỆN
            </Menu.Item>
            <Menu.Item
              key="address"
              icon={<EnvironmentOutlined />}
              onClick={() => address.current.scrollIntoView()}
            >
              ĐỊA CHỈ
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="menu"
            icon={<MenuFoldOutlined />}
            title="THỰC ĐƠN"
            onClick={() => menu.current.scrollIntoView()}
          >
            <Menu.Item
              key="food"
              icon={<ShoppingOutlined />}
              onClick={() => menu.current.scrollIntoView()}
            >
              MÓN ĂN
            </Menu.Item>
            <Menu.Item
              key="drink"
              icon={<CoffeeOutlined />}
              onClick={() => menu.current.scrollIntoView()}
            >
              ĐỒ UỐNG
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="news"
            icon={<ReadOutlined />}
            onClick={() => news.current.scrollIntoView()}
          >
            TIN TỨC
          </Menu.Item>
          <Menu.Item
            key="preview"
            icon={<SmileOutlined />}
            onClick={() => preview.current.scrollIntoView()}
          >
            ĐÁNH GIÁ
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className="layout"
        style={closeTab ? { marginLeft: "27vh" } : { marginLeft: "0vh" }}
      >
        <Header className="layout-header">
          <h1>Bánh canh Bà Thừa</h1>
          <Switch
            style={{ position: "fixed", marginLeft: "40px" }}
            onClick={() => setCloseTab(!closeTab)}
          />
        </Header>
        <div ref={home}></div>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: " 16px 20px" }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          </Breadcrumb>
          <div ref={banner}></div>
          <Banner />
          <Divider />
          <div ref={menu}></div>
          <MenuFood />
          <Divider />
          <div ref={news}></div>
          <News />
          <Divider />
          <div ref={preview}></div>
          <Preview />
          <Divider />
          <div ref={address}></div>
          <Address />
          <Divider />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Design by Truyen thong ADS Company ©2022 Phone: 0918 690 099
        </Footer>
      </Layout>
    </Layout>
  );
}
