import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Navbar 재활용
import "../App.css";

const categories = ["경제", "사회", "IT", "생활"];
const source_bc = ["MBC", "SBS", "KBS"];

const AdminPage = () => {
  const [newsLink, setNewsLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBroadcaster, setSelectedBroadcaster] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!newsLink || !selectedCategory || !selectedBroadcaster) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    // 뉴스 객체 생성
    const news = {
      source_url: newsLink,
      category: selectedCategory,
      source_bc: selectedBroadcaster,
    };

    // POST 요청 (경로는 추후 설정 가능)
    console.log("POST 데이터:", news);

    // 저장 후 화면 이동
    navigate("/saved-news", { state: news }); // state로 저장된 내용 전달
  };

  return (
    <div>
      <Navbar>
        <button onClick={() => navigate("/")}>전체 목록 보기</button>
      </Navbar>
      <div className="admin-page-container">
        <h2 className="page-title">뉴스 등록</h2>
        <div className="form-section">
          <label htmlFor="news-link" className="form-label">뉴스 링크</label>
          <input
            type="text"
            id="news-link"
            className="form-input"
            value={newsLink}
            onChange={(e) => setNewsLink(e.target.value)}
            placeholder="뉴스 링크를 입력하세요"
          />
        </div>

        <div className="form-section">
          <p className="form-label">카테고리</p>
          <div className="form-options">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`option-button ${selectedCategory === category ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <p className="form-label">출처 방송국</p>
          <div className="form-options">
            {source_bc.map((source_bc, index) => (
              <button
                key={index}
                className={`option-button ${selectedBroadcaster === source_bc ? "selected" : ""}`}
                onClick={() => setSelectedBroadcaster(source_bc)}
              >
                {source_bc}
              </button>
            ))}
          </div>
        </div>

        <div className="bottom-btn-container">
          <button
            className="bottom-btn"
            onClick={handleSubmit}>
            저장
          </button>
        </div>
        </div>
    </div>
  );
};

export default AdminPage;
