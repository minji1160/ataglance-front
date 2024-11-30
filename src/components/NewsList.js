import React, { useState } from "react";
import { mockData } from "../mockData";
import Card from "./Card";
import Navbar from "./Navbar";
import "../App.css";

const NewsList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleCategory = (categoryIndex) => {
    // 이미 선택된 카테고리를 클릭하면 전체 리스트로 전환
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryIndex ? null : categoryIndex
    );
  };

  const filteredNews = selectedCategory
    ? mockData.newsList.filter((news) => news.category === selectedCategory)
    : mockData.newsList;

  return (
    <div>
      <Navbar
        categories={mockData.categories}
        selectedCategory={selectedCategory}
        onCategoryClick={toggleCategory}
      />
      <div className="news-grid">
        {filteredNews.map((news) => (
          <Card key={news.news_id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
