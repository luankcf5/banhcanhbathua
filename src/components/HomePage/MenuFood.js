import React from "react";
import useFirestore from "./../../Hooks/useFirestore";

export default function MenuFood() {
  const menu = useFirestore("menu");
  return (
    <div>
      <div className="content-title">
        <h1>DANH SÁCH THỰC ĐƠN CỦA QUÁN</h1>
      </div>
      <div className="menu">
        {menu.map(({ uid, title, span, price, photoURL }) => (
          <div key={uid}>
            <div className="menu-item">
              <img src={photoURL} alt="" />
              <p>{title}</p>
              <span>{span}</span>
              <p className="text-decor">{price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
