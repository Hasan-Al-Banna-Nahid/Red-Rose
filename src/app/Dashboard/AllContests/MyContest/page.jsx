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
import Marquee from "react-fast-marquee";
import Swal from "sweetalert2";

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
  const [remainingTime, setRemainingTime] = useState(Number);
  const [userAnswered, setUserAnswered] = useState(false);
  const [inputType, setInputType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(
    Number || 0 || Boolean
  );
  const [timer, setTimer] = useState(null);
  const totalQuestions = question.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({
    ans: [],
  });

  useEffect(() => {
    question.map((event) => setEventID(event.event_id));
  }, [question]);
  const uniqueNameCount = new Set(question.map((e) => e.name)).size;
  const optionCharacterLengths = question.reduce(
    (acc, e) => {
      acc.option1 += e.option1.length;
      acc.option2 += e.option2.length;
      acc.option3 += e.option3.length;
      acc.option4 += e.option4.length;
      return acc;
    },
    { option1: 0, option2: 0, option3: 0, option4: 0 }
  );
  const isAnyOptionGreaterThan100 = Object.values(optionCharacterLengths).some(
    (length) => length > 100
  );

  const startCountDownTimer = useCallback(() => {
    setTimer(
      setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 1000)
    );
  }, []);
  const handleRadioChange = (questionIds, options) => {
    clearInterval(timer);

    setCurrentQuestion(questionIds[0]);
    setSelectedOptions((prevOptions) => {
      const isArrayOfIds = Array.isArray(prevOptions._selectedOptions_exam_id);
      const updatedOptions = {
        ...prevOptions,
        _selectedOptions_exam_id: isArrayOfIds
          ? [...prevOptions._selectedOptions_exam_id, questionIds[0]]
          : [questionIds[0]],
        ans: [...prevOptions.ans, questionIds[0], options],
      };
      return updatedOptions;
    });
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserAnswered(true);

    handleNextQuestion();
  };

  useEffect(() => {
    clearInterval(timer);
    if (remainingTime >= 0 && currentQuestion <= totalQuestion) {
      startCountDownTimer();
    }

    if (remainingTime < 1 && currentQuestion < totalQuestion) {
      toast.error("Sorry, Your Time Out!");
      closeModal();
    }

    return () => clearInterval(timer);
  }, [remainingTime, currentQuestion, startCountDownTimer]);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const formattedTime = formatTime(remainingTime);
  const examDurationInMinutes = Math.floor(examDuration / 60);

  const handleNextQuestion = () => {
    clearInterval(timer);

    const examDurationInMinutes = Math.floor(examDuration / 60);
    const timePerQuestionInMinutes = Math.floor(
      examDurationInMinutes / totalQuestion
    );
    setRemainingTime(
      Math.max(0, remainingTime - timePerQuestionInMinutes * 60)
    );

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prevIndex) => prevIndex + 1);
      setUserAnswered(false);
    } else {
      clearInterval(timer);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/event/my");
        let Token = res?.data?.success?.token;
        localStorage?.setItem("access-token", Token);
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
    if (inputType === "takeExam") {
      window.location.reload();
    }
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

  const swalExamTitle = `
  <div style="color: black; font-size: 20px; font-weight: bold;">
    <p>Do You Want To Take The Exam?</p>

    <p> You will be able to
    select an answer for each question only once. Your total exam time will
    be shown after you confirm to take the exam.And Your Total Exam Time Is For All The Questions To Answer.</p>
  </div>
 
`;
  const handleTakeExam = (id) => {
    Swal.fire({
      title: `${swalExamTitle}`,
      customClass: {
        popup: "min-w-[1000px] mx-auto font-bold",
      },
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Welcome!", "", "");
        axiosSecure.get(`/event/take-exam/${id}`).then((res) => {
          setLoading(true);

          let Token = res?.data?.success?.token;
          localStorage?.setItem("access-token", Token);
          setQuestion(res?.data?.success?.data?.question);
          setTotalQuestion(res?.data?.success?.data?.totalquestion);
          setExamDuration(res?.data?.success?.data?.event?.duration);
          setCurrentQuestion(0);
          setRemainingTime();
          setRemainingTime(res?.data?.success?.data?.event?.duration);

          setLoading(false);
        });
      } else if (result.isDismissed) {
        Swal.fire("It's Ok,Be Prepare", "", "");
        closeModal();
      }
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

        if (res?.data?.success) {
          toast.success("Your Exam Is Successfully submitted");

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
                    !isAnyOptionGreaterThan100 &&
                    "w-[900px]"
                  }
                  ${
                    inputType === "takeExam" &&
                    isAnyOptionGreaterThan100 &&
                    "w-[1460px]"
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
                            {`Exam Duration: ${
                              examDurationInMinutes > 0
                                ? `${examDurationInMinutes} minute${
                                    examDurationInMinutes !== 1 ? "s" : ""
                                  }`
                                : `${examDuration} seconds`
                            }`}
                          </h2>
                        </div>
                        <div>
                          <h2 className="TextColorOther text-3xl mt-4 text-center font-bold">
                            Select a Answer Before Time Reach Out,Only One
                            Chance To Select Answer
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
                  <div className="mt-2 p-8 rounded-lg mx-auto w-full bg-white">
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
                      {question && exam && inputType === "takeExam" && (
                        <>
                          <div>
                            {question && question[currentQuestionIndex] && (
                              <div>
                                <div
                                  className={`p-4 w-[1200px]`}
                                  key={question[currentQuestionIndex].id}
                                >
                                  <h3
                                    className={`TextColorDashboard ${
                                      question[currentQuestionIndex]?.name
                                        ?.length === 1 && "text-center"
                                    } mb-6 text-2xl font-bold`}
                                  >
                                    <span className="text-3xl TextColorDashboard">
                                      *
                                    </span>{" "}
                                    {question[currentQuestionIndex].name}
                                    <h2 className="TextColor2">
                                      Remaining Time : {formattedTime} sec
                                    </h2>
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
                                          [question[currentQuestionIndex].id],
                                          convertOptionToNumber(optionKey)
                                        )
                                      }
                                    >
                                      <label className="flex items-center justify-start gap-4 text-left my-4 hover:cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`radio-${question[currentQuestionIndex].id}`}
                                          className="w-6 h-6 border-2  border-purple-700"
                                          id={`radio-${question[currentQuestionIndex].id}-${index} `}
                                          onChange={() =>
                                            handleRadioChange(
                                              [
                                                question[currentQuestionIndex]
                                                  .id,
                                              ],
                                              convertOptionToNumber(optionKey)
                                            )
                                          }
                                          checked={selectedOptions[
                                            question[currentQuestionIndex].id
                                          ]?.includes(
                                            question[currentQuestionIndex][
                                              optionKey
                                            ]
                                          )}
                                        />
                                        <h2 className="text-[20px] font-bold">
                                          {
                                            question[currentQuestionIndex][
                                              optionKey
                                            ]
                                          }
                                        </h2>
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="w-[1200px] mx-auto p-4">
                              {currentQuestionIndex < totalQuestions ? (
                                <button
                                  onClick={handleNextQuestion}
                                  className={`bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white btn btn-outline text-2xl ${
                                    isAnyOptionGreaterThan100 && "w-full"
                                  } ${
                                    !isAnyOptionGreaterThan100 && "w-[710px]"
                                  } mx-auto text-white`}
                                >
                                  <span className="loading loading-infinity loading-lg  text-center font-bold"></span>
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmitContestExam(eventId);
                                  }}
                                  className={`bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] btn btn-outline ${
                                    uniqueNameCount === 1 && "w-full mx-auto"
                                  } ${
                                    uniqueNameCount > 1 && "w-[710px] mx-auto"
                                  } mx-auto text-white`}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="  p-4 rounded-lg mx-auto w-full bg-white">
                      {results &&
                      inputType === "results" &&
                      results &&
                      results.length > 0
                        ? results.map((result, index) => {
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
                          })
                        : ""}
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
                // const eventDateString = "2023-12-17";
                const eventDateString = new Date(event.date).toString();

                const today = moment().format("YYYY-MM-DD");
                const eventDate = moment(eventDateString).format("YYYY-MM-DD");

                const isToday = eventDate === today;
                let todayTime = new Date();
                let formattedTodayTime = todayTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                });
                let hour = todayTime.getHours();
                let min = todayTime.getMinutes();

                formattedTodayTime = `${hour % 12 || 12} : ${min} ${
                  hour >= 12 ? "PM" : "AM"
                }`;
                let eventTime = event.time;
                let [hours, minutes] = eventTime.split(":");

                let currentTime = new Date();
                currentTime.setHours(hours);
                currentTime.setMinutes(minutes);

                let formattedEventTime = currentTime.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });

                // const showTakeExamButton =
                //   isToday && formattedEventTime >= formattedTodayTime;
                const showTakeExamButton = isToday && event.status === "start";
                return (
                  <div className="card bg-white rounded-lg p-4">
                    {isToday && formattedEventTime == formattedTodayTime ? (
                      <Marquee>
                        <h2 className="TextColorOther font-bold text-center text-xl">
                          Participate In The Exam
                        </h2>
                      </Marquee>
                    ) : !isToday &&
                      eventDate < today &&
                      formattedEventTime != formattedTodayTime ? (
                      <Marquee>
                        <h2 className="TextColorOther font-bold text-center text-xl">
                          Sorry, Exam Is Over At {eventDate} and The Time Was{" "}
                          {formattedEventTime}
                        </h2>
                      </Marquee>
                    ) : !isToday ||
                      (eventDate > today &&
                        formattedEventTime != formattedTodayTime) ? (
                      <Marquee>
                        <h2 className="TextColorOther font-bold text-center text-xl">
                          Wait For The Exam, It's Coming in {formattedEventTime}
                        </h2>
                      </Marquee>
                    ) : isToday && formattedEventTime > formattedTodayTime ? (
                      <Marquee>
                        <h2 className="TextColorOther font-bold text-center text-xl">
                          Exam Is Running
                        </h2>
                      </Marquee>
                    ) : null}

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
