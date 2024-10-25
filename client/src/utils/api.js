import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8008",
});

export const generateResume = (formData) => {
  return api.post("/resume/generate-resume", formData);
};
