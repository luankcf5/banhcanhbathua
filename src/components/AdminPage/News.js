import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React, { Fragment, useState } from "react";
import firebase from "../../firebase/config";
import { addDocument, DelDocument } from "../../firebase/services";
import useFirestore from "./../../Hooks/useFirestore";

export default function BannerTable() {
  const menu = useFirestore("news");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [photo, setPhoto] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [form] = Form.useForm();

  const handleAddClick = () => {
    setModalVisible1(true);
  };
  const UploadFile = async () => {
    const storageRef = await firebase
      .storage()
      .ref(`images/${photo.name}`)
      .put(photo);
    const imageSrc = await storageRef.ref.getDownloadURL();
    setPhotoURL(imageSrc);
  };
  const handldeOk1 = () => {
    UploadFile();
    setTimeout(() => {
      addDocument("news", {
        ...form.getFieldValue(),
        photoURL: photoURL,
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
    DelDocument("news", form.getFieldValue("id"));
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
          <h1>QUẢN LÝ BÀI ĐĂNG CỦA QUÁN</h1>
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
              <th>Tiêu đề bài đăng</th>
              <th>Nội dung</th>
              <th>Hình ảnh</th>
              <th>Ngày đăng</th>
            </tr>
            {menu.map(({ uid, photoURL, title, createdAt, content }) => (
              <tr key={uid}>
                <td>{uid}</td>
                <td>{title}</td>
                <td>{content}</td>
                <td>
                  <img
                    src={photoURL}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{moment.unix(createdAt).format("DD/MM HH:MM")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Modal
          title="Thêm bài đăng"
          visible={modalVisible1}
          getContainer={false}
          onOk={handldeOk1}
          onCancel={handleCancel1}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nhập vào mã số bài đăng: (Lưu ý không trùng với các mã số khác)"
              name="uid"
            >
              <Input placeholder="Nhập vào mã số bài đăng..." />
            </Form.Item>
            <Form.Item label="Nhập vào tiêu đề bài đăng:" name="title">
              <Input placeholder="Nhập vào tiêu đề bài đăng..." />
            </Form.Item>
            <Form.Item label="Nhập vào nội dung bài đăng:" name="span">
              <Input placeholder="Nhập vào nội dung bài đăng..." />
            </Form.Item>
            <Form.Item
              label="Upload hình ảnh món ăn (đợi file upload khoảng 5 giây...):"
              name="null"
            >
              <Input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Modal
          title="Xoá bài đăng"
          visible={modalVisible2}
          getContainer={false}
          onOk={handldeOk2}
          onCancel={handleCancel2}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nhập vào mã số bài đăng cần xoá (nhập chính xác):"
              name="id"
            >
              <Input placeholder="Nhập vào mã số bài đăng cần xoá..." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
}
