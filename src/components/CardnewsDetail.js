import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Loading from "./Loading"; // 로딩 컴포넌트
import { mockData } from "../mockData";
import "../App.css";
import DEFAULT_IMG from "../img/default400.png";

const CardnewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true); // 로딩 시작
        const response = await fetch(`/api/api/cardnews/news_id?newsId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data);
        setCurrentIndex(0); // 데이터 로드 후 슬라이드 첫 번째로 초기화
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchNews();
  }, [id]);

  const slidesLength = Math.max(
    news?.cardsPath?.length || 0,
    news?.summarySentences?.length || 0
  );

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slidesLength) % slidesLength);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slidesLength);
  };

  return (
    <div>
      <Navbar>
        <button onClick={() => navigate("/")}>전체 목록 보기</button>
      </Navbar>
      {loading ? (
        <Loading /> // 로딩 중일 때 표시
      ) : error ? (
        <p>Error: {error}</p>
      ) : news ? (
        <div className="news-detail">
          <div className="content">
            <h2 style={{color: "#789DBC"}}>#{mockData.categories[news.category - 1]}</h2><br/>
            <h2>{news.title}</h2><br/>
            <p style={{ marginLeft: "auto", fontSize: "15px"}}>
              등록 일자: {(news.newsAt &&
                  `${news.newsAt[0]}/${news.newsAt[1]}/${news.newsAt[2]}`) ||
                (news.createdAt &&
                  `${news.createdAt[0]}/${news.createdAt[1]}/${news.createdAt[2]}`) ||
                "날짜 정보 없음"}
            </p>
            {/* Slider */}
            <div className="slider-container">
              {currentIndex > 0 && (
                <button className="slider-btn left" onClick={prevSlide}>
                  {"<"}
                </button>
              )}
              <div className="slider-card">
                <img
                  className="slider-image"
                  src={
                    news.cardsPath && news.cardsPath.length>=2
                      ? news.cardsPath[currentIndex%news.cardsPath.length]
                      : DEFAULT_IMG
                  }
                  alt={`slide-${currentIndex}`}
                />
                <p className="slider-text">
                  {news.summarySentences &&
                  currentIndex < news.summarySentences.length
                    ? news.summarySentences[currentIndex]
                    : "문장 없음"}
                </p>
              </div>
              {currentIndex < slidesLength - 1 && (
                <button className="slider-btn right" onClick={nextSlide}>
                  {">"}
                </button>
              )}
            </div>
            <br/>
            <p style={{fontSize: "17px"}}>
              출처: {mockData.source_bc[news.sourceBc - 1] || "출처 정보 없음"}
            </p>
            <a
              href={news.sourceUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{color: "black", textDecoration: "none"}}
            >
              🔗{news.sourceUrl ? "원본 영상 보기" : "원본 영상 링크 없음"}
            </a>
          </div>
          <div className="bottom-btn-container">
            <button className="bottom-btn" onClick={() => navigate("/")}>
              돌아가기
            </button>
          </div>
        </div>
      ) : (
        <p>News not found!</p>
      )}
    </div>
  );
};

export default CardnewsDetail;
