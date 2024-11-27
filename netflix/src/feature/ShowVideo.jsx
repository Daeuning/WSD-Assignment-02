import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import videoListService from "../service/videoListService.js";

const PlayButton = styled.button`
  background: var(--basic-font);
  color: var(--black-font);
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: var(--primary-color);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 8px 16px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  background-image: ${({ isPlaying, backgroundImage }) =>
    isPlaying ? "none" : `url(${backgroundImage})`};

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 480px) {
    height: 250px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 8%;
  color: var(--basic-font);
  z-index: 2;
  max-width: 40%;

  h1 {
    font-size: 36px;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      font-size: 28px;
    }

    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }

    @media screen and (max-width: 480px) {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 768px) {
    max-width: 60%;
    left: 5%;
    top: 25%;
  }

  @media screen and (max-width: 480px) {
    max-width: 70%;
    left: 5%;
    top: 20%;
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 500px;

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 480px) {
    height: 250px;
  }
`;

const ShowVideo = ({ movieId }) => {
  const [videoKey, setVideoKey] = useState(null); // YouTube 비디오 키
  const [backgroundImage, setBackgroundImage] = useState(null); // 배경 이미지
  const [movieDetails, setMovieDetails] = useState(null); // 영화 상세정보
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const iframeRef = useRef(null); // iframe DOM reference
  const pauseTimer = useRef(null); // Pause 타이머

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    };

    const fetchMovieData = async () => {
      try {
        const details = await videoListService.fetchMovieDetails(movieId);
        setMovieDetails(details);
        setBackgroundImage(`https://image.tmdb.org/t/p/original${details.backdrop_path}`);

        const videos = await videoListService.fetchMovieVideos(movieId);
        const youtubeVideo = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        if (youtubeVideo) {
          setVideoKey(youtubeVideo.key);
        } else {
          setError("No YouTube trailer available for this movie.");
        }
      } catch (err) {
        setError("Failed to fetch movie data.");
      }
    };

    loadYouTubeAPI();
    fetchMovieData();
  }, [movieId]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  useEffect(() => {
    if (isPlaying && window.YT && videoKey) {
      const player = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PAUSED) {
              handlePause();
            } else if (event.data === window.YT.PlayerState.PLAYING) {
              clearTimeout(pauseTimer.current);
            }
          },
        },
      });
      return () => player.destroy();
    }
  }, [isPlaying, videoKey]);

  if (error) return <p>{error}</p>;

  if (!videoKey || !backgroundImage || !movieDetails) return <p>Loading...</p>;

  return (
    <VideoContainer
      isPlaying={isPlaying}
      backgroundImage={backgroundImage}
    >
      {!isPlaying && <Overlay />}
      {!isPlaying && (
        <InfoContainer>
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          <PlayButton onClick={handlePlay}>
            <span style={{ fontSize: "18px" }}>▶</span>
            재생
          </PlayButton>
        </InfoContainer>
      )}
      {isPlaying && (
        <StyledIframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&enablejsapi=1`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></StyledIframe>
      )}
    </VideoContainer>
  );
};

export default ShowVideo;
