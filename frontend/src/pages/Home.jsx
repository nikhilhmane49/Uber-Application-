import React from 'react'

function Home() {
    return (
      <div className="h-screen w-full bg-red-300 justify-between flex-col ">
        <img
          className="w-16 ml-8"
          src="https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fwww.logo.wine%2Flogo%2FUber&psig=AOvVaw3PkJYQsS9UBwbosY4mYa64&ust=1733765287231000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjNzJfZmIoDFQAAAAAdAAAAABAE"
          alt="Uber logo"
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold ">Get Started with Uber</h2>
          <button className="w-full bg-black text-white py-3 rounded mt-5">
            Continue
          </button>
        </div>
      </div>
    );
}

export default Home
