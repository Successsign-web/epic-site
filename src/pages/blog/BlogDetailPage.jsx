import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import toast from 'react-hot-toast';



const BlogDetailPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/public/blogs/${slug}`);
                console.log("API Response for Blog Detail:", response.data); // Debugging line
                if (response.data && response.data.data) { // Assuming data object is directly the blog
                    setBlog(response.data.data);
                } else {
                    console.warn("API response data for blog is not found:", response.data);
                    setBlog(null);
                }
            } catch (err) {
                setError(err);
                console.error("Failed to fetch blog:", err);
                toast.error("Failed to fetch blog.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);


    if (loading) {
        return (
          <div className="text-center py-40">
            <h1 className="text-4xl font-bold">Loading...</h1>
          </div>
        );
    }

    if (error) {
        return (
          <div className="text-center py-40">
            <h1 className="text-4xl font-bold text-red-600">Error: {error.message}</h1>
            <Link to="/blog" className="text-red-600 mt-4 inline-block">Back to Blog</Link>
          </div>
        );
    }

    if (!blog) {
        return (
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold">Blog post not found</h1>
                        <p className="mt-4 text-lg text-gray-600">The blog post you are looking for does not exist or has been removed.</p>
                        <Link to="/blog" className="text-red-600 mt-6 inline-block text-lg font-semibold">Back to all blogs</Link>
                    </div>
                </div>
            </div>
        );
    }

    const imageUrl = blog.image?.url || 'https://via.placeholder.com/1200x600?text=Blog+Image';
    const formattedDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '';
    const authorName = blog.vendor?.vendorName || 'Admin'; // Assuming vendor name is the author

  return (
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Post Header */}
            <div className="text-center">
                <p className="text-base font-semibold leading-7 text-red-600">{blog.category}</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{blog.title}</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">{blog.excerpt}</p>
                <div className="mt-6 flex items-center justify-center gap-x-4">
                    <p className="text-sm leading-6 text-gray-900">By {authorName}</p>
                    <time dateTime={blog.createdAt} className="text-sm leading-6 text-gray-500">
                        {formattedDate}
                    </time>
                    {blog.readTime && (
                        <span className="text-sm leading-6 text-gray-500">
                            {blog.readTime} min read
                        </span>
                    )}
                </div>
            </div>

            {/* Post Image */}
            <div className="my-12">
                 <img src={imageUrl} alt={blog.title} className="aspect-[21/9] w-full rounded-2xl bg-gray-100 object-cover border border-gray-300" />
            </div>

            {/* Post Content */}
            <div className="grid grid-cols-1 gap-x-12">
                <div className="prose lg:prose-xl prose-h2:text-3xl prose-p:leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: blog.content }}>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BlogDetailPage;
