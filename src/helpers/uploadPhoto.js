import axios from "axios";
const BASE_URL = "https://realsoft-e-commerce.herokuapp.com";

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
  console.log(response.data.result);
  return response.data.result;
}
