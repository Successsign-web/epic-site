const API_CONFIG = {
  BASE_URL: "https://api.wedplanners.in/api/v1",
  IMAGE_BASE_URL:
    import.meta.env.VITE_IMAGE_BASE_URL ||
    "https://epic-backend-o4ze.onrender.com/",
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
};

export default API_CONFIG;
