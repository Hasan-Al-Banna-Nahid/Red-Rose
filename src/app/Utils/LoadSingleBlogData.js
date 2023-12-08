"use ssr";

const LoadSingleBlogData = async (id) => {
  const public_key = process.env.NEXT_PUBLIC_API_Public_Key;
  const res = await fetch(
    `http://localhost:8000/api/v2/app/blog/${id}?public_key=${public_key}`,
    {
      cache: "no-cache",
    }
  );
  return res.json();
};

export default LoadSingleBlogData;
