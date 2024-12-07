import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import DEFAULT_IMG from "../img/default150.png";

const Card = ({ news }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { newsId, title, thumbnail, newsAt, createdAt } = news; // 나중에 날짜 바꾸기
  const imageUrl = thumbnail===null ? DEFAULT_IMG : thumbnail;

  const displayDate =
  (newsAt && `${newsAt[0]}-${newsAt[1]}-${newsAt[2]}`)|| (createdAt && `${createdAt[0]}-${createdAt[1]}-${createdAt[2]}`) || "날짜 정보 없음";


  const handleCardClick = () => {
    navigate(`/detail/${newsId}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img className = "card img" src={imageUrl} alt="thumbnail" />
      <h4 className="ellipsis">{title}</h4>
      <p className="card-date">{displayDate}</p>
    </div>
  );
};

export default Card;
