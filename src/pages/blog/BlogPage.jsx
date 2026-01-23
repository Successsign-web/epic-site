import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard'; 
import api from '../../utils/axiosInstance';
import toast from 'react-hot-toast';


const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center items-center space-x-4 mt-16">
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <div className="flex items-center space-x-2">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === number ? 'bg-red-600 text-white' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </nav>
    );
};


const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [blogPosts, setBlogPosts] = useState([]); // Renamed from 'blogs' to avoid conflict with pagination logic's initial 'blogs'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await api.get('/public/blogs?page=1&limit=10&category=&search='); 
                if (response.data && response.data.data && Array.isArray(response.data.data.blogs)) {
                    setBlogPosts(response.data.data.blogs);
                } else {
                    console.warn("API response data for blogs is not an array:", response.data);
                    setBlogPosts([]);
                }
            } catch (err) {
                setError(err);
                console.error("Failed to fetch blogs:", err);
                toast.error("Failed to fetch blogs.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl gradient-text">From Our Blog</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Get the latest tips, trends, and inspiration for your perfect wedding.
            </p>
          </div>
          {loading && <p className="text-center text-lg text-gray-700 mt-16">Loading blogs...</p>}
          {error && <p className="text-center text-lg text-red-500 mt-16">Error: {error.message}</p>}
          {!loading && !error && blogPosts.length === 0 && (
            <p className="text-center text-lg text-gray-700 mt-16">No blogs found.</p>
          )}

          {!loading && !error && blogPosts.length > 0 && (
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {currentPosts.map((post) => (
                <BlogCard key={post._id} blog={post} />
              ))}
            </div>
          )}

          {!loading && !error && blogPosts.length > 0 && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={blogPosts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
 export default BlogPage; 
