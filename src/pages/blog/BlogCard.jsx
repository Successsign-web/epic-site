import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
  // Use a placeholder if the image is missing
  const imageUrl = blog.image?.url || 'https://via.placeholder.com/400x300?text=Blog+Image';

  return (
    <Link 
      to={`/blog/${blog.slug}`} 
      className="group block rounded-2xl overflow-hidden shadow-md my-3 bg-white h-[480px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={blog.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {blog.category && (
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {blog.createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          )}
          {blog.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors flex-grow min-h-[56px]">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-red-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Read More <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
