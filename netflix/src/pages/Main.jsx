import React from 'react';
import ShowVideo from '../feature/ShowVideo.jsx';

function Main() {

  const movieId = 912649; // Venom: The Last Dance의 TMDB 영화 ID
  return (
    <div>
      <ShowVideo movieId={movieId} />
    </div>
  );
}

export default Main;