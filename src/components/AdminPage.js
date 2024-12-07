import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { mockData } from "../mockData";
import "../App.css";

const OptionSelector = ({ label, options, selectedOption, setSelectedOption }) => (
  <div className="form-section">
    <p className="form-label">{label}</p>
    <div className="form-options">
      {options.map((option, index) => (
        <button
          key={index}
          className={`option-button ${selectedOption === index ? "selected" : ""}`}
          onClick={() => setSelectedOption(index)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const AdminPage = () => {
  const [newsData, setNewsData] = useState({
    category: "",
    sourceUrl: "",
    sourceBc: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBroadcaster, setSelectedBroadcaster] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData({
      ...newsData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {

    try {
      const payload = {
        category: selectedCategory + 1, // 선택된 카테고리 (1부터 시작)
        sourceUrl: newsData.sourceUrl.trim(),
        sourceBc: selectedBroadcaster + 1, // 방송국
      };
  
      const response = await fetch("/api/api/news/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      console.log("Payload:", payload);
      if (response.ok) {
        const savedData = await response.json();
        console.log("저장된 데이터:", savedData);
        navigate("/saved-news", { state: savedData });
      } else {
        const errorData = await response.text();
        throw new Error(`서버 오류: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  return (
    <div>
      <Navbar>
      </Navbar>
      <div className="admin-page-container">
        <h2 className="page-title">뉴스 등록</h2>
        <div className="form-section">
          <label htmlFor="news-link" className="form-label">뉴스 링크</label>
          <input
            type="text"
            name="sourceUrl"
            className="form-input"
            value={newsData.sourceUrl}
            onChange={handleInputChange}
          />
        </div>

        <OptionSelector
        label="카테고리"
        options={mockData.categories}
        selectedOption={selectedCategory}
        setSelectedOption={setSelectedCategory}
      />

      <OptionSelector
        label="출처 방송국"
        options={mockData.source_bc}
        selectedOption={selectedBroadcaster}
        setSelectedOption={setSelectedBroadcaster}
      />

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
