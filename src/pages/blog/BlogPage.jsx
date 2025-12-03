import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Palette, Heart, Users, Camera } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'Ultimate Guide to choosing a wedding planner',
        excerpt: 'Finding the right wedding planner is the first step towards a stress-free wedding...',
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-planner',
        category: 'Planning',
        author: 'Jane Doe',
        date: 'Oct 10, 2023',
        icon: <BookOpen />,
    },
    {
        id: 2,
        title: 'Top 10 Wedding Venues for 2024',
        excerpt: 'From rustic barns to luxurious hotels, we have compiled a list of the best venues...',
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-venue',
        category: 'Venues',
        author: 'John Smith',
        date: 'Oct 15, 2023',
        icon: <MapPin />,
    },
    {
        id: 3,
        title: 'Decoding the latest trends in bridal fashion',
        excerpt: 'This season is all about minimalist gowns and statement veils. Read on to discover more...',
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-dress',
        category: 'Fashion',
        author: 'Emily White',
        date: 'Oct 20, 2023',
        icon: <Palette />,
    },
    {
        id: 4,
        title: 'A beautiful real wedding in the heart of Jaipur',
        excerpt: 'Get inspired by the beautiful and vibrant wedding of Rohan and Priya in Jaipur...',
        imageUrl: 'https://source.unsplash.com/random/800x600/?indian-wedding',
        category: 'Real Weddings',
        author: 'Admin',
        date: 'Oct 25, 2023',
        icon: <Heart />,
    },
    // Add more posts
    {
        id: 5,
        title: 'Creative Mehndi Designs for the Modern Bride',
        excerpt: 'Move beyond traditional designs with these unique and artistic mehndi ideas...',
        imageUrl: 'https://source.unsplash.com/random/800x600/?mehndi',
        category: 'Fashion',
        author: 'Meera Patel',
        date: 'Oct 28, 2023',
        icon: <Palette />,
    },
    {
        id: 6,
        title: 'How to Choose Your Wedding Photographer',
        excerpt: 'Your wedding photos are memories to last a lifetime. Here is how to choose the right person to capture them.',
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-photographer',
        category: 'Planning',
        author: 'Alex Johnson',
        date: 'Nov 02, 2023',
        icon: <Camera />,
    },
];


const BlogPage = () => {
  return (
    <div className="bg-white">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">From Our Blog</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Get the latest tips, trends, and inspiration for your perfect wedding.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="relative flex flex-col items-start justify-between rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-0">
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="relative w-full p-8 text-white flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-600 mb-4">
                            {React.cloneElement(post.icon, { size: 32, className: "text-white" })}
                        </div>
                        <div className="flex items-center gap-x-4 text-xs">
                            <time dateTime={post.date} className="text-gray-300">
                            {post.date}
                            </time>
                            <span
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
                            >
                            {post.category}
                            </span>
                        </div>
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6">
                            <Link to={`/blog/${post.id}`}>
                                <span className="absolute inset-0" />
                                {post.title}
                            </Link>
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">{post.excerpt}</p>
                        </div>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <div className="text-sm leading-6">
                        <p className="font-semibold">
                            {post.author}
                        </p>
                        </div>
                    </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
