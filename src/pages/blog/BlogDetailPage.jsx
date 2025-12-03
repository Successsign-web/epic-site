import React from 'react';
import { useParams, Link } from 'react-router-dom';

const blogPosts = [
    // Using the same data from home page for now
    {
        id: 1,
        title: 'Ultimate Guide to choosing a wedding planner',
        excerpt: 'Finding the right wedding planner is the first step towards a stress-free wedding...',
        content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
        <h2 class="text-2xl font-bold my-4">Why you need a planner</h2>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
        <img src="https://source.unsplash.com/random/1200x600/?wedding-planning" class="rounded-lg my-8" />
        <p>Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.</p>
        `,
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-planner',
        category: 'Planning',
        author: 'Jane Doe',
        date: 'Oct 10, 2023'
    },
    // ... other posts from BlogPage
];

const similarPosts = blogPosts.slice(0,3);


const BlogDetailPage = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return <div>Post not found</div>
    }

  return (
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Post Header */}
            <div className="text-center">
                <p className="text-base font-semibold leading-7 text-red-600">{post.category}</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{post.title}</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-center gap-x-4">
                    <p className="text-sm leading-6 text-gray-900">By {post.author}</p>
                    <time dateTime={post.date} className="text-sm leading-6 text-gray-500">
                        {post.date}
                    </time>
                </div>
            </div>

            {/* Post Image */}
            <div className="my-12">
                 <img src={post.imageUrl} alt={post.title} className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover" />
            </div>

            {/* Post Content & Similar Posts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12">
                {/* Main Content */}
                <div className="lg:col-span-2 prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}>
                </div>

                {/* Sidebar with Similar Posts */}
                <div className="mt-16 lg:mt-0">
                    <h2 className="text-2xl font-bold text-gray-900">Similar Posts</h2>
                    <div className="mt-8 space-y-8">
                        {similarPosts.map(p => (
                            <article key={p.id} className="flex items-start">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <img
                                        src={p.imageUrl}
                                        alt=""
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                </div>
                                <div className="ml-4">
                                     <h3 className="text-md font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <Link to={`/blog/${p.id}`}>
                                            <span className="absolute inset-0" />
                                            {p.title}
                                        </Link>
                                    </h3>
                                    <div className="mt-1 flex items-center gap-x-2 text-xs text-gray-500">
                                        <time dateTime={p.date}>
                                            {p.date}
                                        </time>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BlogDetailPage;
