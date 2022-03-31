import { Breadcrumb, Layout, Menu, Modal, Switch, Form, Input } from "antd";
import React, { Fragment, useState } from "react";
import BannerTable from "./BannerTable";
import MenuTable from "./MenuTable";
import News from "./News";
import Preview from "./Preview";
const USERREF = "admin";
const PASSREF = "banhcanhbathua@2022";

const { Header, Content, Footer, Sider } = Layout;
export default function Admin() {
  const [closeTab, setCloseTab] = useState(true);
  const [selectecMenu, setSelectedMenu] = useState("1");
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();

  const handleOk = () => {
    const data = form.getFieldValue();
    if (data.username === USERREF && data.password === PASSREF) {
      setVisible(false);
    } else setVisible(true);
  };
  const handleCancel = () => {
    setVisible(true);
  };
  const ComponentSwitch = (key) => {
    switch (key) {
      case "1":
        return <BannerTable />;
      case "2":
        return <MenuTable />;
      case "3":
        return <News />;
      case "4":
        return <Preview />;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <Modal
        title="Cần phải đăng nhập để tiếp tục.."
        visible={visible}
        getContainer={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Nhập tên đăng nhập:" name="username">
            <Input placeholder="Nhập tên đăng nhập..." />
          </Form.Item>
          <Form.Item label="Nhập mật khẩu:" name="password">
            <Input type="password" placeholder="Nhập mật khẩu..." />
          </Form.Item>
        </Form>
      </Modal>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="sider"
          theme="light"
          style={closeTab ? { display: "block" } : { display: "none" }}
        >
          <div className="logo" />
          <Menu
            defaultSelectedKeys={["home"]}
            mode="inline"
            onClick={(e) => setSelectedMenu(e.key)}
          >
            <Menu.Item key="5">TRANG QUẢN LÝ</Menu.Item>
            <Menu.Item key="1">BÀI VIẾT</Menu.Item>
            <Menu.Item key="2">MENU</Menu.Item>
            <Menu.Item key="3">BÀI ĐĂNG</Menu.Item>
            <Menu.Item key="4">ĐÁNH GIÁ</Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="layout"
          style={closeTab ? { marginLeft: "27vh" } : { marginLeft: "0vh" }}
        >
          <Header className="layout-header">
            <h1>Bánh canh Bà Thừa - Admin</h1>
            <Switch
              style={{ position: "fixed", marginLeft: "40px" }}
              onClick={() => setCloseTab(!closeTab)}
            />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: " 16px 150px" }}>
              <Breadcrumb.Item>Trang quản lý</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360 }}>
              {ComponentSwitch(selectecMenu)}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Design by Truyen thong ADS Company ©2022 Phone: 0918 690 099
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
}
