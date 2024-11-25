import React, { useEffect, useState, useRef } from "react";
import videoListService from "../service/videoListService.js";

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
        // 영화 상세정보 가져오기
        const details = await videoListService.fetchMovieDetails(movieId);
        setMovieDetails(details);
        setBackgroundImage(`https://image.tmdb.org/t/p/original${details.backdrop_path}`);

        // 영화 비디오 가져오기
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
    <div
      className="video-container"
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        backgroundImage: isPlaying ? "none" : `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: "1",
          }}
        />
      )}
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            top: "32%",
            left: "8%",
            color: "#fff",
            zIndex: "2",
            maxWidth: "25%",
          }}
        >
          <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
            {movieDetails.title}
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
            {movieDetails.overview}
          </p>
        </div>
      )}
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "2",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            color: "#000",
            fontSize: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          재생
        </button>
      ) : (
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&enablejsapi=1`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default ShowVideo;
