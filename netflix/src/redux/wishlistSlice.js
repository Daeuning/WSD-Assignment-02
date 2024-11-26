import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("movieWishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const movie = action.payload;
      const index = state.wishlist.findIndex((item) => item.id === movie.id);

      if (index === -1) {
        // 영화가 위시리스트에 없으면 추가
        state.wishlist.push(movie);
      } else {
        // 영화가 이미 위시리스트에 있으면 제거
        state.wishlist = state.wishlist.filter((item) => item.id !== movie.id);
      }

      // 로컬 스토리지 업데이트
      localStorage.setItem("movieWishlist", JSON.stringify(state.wishlist));
    },
    initializeWishlist(state) {
      state.wishlist = JSON.parse(localStorage.getItem("movieWishlist")) || [];
    },
  },
});

export const { toggleWishlist, initializeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
