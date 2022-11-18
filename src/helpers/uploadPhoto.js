import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function uploadPhoto(files) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    `${BASE_URL}/api/products/user/upload_photos`,
    formData,
    config
  );
  return response.data.result;
}
export async function UploadUserAvatar(file) {
  const formData = new FormData();
  formData.append("images", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    `${BASE_URL}/api/products/user/upload_photos`,
    formData,
    config
  );

  return response.data.result;
}
