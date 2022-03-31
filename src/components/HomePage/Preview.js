import React from "react";
import useFirestore from "./../../Hooks/useFirestore";
import moment from "moment";

export default function Preview() {
  const preview = useFirestore("preview");
  return (
    <div>
      <div className="content-title">
        <h1>ĐÁNH GIÁ TỪ KHÁCH HÀNG TRẢI NGHIỆM</h1>
      </div>
      <div className="preview">
        {preview.map(({ uid, name, createdAt, content }) => (
          <div className="preview-item" key={uid}>
            <div className="preview-item-content">
              <div>
                <span className="fa fa-star preview-star"></span>
                <span className="fa fa-star preview-star"></span>
                <span className="fa fa-star preview-star"></span>
                <span className="fa fa-star preview-star"></span>
                <span className="fa fa-star preview-star"></span>
              </div>
            </div>
            <div>
              <p>Khách hàng: {name}</p>
              <span>
                Ngày ghé: {moment.unix(createdAt).format("DD/MM HH:MM")}
              </span>
              <p>Nhận xét: {content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
