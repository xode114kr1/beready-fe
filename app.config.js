import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      BACKEND_LOCAL_URL: process.env.BACKEND_LOCAL_URL,
      FASTAPI_LOCAL_URL: process.env.FASTAPI_LOCAL_URL,
    },
  };
};
