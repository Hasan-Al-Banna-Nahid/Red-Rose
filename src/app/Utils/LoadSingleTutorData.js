"use ssr";
const LoadSingleTutorData = async (id) => {
  const res = await fetch(`http://localhost:5000/tutor/${id}`, {
    cache: "no-cache",
  });
  return res.json();
};

export default LoadSingleTutorData;
