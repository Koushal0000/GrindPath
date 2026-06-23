const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}

      <div className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-6xl font-extrabold leading-tight">
          Build Your
          <span className="text-blue-500"> Discipline</span>
        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-2xl">
          GrindPath helps you track goals, stay consistent,
          and become the best version of yourself.
        </p>

        <div className="flex gap-6 mt-10">

          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-2xl text-lg font-semibold transition duration-300">
            Get Started
          </button>

          <button className="border border-gray-500 hover:border-blue-500 px-8 py-3 rounded-2xl text-lg transition duration-300">
            Learn More
          </button>

        </div>
      </div>

      {/* FEATURES SECTION */}

      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-gray-900 p-8 rounded-3xl hover:scale-105 transition duration-300 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400">
            Goal Tracking
          </h2>

          <p className="text-gray-400 mt-4">
            Track your daily goals and maintain consistency.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-3xl hover:scale-105 transition duration-300 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400">
            Daily Progress
          </h2>

          <p className="text-gray-400 mt-4">
            Monitor your growth and productivity every day.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-3xl hover:scale-105 transition duration-300 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400">
            Stay Motivated
          </h2>

          <p className="text-gray-400 mt-4">
            Build discipline and achieve long-term success.
          </p>
        </div>

      </div>

    </div>
  )
}

export default Home