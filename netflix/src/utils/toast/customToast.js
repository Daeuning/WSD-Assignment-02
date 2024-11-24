import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Toast 메시지 생성 함수
 * @param {string} type - Toast 타입 ("success", "error", "info", "warning")
 * @param {string} message - 표시할 메시지
 * @param {object} options - 추가 옵션 (선택 사항)
 */
export const showToast = (type, message, options = {}) => {
  const baseOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options, // 사용자 지정 옵션 병합
  };

  switch (type) {
    case "success":
      toast.success(message, baseOptions);
      break;
    case "error":
      toast.error(message, baseOptions);
      break;
    case "info":
      toast.info(message, baseOptions);
      break;
    case "warning":
      toast.warning(message, baseOptions);
      break;
    default:
      toast(message, baseOptions);
  }
};

/**
 * 커스텀 ToastContainer 컴포넌트
 */
export const CustomToastContainer = () => (
  <ToastContainer
    toastStyle={{
      backgroundColor: "#2c2c2c",
      color: "var(--basic-font)",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    }}
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    draggable
  />
);
