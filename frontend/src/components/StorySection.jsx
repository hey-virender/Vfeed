import React from "react";
import LogoSection from "./LogoSection";
import CreateStory from "./CreateStory";
import MyStory from "./MyStory";
import StoryViewer from "./StoryViewer";
import Carousel from "react-multi-carousel";
import { useState, useEffect } from "react";
import axios from "axios";

const StorySection = () => {
  const prefix = "http://localhost:3000/";
  const [showAddStory, setShowAddStory] = useState(false);
  const [stories, setStories] = useState([]);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [currentUserStories, setCurrentUserStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAddStory = () => {
    setShowAddStory(!showAddStory);
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 0 },
      items: 6,
    },
  };

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axios.get("/api/stories/fetchStories");
      setStories(response.data);
    };
    fetchStories();
  }, []);

  const handleStoryClick = (userStories) => {
    setCurrentUserStories(userStories);
    setActiveIndex(0);
    setShowStoryViewer(true);
  };

  return (
    <div className="sticky top-0 w-full flex items-center gap-9 border-[0.1rem] py-3 bg-zinc-800 z-40">
      {showAddStory && <CreateStory setShowAddStory={setShowAddStory} />}
      <LogoSection />
      <Carousel
        className="flex"
        responsive={responsive}
        containerClass="w-4/5 z-10 overflow-x-hidden"
        sliderClass="flex gap-2"
      >
        <MyStory handleAddStory={handleAddStory} />
        {stories?.map((storyGroup, index) => (
          <div
            key={index}
            className="h-16 w-16 flex flex-col items-center gap-1"
            onClick={() => handleStoryClick(storyGroup.stories)}
          >
            <div className="h-12 w-12 overflow-hidden border-2 border-purple-700 rounded-full">
              <img
                className="h-full w-full"
                src={prefix + storyGroup?.user.profilePicture}
                alt=""
              />
            </div>
            <span className="text-xs">{storyGroup?.user.username}</span>
          </div>
        ))}
      </Carousel>
      {showStoryViewer && (
        <StoryViewer
          stories={currentUserStories}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setShowStoryViewer={setShowStoryViewer}
        />
      )}
    </div>
  );
};

export default StorySection;
