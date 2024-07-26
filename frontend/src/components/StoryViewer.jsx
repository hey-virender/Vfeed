import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const StoryViewer = ({
  stories,
  activeIndex,
  setActiveIndex,
  setShowStoryViewer,
}) => {
  const prefix = "http://localhost:3000/";
  const [storyTimeout, setStoryTimeout] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeIndex < stories.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setShowStoryViewer(false);
      }
    }, 5000);

    setStoryTimeout(timer);

    return () => clearTimeout(timer);
  }, [activeIndex, stories.length, setActiveIndex, setShowStoryViewer]);

  const handleNextStory = () => {
    clearTimeout(storyTimeout);
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setShowStoryViewer(false);
    }
  };

  const handlePrevStory = () => {
    clearTimeout(storyTimeout);
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  console.log(stories[activeIndex]);

  return (
    <div className="absolute left-1/2 h-screen -translate-x-1/2 top-full  w-full bg-black bg-opacity-90 justify-center z-40">
      <div className="relative w-full h-[0.1rem]">
        <div
          id="progress-bar"
          className="absolute top-0 left-0 h-full bg-white animate-progress"
          key={activeIndex} // Key to reset animation
        ></div>
      </div>
      <div className="px-3 flex gap-2 items-center mt-1">
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <img
            className="h-full w-full"
            src={prefix + stories[activeIndex].userId.profilePicture}
            alt=""
          />
        </div>
        {stories[activeIndex].userId.username}
      </div>
      <div className="relative h-full w-full mx-auto overflow-hidden mt-5">
        <img
          src={prefix + stories[activeIndex].imageUrl}
          alt="Story"
          className="w-4/5 h-3/5 mx-auto"
        />
        <button
          className="absolute left-0 top-0 h-full w-1/3"
          onClick={handlePrevStory}
        ></button>
        <button
          className="absolute right-0 top-0 h-full w-1/3"
          onClick={handleNextStory}
        ></button>
        <button
          className="absolute -top-5 right-0 p-2"
          onClick={() => setShowStoryViewer(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};

StoryViewer.propTypes = {
  stories: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  setShowStoryViewer: PropTypes.func.isRequired,
};

export default StoryViewer;
