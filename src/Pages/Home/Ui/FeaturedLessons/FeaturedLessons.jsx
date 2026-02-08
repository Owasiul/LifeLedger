import { Bookmark, Share2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";
// todo: Have to create fake lessions
const FeaturedLessons = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="head my-10 ">
        <h2 className="lg:text-6xl text-3xl text-secondary font-semibold">
          Featured Wisdom
        </h2>
        <p className="lg:text-2xl text-xl text-primary mt-3">
          {" "}
          Curated lessons from our community's most insightful voices.
        </p>
      </div>
      <div className="body">
        <div className="card bg-gray-50 dark:bg-gray-800 w-96 h-96 p-5 rounded-lg my-5">
          <div className="top flex flex-row justify-between">
            {/* user  */}
            {/* <img className="w-10 h-10 object-contain" src="" alt="" /> */}
            <p className="dark:text-white">userImage</p>
            <p className="badge bg-red-400">is premium</p>
          </div>
          <div className="Card-body mt-3 space-y-5">
            <h1 className="lg:text-3xl text-2xl dark:text-white">
              Lesson Title
            </h1>

            {/* badges */}
            <span className="badge bg-success">badge</span>

            {/* image */}
            <p className="dark:text-white">Image</p>
            {/* <img src="" alt="" /> */}
          </div>
          {/* card footer */}
          <div className="flex flex-row w-full justify-around items-center mt-5">
            {/* upvote */}
            <div className="upvote flex flex-row gap-3 items-center">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 pointer-events-none text-gray-700 dark:text-gray-300"
              >
                <path
                  d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                  fill="currentcolor"
                  fillRule="evenodd"
                ></path>
              </svg>
              {/* like */}
              <p className="dark:text-white">Like</p>
            </div>
            {/* downvote */}
            <div className="downvote">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 pointer-events-none rotate-180 text-gray-700 dark:text-gray-300"
              >
                <path
                  d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                  fill="currentcolor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            {/* comments */}
            <div className="comments"></div>
            {/* bookmark */}
            <div className="bookmark text-gray-700 dark:text-gray-300">
              <Bookmark></Bookmark>
            </div>
            {/* share */}
            <div className="share text-gray-700 dark:text-gray-300">
              <Share2></Share2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedLessons;
