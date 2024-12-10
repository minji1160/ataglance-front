import React, { useState,  useEffect } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import Loading from "./Loading";
import "../App.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://dafadynssf.execute-api.us-east-1.amazonaws.com/ataglance-stage";

const CardnewsList = () => {
  const [cardnewsList, setCardnewsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/api/cardnews/all", {
          method: 'GET',
          mode: "cors",
          cache: "no-cache",
        }); // Proxy 설정 적용
        console.log(response)
        // if (!response.ok) throw new Error("Failed to fetch news data");
        const data = await response.json();
        console.log(data);
        setCardnewsList(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
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
         categories={["경제", "사회", "생활", "IT/과학"]}
         selectedCategory={selectedCategory}
         onCategoryClick={toggleCategory}
      />
      {loading ? ( // 로딩 중일 때
        <Loading /> // Loading 컴포넌트 렌더링
      ) : (
        <div className="news-grid">
          {filteredNews.map((news) => (
            <Card key={news.newsId} news={news} />
          ))}
        </div>
    )}
    </div>
  );
};

export default CardnewsList;