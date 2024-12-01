import React, { useState,  useEffect } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import "../App.css";

const CardnewsList = () => {
  const [cardnewsList, setCardnewsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cardnews/all", {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
          mode: 'cors', // Cross-Origin 요청 허용
        }); // Proxy 설정 적용
        console.log(response)
        if (!response.ok) throw new Error("Failed to fetch news data");
        const data = await response.json();
        console.log(data);
        setCardnewsList(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);
  const toggleCategory = (categoryIndex) => {
    // 이미 선택된 카테고리를 클릭하면 전체 리스트로 전환
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryIndex ? null : categoryIndex
    );
  };

  const filteredNews = selectedCategory
    ? cardnewsList.filter((news) => news.category === selectedCategory)
    : cardnewsList;

  return (
    <div>
      <Navbar
         categories={["경제", "사회", "생활", "IT"]}
         selectedCategory={selectedCategory}
         onCategoryClick={toggleCategory}
      />
      <div className="news-grid">
      { filteredNews.map((news) => <Card key={news.newsId} news={news} />) }
      </div>
    </div>
  );
};

export default CardnewsList;
