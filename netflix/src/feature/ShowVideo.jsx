import React, { useEffect, useState, useRef } from 'react';
import videoListService from '../service/videoListService.js';

const ShowVideo = ({ movieId, backgroundImage }) => {
  const [videoKey, setVideoKey] = useState(null); // YouTube 비디오 키
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const iframeRef = useRef(null); // iframe DOM reference
  const pauseTimer = useRef(null); // Pause 타이머

  useEffect(() => {
    // YouTube Iframe API 로드
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onload = () => {
          console.log('YouTube Iframe API loaded.');
        };
        document.body.appendChild(tag);
      }
    };

    loadYouTubeAPI();

    const fetchVideos = async () => {
      try {
        const videos = await videoListService.fetchMovieVideos(movieId);
        const youtubeVideo = videos.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        ); // YouTube 트레일러 찾기
        if (youtubeVideo) {
          setVideoKey(youtubeVideo.key);
        } else {
          setError('No YouTube trailer available for this movie.');
        }
      } catch (err) {
        setError('Failed to fetch video data.');
      }
    };

    fetchVideos();
  }, [movieId]);

  const handlePlay = () => {
    setIsPlaying(true); // 재생 상태를 true로 변경
  };

  const handlePause = () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      setIsPlaying(false); // 원래 상태로 복구
    }, 5000); // 5초 후 복구
  };

  useEffect(() => {
    if (isPlaying && window.YT && videoKey) {
      const player = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PAUSED) {
              handlePause(); // Pause 상태 처리
            } else if (event.data === window.YT.PlayerState.PLAYING) {
              clearTimeout(pauseTimer.current); // Pause 타이머 초기화
            }
          },
        },
      });
      return () => player.destroy(); // 컴포넌트가 언마운트될 때 정리
    }
  }, [isPlaying, videoKey]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!videoKey) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="video-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        backgroundImage: isPlaying ? 'none' : `url(${backgroundImage})`, // 배경 이미지
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            fontSize: '20px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          재생
        </button>
      ) : (
        <iframe
          ref={iframeRef} // iframe reference 추가
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
