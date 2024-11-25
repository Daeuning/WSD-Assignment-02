import React, { useEffect, useState } from 'react';
import videoListService from '../service/videoListService.js';

const ShowVideo = ({ movieId }) => {
  const [videoKey, setVideoKey] = useState(null); // YouTube 비디오 키
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await videoListService.fetchMovieVideos(movieId);
        const youtubeVideo = videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer'); // YouTube 트레일러 찾기
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!videoKey) {
    return <p>Loading...</p>;
  }

  return (
    <div className="video-container">
      <iframe
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ShowVideo;
