import React, { useState } from "react";

const AboutTeacher = () => {
  const [titleDescriptionVisible, setTitleDescriptionVisible] = useState(false);
  const [areaCoveredVisible, setAreaCoveredVisible] = useState(false);
  const [btnToggle, setButtonToggle] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Track the active section

  const handleBtnToggle = (e) => {
    setButtonToggle((prev) => !prev);
    setTitleDescriptionVisible(false);
    setAreaCoveredVisible(false);
    setActiveSection("");
  };
  const handleSectionToggle = (section) => {
    if (activeSection === section) {
      // Clicking on the same section twice, hide it
      setActiveSection("");
    } else {
      // Clicking on a different section, toggle visibility
      setActiveSection(section);
      if (section === "titleDescription") {
        setTitleDescriptionVisible((prev) => !prev);
        setAreaCoveredVisible(false); // Hide the other section
      } else if (section === "areaCovered") {
        setAreaCoveredVisible((prev) => !prev);
        setTitleDescriptionVisible(false); // Hide the other section
      }
    }
  };

  return (
    <div>
      <div className=" bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white font-bold w-[800px]  rounded-lg">
        <div className="flex">
          <div className="w-[400px]">
            <button
              onClick={() => {
                handleBtnToggle();
                handleSectionToggle("titleDescription");
              }}
              className="btn text-white border-r-2 bg-teal-700 text-[18px] w-[400px]"
            >
              About Teacher
            </button>
          </div>
          <div className="w-[400px]">
            <button
              onClick={() => {
                handleBtnToggle();
                handleSectionToggle("areaCovered");
              }}
              className="btn  text-white border-r-2 bg-teal-700 text-[18px] w-[400px]"
            >
              About Teaching
            </button>
          </div>
        </div>
      </div>
      <div className="my-2">
        {titleDescriptionVisible && (
          <div className="input input-bordered input-error my-2 p-6 w-[800px]  h-[300px] font-bold">
            Master's In Education
          </div>
        )}
        {areaCoveredVisible && (
          <div className="input input-bordered input-success my-2 p-6 w-[800px]  h-[300px] font-bold">
            Jatrabadi | Dhonia
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutTeacher;
