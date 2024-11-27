import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MovieCard from "../component/MovieCard.jsx";
import TopButton from "../layout/TopButton.jsx";

const WishListContainer = styled.div`
  padding: 20px;
  max-width: 84%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }

  @media screen and (max-width: 480px) {
    padding: 10px;
    max-width: 95%;
  }
`;

const Banner = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  color: var(--basic-font);
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    padding: 10px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
    padding: 5px;
    margin-bottom: 10px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    padding: 15px;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
    padding: 10px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #777;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    margin-top: 30px;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
    margin-top: 20px;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px;
  font-size: 16px;
  color: #777;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;
const WishList = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  // 무한 스크롤 핸들러
  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading && currentPage * 10 < wishlist.length) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // 페이지에 따른 영화 데이터 업데이트
  useEffect(() => {
    setVisibleMovies(wishlist.slice(0, currentPage * 10));
  }, [wishlist, currentPage]);

  return (
    <WishListContainer>
      <Banner>내가 찜한 리스트</Banner>
      {visibleMovies.length === 0 ? (
        <EmptyMessage>찜한 영화가 없습니다.</EmptyMessage>
      ) : (
        <GridContainer>
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          <div ref={observerRef}></div>
        </GridContainer>
      )}
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      <TopButton />
    </WishListContainer>
  );
};

export default WishList;
