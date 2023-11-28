import React, { useState } from "react";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";

const SingleTutor = () => {
  // const [titleDescription, setTitleDescription] = useState(false);
  // const [areaCovered, setAreaCovered] = useState(false);
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
      <div>
        <div className="flex">
          <div>
            <button
              className="btn w-[240px] text-[18px]"
              onClick={() => {
                handleBtnToggle();
                handleSectionToggle("titleDescription");
              }}
            >
              Title Description{" "}
              {btnToggle ? (
                <FaAngleDown className="text-2xl text-purple-700" />
              ) : (
                <FaAngleDown className="text-2xl text-purple-700" />
              )}
            </button>
          </div>
        </div>
        <div>
          {titleDescriptionVisible && (
            <div className="input input-bordered input-error my-2 p-6 w-[500px] h-[300px] font-bold">
              Master's In Education
            </div>
          )}
        </div>
      </div>
      {/* ------------ */}
      <div>
        <div className="flex my-4">
          <div>
            <button
              className="btn w-[240px] text-[18px]"
              onClick={() => {
                handleBtnToggle();
                handleSectionToggle("areaCovered");
              }}
            >
              Area Covered{" "}
              {btnToggle ? (
                <FaAngleDown className="text-2xl ml-[16px] text-purple-700" />
              ) : (
                <FaAngleDown className="text-2xl ml-[16px] text-purple-700" />
              )}
            </button>
          </div>
        </div>
        <div>
          {areaCoveredVisible && (
            <div className="input input-bordered input-success p-6 w-[500px] h-[300px] font-bold">
              Jatrabadi | Dhonia
            </div>
          )}
        </div>
      </div>
      {/* ------------- */}

      {/* ----------------- */}
    </div>
  );
};

export default SingleTutor;
