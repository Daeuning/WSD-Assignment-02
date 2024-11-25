import React, { useEffect, useState, useRef } from "react";
import videoListService from "../service/videoListService.js";

const ShowVideo = ({ movieId }) => {
  const [videoKey, setVideoKey] = useState(null); // YouTube 비디오 키
  const [backgroundImage, setBackgroundImage] = useState(null); // 배경 이미지 (가로형 사진)
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
        const movieDetails = await videoListService.fetchMovieDetails(movieId);
        setBackgroundImage(`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`); // 가로형 배경 이미지

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

  if (!videoKey || !backgroundImage) return <p>Loading...</p>;

  return (
    <div
      className="video-container"
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        backgroundImage: isPlaying ? "none" : `url(${backgroundImage})`, // 가로형 배경 이미지
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
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
