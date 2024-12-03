import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Navbar 재활용
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
    category: "", // 카테고리 인덱스를 저장
    sourceUrl: "",
    sourceBc: "", // 출처 인덱스를 저장
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
      const response = await fetch("/api/api/news/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory+1,
          sourceUrl: newsData.sourceUrl,
          sourceBc: selectedBroadcaster+1,
        }),
      });
      console.log(JSON.stringify({
        category: selectedCategory+1,
        sourceUrl: newsData.sourceUrl,
        sourceBc: selectedBroadcaster+1,
      }));

      if (response.ok) {
        const savedData = await response.json();
        console.log("저장된 데이터:", savedData);
        // SavedNews로 뉴스 객체를 전달
        navigate("/saved-news", { state: savedData });
        
      } else {
        throw new Error("저장 실패");
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

      {/* 출처 방송국 선택 */}
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
