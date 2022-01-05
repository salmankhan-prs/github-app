import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

import {
  FaCode,
  FaCodepen,
  FaStore,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import RepoList from "../components/repos/RepoList";
import { getUserAndRepos, getUserStats } from "../context/github/GithubActions";
import { GithubContext } from "../context/github/GithubContext";

const User = () => {
  const { dispatch, user, loading, repos, languages, langStats } =
    useContext(GithubContext);
  const [favouriteLang, setFavouriteLnag] = useState(false);
  const [labelsData, setLabelsData] = useState([]);
  const [labelsStats, setLabelStats] = useState([]);
  const [chartData, setChartData] = useState(null);

  const params = useParams();
  //TODO:// tESTING

  console.log(params);
  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login);
      dispatch({ type: "GET_USER_AND_REPOS", payload: userData });
    };
    getUserData();
    const getUserStatsFn = async () => {
      const userStatsData = await getUserStats(params.login);
      console.log(userStatsData);
      dispatch({ type: "GET_USER_STATS", payload: userStatsData });
      setFavouriteLnag(true);
    };

    getUserStatsFn();

    // User stats
  }, [dispatch, params.login]);
  useEffect(() => {
    const getUserStatsFn = async () => {
      const userStatsData = await getUserStats(params.login);
      console.log(userStatsData);
      dispatch({ type: "GET_USER_STATS", payload: userStatsData });
    };

    getUserStatsFn();
    setFavouriteLnag(languages.keysSorted);
    setLabelsData(Object.keys(langStats));
    setLabelStats(Object.values(langStats));
    setChartData({
      labels: labelsData,
      datasets: [
        {
          label: "Number Of times you used this lanuage ",
          data: labelsStats,
          backgroundColor: [
            "#ffbb11",
            "#ecf0f1",
            "#50AF95",

            "#2a71d0",
            "#B9345A",
            "#51E1ED",
            "#3DBE29",
            "#8D3DAF",
          ],
        },
      ],
    });

    console.log(chartData);
    console.log(labelsData, labelsStats);
  }, [params.login, dispatch, favouriteLang]);
  if (loading) {
    return <Spinner />;
  }
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back to search
          </Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img src={avatar_url} />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title mb-0">{name}</h2>
                <p>{login}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title ">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{type}</div>
                {hireable && (
                  <div className="mx-1 badge badge-info ">hireable</div>
                )}
              </h1>
              <h1 className="text-xl px-3 card-title mr-5 rounded-lg shadow-md bg-base-100 stats ">
                <span className="">Favourite Programing language : </span>
                <div className="mx-1  text-2xl  text-secondary ">
                  {languages[0]}
                </div>
              </h1>
              <p>{bio}</p>
              <div className="mt-4">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline "
                >
                  Visit Github Profile
                </a>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-md bg-base-100 stats">
              {location && (
                <div className="stat">
                  <div className="stat-title text-md">Location</div>
                  <div className="stat-value text-lg">{location}</div>
                </div>
              )}
              {blog && (
                <div className="stat">
                  <div className="stat-title text-md">Website</div>
                  <div className="stat-value text-lg">
                    <a href={`https://${blog}`} target="_blank" rel="noreferer">
                      {blog}
                    </a>
                  </div>
                </div>
              )}
              {twitter_username && (
                <div className="stat">
                  <div className="stat-title text-md">Twitter</div>
                  <div className="stat-value text-lg">
                    <a
                      href={`https://twitter.com/${twitter_username}`}
                      target="_blank"
                      rel="noreferer"
                    >
                      {twitter_username}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats ">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Followers</div>
            <div className="stat-value pr-5 text-3xl md:text:4xl">
              {followers}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Following</div>
            <div className="stat-value pr-5 text-3xl md:text:4xl">
              {following}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">public repos</div>
            <div className="stat-value pr-5 text-3xl md:text:4xl">
              {public_repos}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">public gists</div>
            <div className="stat-value pr-5 text-3xl md:text:4xl">
              {public_gists}
            </div>
          </div>
        </div>

        {chartData && (
          <>
            <div className="flex items-center lg:w-5/6	 sm:w-full md:w-full px-4 py-10 bg-cover card bg-base-200">
              <h1 className="card-title xl:text-3xl lg:text-xl md:text-lg sm:text-md">
                Top Languages used by {name}
              </h1>
              <Bar
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Top Programming languages used by you",
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
            <div className="flex  text-sm text-slate-400	items-baseline		">
              *As of now, your data is Analyzed by your top 100(maximum) latest
              repository{" "}
            </div>
          </>
        )}
        <RepoList repos={repos} />
      </div>
    </>
  );
};
export default User;
