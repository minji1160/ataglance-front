import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Navbar 컴포넌트를 추가로 활용
import { mockData } from "../mockData";
import "../App.css";

const DEFAULT_IMAGES = [
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/400",
];

const CardnewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // 슬라이더 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cardnews/news_id?newsId=${id}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
          mode: 'cors', // Cross-Origin 요청 허용
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!news) return <p>News not found!</p>;

  // 이전 이미지로 이동
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (news.cardsPath?.length || DEFAULT_IMAGES.length)) % (news.cardsPath?.length || DEFAULT_IMAGES.length));
  };

  // 다음 이미지로 이동
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (news.cardsPath?.length || DEFAULT_IMAGES.length));
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
          {/* 제목 */}
          <h2>{news.title}</h2>
          {/* 게시 날짜 */}
          <br />
          <p style={{ marginLeft: "auto" }}>
            {news.newsAt || (news.createdAt && `${news.createdAt[0]}-${news.createdAt[1]}-${news.createdAt[2]}`) || "날짜 정보 없음"}
          </p>

          {/* 이미지 슬라이더 */}
          <div className="slider-container">
            <button className="slider-btn left" onClick={prevSlide}>
              {"<"}
            </button>
            <img
              className="slider-image"
              src={news.cardsPath && news.cardsPath.length > 0 ? news.cardsPath[currentIndex] : DEFAULT_IMAGES[currentIndex]}
              alt={`slide-${currentIndex}`}
            />
            <button className="slider-btn right" onClick={nextSlide}>
              {">"}
            </button>
          </div>

           {/* 요약 문장 */}
           <div className="summary-section">
            <ul>
              {news.summarySentences && news.summarySentences.length > 0 ? (
                news.summarySentences.map((sentence, index) => (
                  <li key={index}>{sentence}</li>
                ))
              ) : (
                <li>요약 문장이 없습니다.</li>
              )}
            </ul>
          </div>

          <br/>
          {/* 출처 및 원본 영상 링크 */}
          <p>출처: {mockData.source_bc[news.sourceBc - 1] || "출처 정보 없음"}</p>
          <a href={news.sourceUrl || "#"} target="_blank" rel="noopener noreferrer">
            {news.sourceUrl ? "원본 영상 보기" : "원본 영상 링크 없음"}
          </a>
        </div>
        {/* 전체 목록으로 돌아가는 버튼 */}
        <div className="bottom-btn-container">
          <button className="bottom-btn" onClick={() => navigate("/")}>
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardnewsDetail;
