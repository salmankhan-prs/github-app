const About = () => {
  return (
    <>
      <h1 className="text-6xl mb-4">
        Github Finder{" "}
        <div class="badge  badge-accent badge-md">version 1.0</div>
      </h1>
      <p className="mb-4 text-2xl font-light">
        A React app to search GitHub profiles and see profile details and to see
        top language you have used in recent time in form charts.
      </p>
      <p className="text-lg text-gray-400">
        Made by :
        <a className="text-white" href="https://twitter.com/salmankhanprs">
          Salman Khan
        </a>
      </p>
      <p className="text-lg text-gray-400">
        The basic version of app taken from{" "}
        <a className="text-white" href="https://twitter.com/traversymedia">
          Brad Traversy
        </a>
      </p>
    </>
  );
};

export default About;
