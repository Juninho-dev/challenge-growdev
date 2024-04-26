import api from "@/services/api";
import { IApiResponse } from "@/interfaces/api";

interface IRegister {
  name: string;
  email: string;
  password: string;
}

interface ILoginUser {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export const register = async (userData: IRegister) => {
  const { data } = await api.post("/register", userData);

  return data;
};

export const login = async (userData: Omit<IRegister, "name">) => {
  const { data } = await api.post<IApiResponse<ILoginUser>>("/login", userData);

  if (data && data.isSuccess) {
    localStorage.setItem("token", data.payload.token);
    localStorage.setItem("user", JSON.stringify(data.payload.user));
  }

  return data;
};

export const authUser = async () => {
  if (localStorage.getItem("token") !== null) {
    if (await testTokenValid()) {
      return true;
    }
  }

  localStorage.setItem("user", "");
  localStorage.setItem("token", "");

  return false;
};

export const testTokenValid = async () => {
  const { data } = await api.get<IApiResponse<any>>("auth");

  return !(data && !data.isSuccess);
};
