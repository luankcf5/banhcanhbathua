import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React, { Fragment, useState } from "react";
import firebase from "../../firebase/config";
import { addDocument, DelDocument } from "../../firebase/services";
import useFirestore from "./../../Hooks/useFirestore";

export default function BannerTable() {
  const menu = useFirestore("menu");
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
      addDocument("menu", {
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
    DelDocument("menu", form.getFieldValue("id"));
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
          <h1>QUẢN LÝ MENU THỰC ĐƠN CỦA QUÁN</h1>
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
              <th>Tên món</th>
              <th>Mô tả món</th>
              <th>Giá tiền</th>
              <th>Hình ảnh</th>
              <th>Ngày đăng</th>
            </tr>
            {menu.map(({ uid, photoURL, title, span, createdAt, price }) => (
              <tr key={uid}>
                <td>{uid}</td>
                <td>{title}</td>
                <td>{span}</td>
                <td>{price}</td>
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
          title="Thêm món cho quán"
          visible={modalVisible1}
          getContainer={false}
          onOk={handldeOk1}
          onCancel={handleCancel1}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nhập vào mã số món ăn: (Lưu ý không trùng với các mã số khác)"
              name="uid"
            >
              <Input placeholder="Nhập vào mã số món ăn..." />
            </Form.Item>
            <Form.Item label="Nhập vào tiêu đề món ăn:" name="title">
              <Input placeholder="Nhập vào tiêu đề món ăn..." />
            </Form.Item>
            <Form.Item label="Nhập vào phụ đề bài viết:" name="span">
              <Input placeholder="Nhập vào phụ đề bài viết..." />
            </Form.Item>
            <Form.Item label="Nhập vào giá tiền món ăn:" name="price">
              <Input.TextArea placeholder="Nhập vào giá tiền món ăn..." />
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
          title="Xoá món ăn"
          visible={modalVisible2}
          getContainer={false}
          onOk={handldeOk2}
          onCancel={handleCancel2}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nhập vào mã số món ăn cần xoá (nhập chính xác):"
              name="id"
            >
              <Input placeholder="Nhập vào mã số món ăn cần xoá..." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
}
