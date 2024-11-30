import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockData } from "../mockData";
import Navbar from "./Navbar"; // Navbar 컴포넌트를 추가로 활용
import "../App.css";

const DEFAULT_IMAGES = [
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/400",
];

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = mockData.newsList.find((n) => n.news_id === parseInt(id));
  const [currentIndex, setCurrentIndex] = useState(0); // 슬라이더 상태 관리

  if (!news) return <p>News not found!</p>;

  // 이전 이미지로 이동
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + DEFAULT_IMAGES.length) % DEFAULT_IMAGES.length);
  };

  // 다음 이미지로 이동
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % DEFAULT_IMAGES.length);
  };

  return (
    <div>
      <Navbar>
        <button onClick={() => navigate("/")}>전체 목록 보기</button>
      </Navbar>
      <div className="news-detail">
      <div className="content">
        {/* 카테고리 */}
        <h3>#{mockData.categories[news.category - 1]}</h3>
        <br></br>
        {/* 제목 */}
        <h2>{news.title}</h2>
        {/* 게시 날짜 */}
        <br></br>
        <p style={{marginLeft: "auto"}}>{news.news_at}</p>

        {/* 이미지 슬라이더 */}
        <div className="slider-container">
          <button className="slider-btn left" onClick={prevSlide}>
            {"<"}
          </button>
          <img className="slider-image" src={DEFAULT_IMAGES[currentIndex]} alt={`slide-${currentIndex}`} />
          <button className="slider-btn right" onClick={nextSlide}>
            {">"}
          </button>
        </div>

        {/* 출처 및 원본 영상 링크 */}
        <p>출처: {mockData.source_bc[news.source_bc - 1]}</p>
        <a href={news.source_url} target="_blank" rel="noopener noreferrer">
          원본 영상 보기
        </a>
      </div>
      {/* 전체 목록으로 돌아가는 버튼 */}
      <div className="bottom-btn-container">
          <button
            className="bottom-btn"
            onClick={() => navigate("/")}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
