import React from "react";
import styled from "styled-components";

const MovieCardContainer = styled.div`
  flex: 0 0 auto;
  width: 200px;
  height: 300px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  }

  &:hover > div {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white-01dp);
  backdrop-filter: blur(10px);
  border: 1px solid var(--white-03dp);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const InfoText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  margin: 5px 0;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
`;

const MovieCard = ({ movie }) => {
  return (
    <MovieCardContainer
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
      }}
    >
      <Overlay>
        <InfoText>{movie.title}</InfoText>
        <InfoText>평점: {movie.vote_average}</InfoText>
        <InfoText>개봉일: {movie.release_date}</InfoText>
        <InfoText>장르: {movie.genre_names?.join(", ") || "정보 없음"}</InfoText>
      </Overlay>
    </MovieCardContainer>
  );
};

export default MovieCard;
