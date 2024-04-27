import api from "@/services/api";
import { IApiResponse } from "@/interfaces/api";
import { IStudent } from "@/interfaces/student";

interface IStudentFilters {
  name?: string;
  order?: string;
  sort?: string;
}

export async function list(params: IStudentFilters) {
  const { data } = await api.get<IApiResponse<IStudent[]>>("/students", {
    params,
  });

  return data.payload;
}

export async function create(formData: Omit<IStudent, "id">) {
  const { data } = await api.post<IApiResponse<IStudent>>("/students", formData);

  return data.payload;
}

export async function remove(id: number) {
  const { data } = await api.delete<IApiResponse<IStudent>>(`/students/${id}`);

  return data.isSuccess;
}

export async function get(id: number) {
  const { data } = await api.get<IApiResponse<IStudent>>(`/students/${id}`);

  return data.payload;
}

export async function update(id: number, formData: Omit<IStudent, "id">) {
  const { data } = await api.put<IApiResponse<IStudent>>(`/students/${id}`, formData);

  return data.payload;
}

export default {
  list,
  create,
  remove,
  get,
  update,
};
