import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { addDocument, DelDocument } from "../../firebase/services";
import useFirestore from "./../../Hooks/useFirestore";

export default function BannerTable() {
  const menu = useFirestore("preview");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [form] = Form.useForm();

  const handleAddClick = () => {
    setModalVisible1(true);
  };
  const handldeOk1 = () => {
    setTimeout(() => {
      addDocument("preview", {
        ...form.getFieldValue(),
      });
      form.resetFields();
      setModalVisible1(false);
    }, 1000);
  };
  const handleCancel1 = () => {
    form.resetFields();
    setModalVisible1(false);
  };

  const HandleDeleteClick = () => {
    setModalVisible2(true);
  };
  const handldeOk2 = () => {
    DelDocument("preview", form.getFieldValue("id"));
    form.resetFields();
    setModalVisible2(false);
  };
  const handleCancel2 = () => {
    form.resetFields();
    setModalVisible2(false);
  };

  return (
    <Fragment>
      <div>
        <div className="table-header">
          <h1>QUẢN LÝ BÀI ĐÁNH GIÁ</h1>
          <div>
            <Button type="primary" size="large" onClick={handleAddClick}>
              Thêm nội dung
            </Button>
            <Button type="danger" size="large" onClick={HandleDeleteClick}>
              Xoá nội dung
            </Button>
          </div>
        </div>

        <table className="my_table">
          <tbody>
            <tr>
              <th>Mã số</th>
              <th>Tên người đánh giá</th>
              <th>Nội dung</th>
              <th>Ngày đăng</th>
            </tr>
            {menu.map(({ uid, name, content, createdAt }) => (
              <tr key={uid}>
                <td>{uid}</td>
                <td>{name}</td>
                <td>{content}</td>
                <td>{moment.unix(createdAt).format("DD/MM HH:MM")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Modal
          title="Thêm bài đánh giá"
          visible={modalVisible1}
          getContainer={false}
          onOk={handldeOk1}
          onCancel={handleCancel1}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nhập vào mã số đánh giá: (Lưu ý không trùng với các mã số khác)"
              name="uid"
            >
              <Input placeholder="Nhập vào mã số đánh giá..." />
            </Form.Item>
            <Form.Item label="Nhập vào tên người đánh giá:" name="title">
              <Input placeholder="Nhập vào tên người đánh giá..." />
            </Form.Item>
            <Form.Item label="Nhập vào nội dung bài đánh giá:" name="span">
              <Input placeholder="Nhập vào nội dung bài đánh giá..." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Modal
          title="Xoá bài đánh giá"
          visible={modalVisible2}
          getContainer={false}
          onOk={handldeOk2}
          onCancel={handleCancel2}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nhập vào mã số bài đánh giá cần xoá (nhập chính xác):"
              name="id"
            >
              <Input placeholder="Nhập vào mã số bài đánh giá cần xoá..." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
}
