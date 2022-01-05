import { createContext, useReducer, useState } from "react";
import GithubReducers from "./GithubReducers";

export const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    languages: [],
    langStats: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducers, initialState);

  // const searchUsers = async (text) => {
  //   const params = new URLSearchParams({
  //     q: text,
  //   });
  //   setLoading(true);
  //   const response = await fetch(
  //     `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`,
  //     {
  //       headers: {
  //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //       },
  //     }
  //   );
  //   const { items } = await response.json();
  //   dispatch({
  //     type: "GET_USERS",
  //     payload: items,
  //   });
  // };
  // const getUserRepos = async (login) => {
  //   const params = new URLSearchParams({
  //     sort: "created",
  //     per_page: 10,
  //   });
  //   setLoading(true);
  //   const response = await fetch(
  //     `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`,
  //     {
  //       headers: {
  //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch({
  //     type: "GET_REPOS",
  //     payload: data,
  //   });
  // };

  // const getUser = async (login) => {
  //   setLoading(true);
  //   const response = await fetch(
  //     `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
  //     {
  //       headers: {
  //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //       },
  //     }
  //   );
  //   if (response.status === 404) {
  //     window.location = "/notfound";
  //   } else {
  //     const data = await response.json();
  //     dispatch({
  //       type: "GET_USER",
  //       payload: data,
  //     });
  //   }
  // };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
