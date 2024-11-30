import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const DEFAULT_IMG = "https://via.placeholder.com/150";

const Card = ({ news }) => {
  const navigate = useNavigate();
  const { news_id, title, img_path, news_at } = news;

  return (
    <div className="card" onClick={() => navigate(`/detail/${news_id}`)}>
      <img src={img_path || DEFAULT_IMG} alt="thumbnail" />
      <h4 className="ellipsis">{title}</h4>
      <p>{news_at}</p>
    </div>
  );
};

export default Card;
