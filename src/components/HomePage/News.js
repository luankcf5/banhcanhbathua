import React from "react";
import useFirestore from "./../../Hooks/useFirestore";
import moment from "moment";

export default function News() {
  const news = useFirestore("news");
  return (
    <div>
      <div className="content-title">
        <h1>BẢNG TIN TỨC TỪ CỬA HÀNG</h1>
      </div>
      <div>
        <div className="new">
          {news.map(({ uid, photoURL, title, createdAt, content }) => (
            <div className="new-item" key={uid}>
              <div className="new-item-content">
                <img src={photoURL} alt="" />
              </div>
              <div>
                <p>{title}</p>
                <span>{moment.unix(createdAt).format("DD/MM HH:MM")}</span>
                <p>{content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
