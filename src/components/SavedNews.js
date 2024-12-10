import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { mockData } from "../mockData";
import "../App.css";

const SavedNews = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const news = location.state;

  if (!news) {
    return (
      <div className="saved-news-container">
        <Navbar>
          <button className="back-btn" onClick={() => navigate("/")}>
            전체 목록 보기
          </button>
        </Navbar>
        <div className="no-data">
          <h2>저장된 뉴스 데이터가 없습니다.</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar>
        <button className="back-btn" onClick={() => navigate("/")}>
          전체 목록 보기
        </button>
      </Navbar>
      <div className="saved-news-container">
        <h2 className="page-title">저장 완료!</h2>
        <div className="saved-news-card">
          <h3>등록된 내용</h3>
          <div className="news-detail">
            <p>
              <strong>뉴스 제목:</strong> {news.title}
            </p>
            <p>
              <strong>뉴스 링크:</strong>{" "}
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                {news.sourceUrl}
              </a>
            </p>
            <p>
              <strong>카테고리:</strong> {mockData.categories[news.category - 1]}
            </p>
            <p>
              <strong>출처 방송국:</strong>{" "}
              {mockData.source_bc[news.sourceBc - 1]}
            </p>
            <p>
              <strong>등록 날짜:</strong>{" "}
              {news.newsAt &&
                `${news.newsAt[0]}-${news.newsAt[1]}-${news.newsAt[2]}`}
            </p>
          </div>
        </div>
        <div className="bottom-btn-container">
          <button className="save-button" onClick={() => navigate("/admin")}>
            추가
          </button>
          <button className="back-button" onClick={() => navigate("/")}>
            메인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedNews;
