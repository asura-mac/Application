import React, { useState, useEffect } from "react";
import Loader from "../component/Loader";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      
      try {
        setLoading(true)
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        setBlogPosts(data);
        setSelectedPost(data[0]); // Set the first blog as selected
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError("Failed to load blogs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <main className="w-[85%] mx-auto flex flex-col md:flex-row min-h-screen my-24">
      {/* Left Section: Blog Content */}
      <article className="md:w-3/5 w-full p-6">
        {selectedPost && (
          <>
            <div className="w-full aspect-video overflow-hidden rounded-2xl mb-4">
              <img
                src={selectedPost?.image || "https://placehold.co/600x600"}
                alt={selectedPost?.title}
                className="w-full h-auto mb-4"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">{selectedPost?.title}</h1>
            <h3 className="text-xl font-bold mb-2">
              {selectedPost?.description}
            </h3>
            <div
               className="prose prose-lg prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedPost?.content }}
            ></div>
          </>
        )}
      </article>

      {/* Right Section: Blog List */}
      <aside className="md:w-2/5 w-full p-6 overflow-y-auto">
        <h2 className="text-2xl text-center bg-[#008CFF] font-semibold mb-4  rounded-t-lg p-2">
          LATEST BLOGS
        </h2>
        <ul className="space-y-4">
          {blogPosts.slice(0, visibleCount).map((post) => (
            <li
              key={post?._id}
              onClick={() => setSelectedPost(post)}
              className="flex bg-white rounded shadow cursor-pointer hover:bg-blue-50 transition"
            >
              <div className="w-2/5 aspect-square">
                <img
                  src={post?.image || "https://placehold.co/600x600"}
                  alt={post?.title}
                  className="w-full h-full object-cover rounded-l"
                />
              </div>
              <div className="w-3/5 p-4 flex flex-col justify-start">
                <h3 className="text-lg font-medium line-clamp-1">
                  {post?.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post?.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {visibleCount < blogPosts.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-[#008CFF] rounded-full hover:bg-blue-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </aside>
       {loading && <Loader/>} 
    </main>
  );
}
