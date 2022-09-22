import request from "@/utils/request";

export const reqLogin = (data: {}) =>
  request({
    url: "/login",
    method: "post",
    data,
  });

export const reqArticleList = () =>
  request({
    url: "",
    method: "get",
  });

export const reqAddArticle = (data: {}) => {
  return request<{ code: number; message: string }>({
    url: "/addArticle",
    method: "post",
    data: data,
  });
};
