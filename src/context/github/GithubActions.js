import { data } from "autoprefixer";
import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// export const getUser = async (login) => {
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
//     return data;
//   }
// };

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);
  console.log(repos);
  return { user: user.data, repos: repos.data };
};

export const getUserStats = async (login) => {
  const { data } = await github.get(`/users/${login}/repos?per_page=1000`);
  console.log(data);
  const result = data
    .map((lang) => lang.language)
    .filter((lang) => lang != "null" && lang);
  console.log(result);
  let final = {};
  let secondFreq = "";
  function findMostFrequest(arr) {
    let compare = "";
    let mostFreq = "";

    arr.reduce((acc, val) => {
      if (val in acc) {
        // if key already exists
        acc[val]++; // then increment it by 1
      } else {
        acc[val] = 1; // or else create a key with value 1
      }
      if (acc[val] > compare) {
        // if value of that key is greater
        // than the compare value.
        compare = acc[val]; // than make it a new compare value.
        secondFreq = mostFreq;
        mostFreq = val; // also make that key most frequent.
      }

      final = acc;

      return acc;
    }, {});
    console.log("Most Frequent Item is:", secondFreq);
  }
  delete result["undefined"];
  findMostFrequest(result);
  const keysSorted = Object.keys(final).sort(function (a, b) {
    return final[b] - final[a];
  });

  console.log(final);

  return { langStats: final, languages: keysSorted };
};
