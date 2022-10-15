import request from "@/utils/request";
import { id } from "element-plus/es/locale";
export const reqLogin = (data: {}) => {
  return request({
    url: "/login",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

export const reqArticleList = () =>
  request({
    url: "/articleList",
    method: "get",
  });

export const reqAddArticle = (data: {}) => {
  return request<{ code: number; message: string }>({
    url: "/addArticle",
    method: "post",
    data: data,
  });
};

export const reqCategory = () =>
  request({
    url: "/getCategory",
    method: "get",
  });
export const reqDeleteCategory = (id: number) =>
  request({
    url: "/deleteCategoryById",
    method: "get",
    params: {
      id: id,
    },
  });
export const reqAddCategory = (
  data: Array<{
    title: string;
    id?: number;
    isDeleted?: number;
  }>
) =>
  request({
    url: "/addCategory",
    data,
    method: "post",
  });
