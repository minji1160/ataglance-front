import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import DEFAULT_IMG from "../img/default150.png";

const extractPublicUrl = (cardsPath) => {
  try {
    const parsedData = JSON.parse(cardsPath);
    const s3Path = parsedData.thumbnail_path;

    // S3 URL을 퍼블릭 액세스 URL로 변환
    if (s3Path && s3Path.startsWith("s3://")) {
      const publicUrl = s3Path.replace(
        "s3://ataglance-bucket",
        "https://ataglance-bucket.s3.amazonaws.com"
      );
      return publicUrl;
    }
  } catch (error) {
    console.error("Error parsing thumbnail_path:", error);
  }

  // thumbnail_path가 없거나 유효하지 않으면 기본 이미지 반환
  return DEFAULT_IMG;
};

const ThumbnailImage = ({ cardsPath }) => {
  const imageUrl = extractPublicUrl(cardsPath);

  return (
    <img
      className="card img"
      src={imageUrl}
      alt="thumbnail"
    />
  );
};

const Card = ({ news }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { newsId, title, cardsPath, newsAt, createdAt } = news; // 나중에 날짜 바꾸기

  const displayDate =
  (newsAt && `${newsAt[0]}-${newsAt[1]}-${newsAt[2]}`)|| (createdAt && `${createdAt[0]}-${createdAt[1]}-${createdAt[2]}`) || "날짜 정보 없음";


  const handleCardClick = () => {
    navigate(`/detail/${newsId}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <ThumbnailImage cardsPath={cardsPath} />
      <h4 className="ellipsis">{title}</h4>
      <p className="card-date">{displayDate}</p>
    </div>
  );
};

export default Card;
