"use client";
import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
import DashboardNavbar from "../../DashboardHeader/DashboardNavbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";
import { Transition, Dialog } from "@headlessui/react";

import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [exam, setExam] = useState([] || {} || null);
  const [question, setQuestion] = useState([]);
  const [eventId, setEventID] = useState(Number || 0);
  const [totalQuestion, setTotalQuestion] = useState(Number || 0);
  const [examDuration, setExamDuration] = useState(Number || 0);
  const [results, setResults] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const timeForEachQuestion = examDuration / totalQuestion;
  // const [remainingTime, setRemainingTime] = useState(timeForEachQuestion);
  const [remainingTime, setRemainingTime] = useState(0);
  const [userAnswered, setUserAnswered] = useState(false);
  const [inputType, setInputType] = useState("");

  const [timeRemaining, setTimeRemaining] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(
    Number || 0 || Boolean
  );
  const [timer, setTimer] = useState(null);
  // Set your initial time value here

  const totalQuestions = question.length; // Assuming you have a 'question' array

  const [selectedOptions, setSelectedOptions] = useState({
    ans: [],
  });
  useEffect(() => {
    question.map((event) => setEventID(event.event_id));
  }, [question]);
  const uniqueNameCount = new Set(question.map((e) => e.name)).size;

  const startCountDownTimer = useCallback(() => {
    setTimer(
      setInterval(() => {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000)
    );
  }, []);
  const handleRadioChange = (questionIds, options) => {
    clearInterval(timer);
    setCurrentQuestion(questionIds[0]);
    setSelectedOptions((prevOptions) => {
      // Check if _selectedOptions_exam_id is an array
      const isArrayOfIds = Array.isArray(prevOptions._selectedOptions_exam_id);

      // If it's an array, include the current question ID
      const updatedOptions = {
        ...prevOptions,
        _selectedOptions_exam_id: isArrayOfIds
          ? [...prevOptions._selectedOptions_exam_id, questionIds[0]]
          : [questionIds[0]],
        ans: [...prevOptions.ans, questionIds[0], options],
      };

      return updatedOptions;
    });
    setUserAnswered(true);
    startCountDownTimer();
    handleNextQuestion();
  };

  useEffect(() => {
    if (remainingTime > 0 && currentQuestion < totalQuestion) {
      startCountDownTimer();
    }

    if (remainingTime < 1 && currentQuestion < totalQuestion) {
      // Handle time out
      clearInterval(timer);
      toast.error("Sorry, Your Time Out!");
      closeModal();
    }

    return () => clearInterval(timer);
  }, [remainingTime, currentQuestion]);

  const handleNextQuestion = () => {
    clearInterval(timer);
    setRemainingTime(Math.round(examDuration / totalQuestion)); // Set your initial time value here

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prevIndex) => prevIndex + 1);
      setUserAnswered(false);
    } else {
      // Handle the end of the quiz
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/event/my");
        let Token = res?.data?.success?.token;
        localStorage.setItem("access-token", Token);
        setEvents(res?.data?.success?.data?.events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(type) {
    setInputType(type);
    setIsOpen(true);
  }
  const changeBackgroundColor = (color) => {
    document.body.style.backgroundColor = color;
  };
  const handleSyllabus = (id) => {
    axiosSecure.get(`/event/syllabus/${id}`).then((res) => {
      let Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);
      setSyllabus(res?.data?.success?.data?.syllabs?.description);
    });
  };
  const handleParticipant = (id) => {
    axiosSecure.get(`/event/participant/${id}`).then((res) => {
      let Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);

      setParticipants(res?.data?.success?.data?.enrolls?.users);
    });
  };
  let currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format "YYYY-MM-DD"

  const handleTakeExam = (id) => {
    axiosSecure.get(`/event/take-exam/${id}`).then((res) => {
      setLoading(true);

      let Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);
      setQuestion(res?.data?.success?.data?.question);
      setTotalQuestion(res?.data?.success?.data?.totalquestion);
      setExamDuration(res?.data?.success?.data?.event?.duration);
      setCurrentQuestion(0); // Reset current question index
      setRemainingTime();
      setRemainingTime(res?.data?.success?.data?.event?.duration);

      setLoading(false);
    });
  };

  const handleResult = (event) => {
    axiosSecure.get(`/event/get-result/${event.id}`).then((res) => {
      let Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);
      setResults(res?.data?.success?.data?.results);
    });
  };

  const handleSubmitContestExam = (event) => {
    axiosSecure
      .post("/event/submit-exam-for-result", {
        event_id: event,
        totalquestion: totalQuestion,
        ans: selectedOptions.ans,
      })
      .then((res) => {
        let Token = res?.data?.success?.token || res?.data?.error?.token;
        localStorage?.setItem("access-token", Token);
        console.log(res);
        if (res?.data?.success) {
          toast.success("Your Exam Is Successfully submitted");
          console.log(res);
          setTimeout(() => {
            closeModal();
          }, 1500);
        }
        if (res?.data?.error) {
          toast.error(res?.data?.error?.message);
          return;
        }
      })
      .catch((err) => {
        console.error("Error submitting exam:", err);
        toast.error("Error submitting your exam. Please try again later.");
      });
  };
  const optionsArray = ["option1", "option2", "option3", "option4"];

  // Function to convert option string to number
  const convertOptionToNumber = (option) => {
    const match = option.match(/\d+/); // Extracts the numeric part from the string
    return match ? parseInt(match[0], 10) : 0; // Converts the numeric part to an integer
  };

  // Map the array of options to an array of numbers
  const numbersArray = optionsArray.map(convertOptionToNumber);
  return (
    <div className="w-[2000px] bg-base-200">
      <DashboardNavbar />
      <Toaster />
      {loading && (
        <div className="w-[300px] mx-auto">
          <span className="loading loading-infinity loading-lg  text-center font-bold"></span>
        </div>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-base-300" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={` min-h-full 
                  ${
                    inputType === "takeExam" &&
                    uniqueNameCount > 1 &&
                    "w-[900px]"
                  }
                  ${
                    inputType === "takeExam" &&
                    uniqueNameCount === 1 &&
                    "w-[1400px]"
                  }
                  ${inputType === "participants" && "w-[1200px]"}
                  ${inputType === "syllabus" && "w-[800px]"}
                  ${inputType === "results" && "w-[1800px]"}
                    
                  transform mx-auto overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 TextColorDashboard"
                  >
                    {inputType === "participants" ? (
                      <h2 className="TextColorDashboard">{"Participants"}</h2>
                    ) : (
                      ""
                    )}
                    {inputType === "syllabus" ? (
                      <h2 className="TextColorDashboard">{"Syllabus"}</h2>
                    ) : (
                      ""
                    )}
                    {inputType === "takeExam" ? (
                      <div className="flex flex-col">
                        <div>
                          <h2 className="TextColorDashboard border-purple-700 p-4 border-r-2">
                            {"Your Exam Is Running"}
                          </h2>
                        </div>
                        <div>
                          <h2 className="TextColorDashboard text-2xl">
                            {`Total Questions : ${
                              totalQuestion - 1 || totalQuestion
                            }`}
                          </h2>
                        </div>
                        <div>
                          <h2 className="TextColorDashboard text-2xl">
                            {`Exam Duration : ${examDuration}`}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {results && inputType === "results" && (
                      <h2 className="TextColorDashboard text-2xl">
                        {`Your Result`}
                      </h2>
                    )}
                  </Dialog.Title>
                  <div className="mt-2 p-8 rounded-lg">
                    <div>
                      {syllabus && inputType === "syllabus" && (
                        <p
                          className={`leading-10 font-bold bg-white p-12 rounded-lg${
                            !syllabus ? "TextColor" : "text-slate-900"
                          }`}
                        >
                          {syllabus || "No Syllabus Found!"}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-lg mx-auto">
                      {participants &&
                        inputType === "participants" &&
                        participants.map((participant) => {
                          return (
                            <div className="bg-white  text-left p-8 rounded-lg border-2 border-purple-700 font-medium w-[400px]">
                              <h2>
                                <span className="font-semibold"> Name :</span>{" "}
                                <span
                                  className={`font-bold ${
                                    !participant === "text-red-800"
                                  } TextColorOther text-2xl `}
                                >
                                  {participant
                                    ? participant?.name
                                    : "No Participants Yet"}
                                </span>
                              </h2>
                              <h2>
                                <span className="font-semibold"> ID :</span>{" "}
                                <span className="font-bold TextColorDashboard text-[21px] mt-6">
                                  {participant.redrose_id}
                                </span>
                              </h2>
                            </div>
                          );
                        })}
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg mx-auto w-full bg-white">
                      {exam && inputType === "takeExam" && (
                        <>
                          <div>
                            {question &&
                              question.map((exam) => {
                                return (
                                  <div>
                                    <div
                                      className={`p-4  w-[1200px] `}
                                      key={exam.id}
                                    >
                                      <div>
                                        <div>
                                          <div>
                                            <h3
                                              className={`TextColorDashboard ${
                                                exam?.name?.length === 1 &&
                                                "text-center"
                                              } mb-6 text-2xl font-bold`}
                                            >
                                              {
                                                <span className="text-3xl TextColorDashboard">
                                                  *
                                                </span>
                                              }{" "}
                                              {exam.name}{" "}
                                              {
                                                // Calculate time for each question in milliseconds
                                                <h2 className="TextColor2">
                                                  Remaining Time :{" "}
                                                  {remainingTime} sec
                                                </h2>
                                              }
                                            </h3>

                                            {[
                                              "option1",
                                              "option2",
                                              "option3",
                                              "option4",
                                            ].map((optionKey, index) => (
                                              <div
                                                key={index}
                                                onClick={() =>
                                                  handleRadioChange(
                                                    [exam.id],
                                                    convertOptionToNumber(
                                                      optionKey
                                                    )
                                                  )
                                                }
                                              >
                                                <label className="flex items-center justify-start gap-4 text-left my-4 hover:cursor-pointer">
                                                  <input
                                                    type="radio"
                                                    name={`radio-${exam.id}`}
                                                    className="w-6 h-6 border-2  border-purple-700"
                                                    id={`radio-${exam.id}-${index} `}
                                                    onChange={() =>
                                                      handleRadioChange(
                                                        [exam.id],
                                                        convertOptionToNumber(
                                                          optionKey
                                                        )
                                                      )
                                                    }
                                                    checked={selectedOptions[
                                                      exam.id
                                                    ]?.includes(
                                                      exam[optionKey]
                                                    )}
                                                  />
                                                  <h2 className="text-[20px] font-bold">
                                                    {exam[optionKey]}
                                                  </h2>
                                                </label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            <div className="w-[1200px] mx-auto p-4">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSubmitContestExam(eventId);
                                }}
                                className={`bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] btn btn-outline ${
                                  uniqueNameCount === 1 && "w-full"
                                } ${
                                  uniqueNameCount > 1 && "w-[710px]"
                                } mx-auto text-white`}
                              >
                                Submit
                              </button>
                            </div>
                            {/* <div>
                              <h3 className="text-2xl TextColorOther">
                                Selected Options:
                              </h3>
                              <ul>
                                {Object.keys(selectedOptions).map(
                                  (questionId, index) => (
                                    <li key={index}>
                                      <span className="TextColorDashboard text-[22px] my-6 font-bold">
                                        Question {questionId}:
                                      </span>{" "}
                                      <span className="TextColorDashboard ms-2 text-2xl font-bold">
                                        {
                                          question.find(
                                            (q) =>
                                              q.id.toString() === questionId
                                          )?.name
                                        }
                                      </span>
                                      ,{" "}
                                      <span className="TextColorDashboard text-[22px] my-6 font-bold">
                                        Your Answer {" : "}
                                      </span>
                                      :{" "}
                                      <span className="TextColorOther ms-2 text-2xl font-bold">
                                        {selectedOptions[questionId]}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div> */}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="  p-4 rounded-lg mx-auto w-full bg-white">
                      {/* <h2 className="text-center text-2xl TextColorDashboard">
                        Your Result
                      </h2> */}
                      {results &&
                        inputType === "results" &&
                        results.map((result, index) => {
                          return (
                            <div className="overflow-x-auto">
                              <table className="table p-6">
                                {/* head */}
                                <thead className="p-6">
                                  <tr>
                                    <th className="TextColorDashboard font-bold text-[22px]">
                                      Total Questions
                                    </th>
                                    <th className="TextColorDashboard font-bold text-[22px]">
                                      Given Answer
                                    </th>
                                    <th className="TextColorDashboard font-bold text-[22px]">
                                      Not Given Answer
                                    </th>

                                    <th className="TextColorDashboard font-bold text-[22px]">
                                      Right Answer
                                    </th>
                                    <th className="TextColorDashboard font-bold text-[22px]">
                                      Wrong Answer
                                    </th>
                                    <th className="TextColorDashboard font-bold text-[22px]">
                                      Negative Marks
                                    </th>
                                    <th className="TextColorDashboard font-bold text-[22px]">
                                      Final Marks
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="p-6">
                                  {/* row 1 */}
                                  <tr>
                                    <td className="font-bold text-[18px] text-center">
                                      {result.total_q}
                                    </td>
                                    <td className="font-bold text-[18px] text-center">
                                      {result.give_ans}
                                    </td>
                                    <td className="font-bold text-[18px] text-center">
                                      {result.not_give_ans}
                                    </td>

                                    <td className="font-bold text-[18px] text-center">
                                      {result.r_ans}
                                    </td>
                                    <td className="font-bold text-[18px] text-center">
                                      {result.w_ans}
                                    </td>
                                    <td className="font-bold text-[18px] text-center">
                                      {result.neg_mark}
                                    </td>
                                    <td className="font-bold text-[20px] badge badge-outline badge-success p-6 text-center">
                                      {result.total_mark}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-red-700  bg-blue-600 px-4 py-2 text-sm font-bold TextColorOther hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got It, Thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div>
        <div className="grid grid-cols-3 mx-auto gap-6 p-6">
          {events && events.length > 0
            ? events.map((event) => {
                const eventDateString = "2023-12-15"; // Replace this with your actual date from the database

                const today = moment().format("YYYY-MM-DD");
                const eventDate = moment(eventDateString).format("YYYY-MM-DD");

                const isToday = eventDate === today;

                const showTakeExamButton = isToday;

                return (
                  <div className="card bg-white rounded-lg p-4">
                    <div className="flex gap-8 justify-center items-center overflow-hidden">
                      <div className="card-body">
                        <h2 className="text-2xl font-bold text-blue-600 TextColorDashboard">
                          {event.name}
                        </h2>
                        <h3 className="text-[19px]">
                          <span className="font-bold">Red Point</span> :{" "}
                          {event.price}
                        </h3>
                        <h3 className="text-[19px]">
                          <span className="font-bold">Exam Date</span> :{" "}
                          {event.date}
                        </h3>
                        <h3 className="text-[19px]">
                          <span className="font-bold">Start Time </span>:{" "}
                          {event.time} A.M
                        </h3>
                        <h3 className="text-[19px]">
                          <span className="font-bold">Exam Duration</span> :{" "}
                          {event.duration} Min
                        </h3>
                      </div>
                      <div className="flex flex-col justify-center gap-2 mt-4 ">
                        {showTakeExamButton ? (
                          <div>
                            <button
                              onClick={() => {
                                openModal("takeExam");
                                handleTakeExam(event.id);
                              }}
                              className="btn btn-primary btn-outline  w-[130px]"
                            >
                              Take Exam
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              disabled={true}
                              className="btn btn-primary btn-outline TextColorDashboard w-[130px]"
                            >
                              Enrolled
                            </button>
                          </div>
                        )}
                        <div>
                          <button
                            onClick={() => {
                              openModal("syllabus");
                              handleSyllabus(event.id);
                            }}
                            className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white w-[130px]"
                          >
                            Syllabus
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              openModal("participants");
                              handleParticipant(event.id);
                              changeBackgroundColor("#c0392b");
                            }}
                            className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#008080] text-white w-[130px]"
                          >
                            Participant
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              handleResult(event);
                              openModal("results");
                            }}
                            className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white w-[130px]"
                          >
                            Result
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : !events && (
                <div className="w-[1800px]">
                  <h3 className="text-7xl TextColorDashboard text-center font-bold">
                    No Contests Available
                  </h3>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default page;
