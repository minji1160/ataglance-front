import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

const SavedNews = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const news = location.state;

  if (!news) {
    return <p>저장된 뉴스 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <Navbar>
        <button onClick={() => navigate("/")}>전체 목록 보기</button>
      </Navbar>
      <div className="saved-news-container">
        <h2 className="page-title">저장된 뉴스</h2>
        <div className="saved-news-section">
          <h3>등록된 내용</h3>
          <p>
            <strong>뉴스 링크:</strong> <a href={news.source_url}>{news.source_url}</a>
          </p>
          <p>
            <strong>카테고리:</strong> {news.category}
          </p>
          <p>
            <strong>출처 방송국:</strong> {news.source_bc}
          </p>
        </div>
        <div className="bottom-btn-container">
          <button className="bottom-btn" onClick={() => navigate("/")} >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedNews;
