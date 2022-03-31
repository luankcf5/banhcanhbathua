import React from "react";
import useFirestore from "./../../Hooks/useFirestore";

export default function Banner() {
  const banner = useFirestore("banner");
  return (
    <div>
      <div className="content-title">
        <h1>Bánh canh BÀ THỪA_ TÈO ANH _ BÁNH CANH CÁ THU GIA TRUYỀN</h1>
      </div>

      <div className="layout-content" style={{ padding: 24, minHeight: 360 }}>
        {banner.map(({ id, photoURL, title, span, content }) => (
          <div className="banner" key={id}>
            <div className="banner-img">
              <img src={photoURL} alt="" />
            </div>
            <div className="banner-content">
              <h1>{title}</h1>
              <span>{span}</span>
              <p>{content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
