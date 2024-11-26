import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MovieCard from "../component/MovieCard.jsx";

const WishListContainer = styled.div`
  padding: 20px;
  max-width: 84%;
  margin: 0 auto;
`;

const Banner = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  color: var(--basic-font);
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #777;
  margin-top: 40px;
`;

const WishList = () => {
  // Redux 상태 구독
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <WishListContainer>
      <Banner>내가 찜한 리스트</Banner>
      {wishlist.length === 0 ? (
        <EmptyMessage>찜한 영화가 없습니다.</EmptyMessage>
      ) : (
        <GridContainer>
          {wishlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </GridContainer>
      )}
    </WishListContainer>
  );
};

export default WishList;
