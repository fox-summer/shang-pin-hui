import { v4 as uuidv4 } from "uuid";
export const getUUID = () => {
  const uuid_token = localStorage.getItem("uuid_token");
  if (!uuid_token) {
    localStorage.setItem("uuid_token", uuidv4());
  }
  return uuid_token;
};
