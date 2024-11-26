import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import movieListService from "../service/movieListService.js";

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

const HeartButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 5;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  & > svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => (props.isLiked ? "var(--primary-color)" : "var(--white-24dp)")};
    stroke-width: 1px;
    transition: fill 0.3s ease, stroke 0.3s ease;
  }

  &:hover > svg {
    fill: ${(props) => (props.isLiked ? "var(--primary-color)" : "rgba(220, 37, 31, 0.3)")};
  }
`;

const MovieCard = ({ movie }) => {
  const [genreNames, setGenreNames] = useState([]);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const isLiked = wishlist.some((item) => item.id === movie.id);

  const toggleLike = () => {
    dispatch(toggleWishlist(movie));
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreMapping = await movieListService.fetchGenreMapping();
        const mappedGenres = movie.genre_ids.map((id) => genreMapping[id] || "Unknown");
        setGenreNames(mappedGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [movie.genre_ids]);

  return (
    <MovieCardContainer
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
      }}
    >
      <HeartButton isLiked={isLiked} onClick={toggleLike}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </HeartButton>
      <Overlay>
        <InfoText>{movie.title}</InfoText>
        <InfoText>평점: {movie.vote_average}</InfoText>
        <InfoText>개봉일: {movie.release_date}</InfoText>
        <InfoText>장르: {genreNames.join(", ") || "정보 없음"}</InfoText>
      </Overlay>
    </MovieCardContainer>
  );
};

export default MovieCard;
