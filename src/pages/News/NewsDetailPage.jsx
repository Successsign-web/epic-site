import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockNews = [
  {
    id: '1',
    title: 'The Latest Wedding Trends of 2026',
    image: 'https://via.placeholder.com/1200x600/FFD700/FFFFFF?text=Wedding+Trends',
    shortDescription: 'Discover the most anticipated wedding trends shaping celebrations in 2026, from decor to technology.',
    fullContent: `
      <p>The year 2026 is ushering in a wave of exciting new wedding trends that promise to make every celebration unique and memorable. One of the most prominent trends is the rise of sustainable weddings. Couples are increasingly opting for eco-friendly venues, locally sourced organic catering, and recycled or repurposed decorations. This shift reflects a growing consciousness about environmental impact and a desire to celebrate responsibly.</p>
      <p>Technology is also playing a significant role in modern weddings. Virtual reality tours of venues, live streaming for distant guests, and personalized wedding apps are becoming more common. These innovations help bridge geographical gaps and enhance the guest experience.</p>
      <p>Personalization remains key, with couples incorporating more elements that tell their unique story. This includes custom-made attire, signature cocktails reflecting their personalities, and entertainment that holds special meaning to them. The focus is shifting from grandiosity to intimacy and authenticity, ensuring that each wedding truly reflects the couple's journey.</p>
      <p>Another emerging trend is the integration of cultural fusion. Many couples are blending traditions from different backgrounds, creating rich and diverse ceremonies that honor their heritage while embracing modernity. This not only adds depth to the celebration but also creates a visually stunning and culturally significant event.</p>
      <p>Finally, wellness and self-care are taking center stage, not just for the couple but also for their guests. Pre-wedding wellness retreats, mindful moments during the ceremony, and healthy food options are gaining popularity. The aim is to create a serene and enjoyable experience for everyone involved, emphasizing mental and physical well-being amidst the celebrations.</p>
    `,
  },
  {
    id: '2',
    title: 'Choosing Your Dream Wedding Venue',
    image: 'https://via.placeholder.com/1200x600/ADD8E6/000000?text=Dream+Venue',
    shortDescription: 'Tips and tricks for selecting the perfect wedding venue that aligns with your vision and budget.',
    fullContent: `
      <p>Selecting the perfect wedding venue is one of the most critical decisions a couple will make during their wedding planning journey. The venue sets the tone for the entire event, influencing everything from the decor to the guest experience. To ensure you make the best choice, consider these essential tips.</p>
      <p>Firstly, establish your budget early on. Venues can vary significantly in price, and knowing your financial limits will help narrow down your options. Be sure to inquire about all potential costs, including rental fees, catering, staff, and any hidden charges.</p>
      <p>Next, consider your guest list size. The venue must comfortably accommodate all your guests without feeling overcrowded or too empty. It's also important to think about the logistics of getting to and from the venue for your guests, especially if many will be traveling from out of town.</p>
      <p>The style and atmosphere of the venue should align with your wedding vision. Whether you dream of a rustic barn, a grand ballroom, a beachfront resort, or a modern urban space, ensure the venue's existing aesthetic complements your desired theme. This can save you a lot on decorations.</p>
      <p>Visit potential venues in person. Photos online can be deceiving, so seeing the space firsthand allows you to assess its true potential, envision your wedding there, and ask detailed questions. Pay attention to the lighting, acoustics, and available facilities.</p>
      <p>Finally, inquire about what's included in the venue package. Some venues offer all-inclusive packages that cover catering, seating, linens, and even a wedding coordinator, while others provide only the space. Understanding these details will help you compare options more effectively and avoid surprises.</p>
    `,
  },
  {
    id: '3',
    title: 'Expert Advice for a Stress-Free Wedding Day',
    image: 'https://via.placeholder.com/1200x600/90EE90/000000?text=Stress-Free+Tips',
    shortDescription: 'Insights from wedding planners on how to ensure your big day goes smoothly and joyfully.',
    fullContent: `
      <p>Your wedding day should be a celebration of love, not a source of stress. While some nerves are natural, proper planning and expert advice can help ensure a smooth and joyful experience. Here are some key insights from seasoned wedding planners to help you achieve a stress-free wedding day.</p>
      <p>One of the most valuable pieces of advice is to delegate tasks. You cannot do everything yourself. Trust your wedding planner, your bridal party, and close family members with responsibilities. Clearly communicate what needs to be done and then let them handle it. This frees you up to enjoy the moment.</p>
      <p>Create a detailed timeline for the day and share it with all key vendors and your wedding party. This ensures everyone is on the same page regarding timings for hair and makeup, photos, ceremony, reception, and departures. A well-organized schedule minimizes confusion and delays.</p>
      <p>Prepare an emergency kit. This small bag can be a lifesaver, containing essentials like pain relievers, safety pins, fashion tape, stain remover, band-aids, and any personal medications. Unexpected small issues can be quickly resolved without causing major disruptions.</p>
      <p>Eat and hydrate throughout the day. It's easy to get caught up in the excitement and forget to fuel your body. Arrange for snacks and water to be available for you and your wedding party, especially during getting ready and photo sessions. A well-nourished couple is a happy couple.</p>
      <p>Most importantly, remember the "why." Amidst all the planning and potential hiccups, take moments to step back and remember why you are there – to marry the love of your life. Embrace the imperfections, laugh at the unexpected, and soak in every precious moment. Your attitude will largely determine your experience.</p>
    `,
  },
];


const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this from an API
    const foundNews = mockNews.find(item => item.id === id);
    if (foundNews) {
      setNewsItem(foundNews);
    } else {
      // Navigate to a 404 page or back to news list if item not found
      navigate('/news'); // Or a dedicated 404 page
    }
  }, [id, navigate]);

  if (!newsItem) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="w-full h-96 object-cover rounded-t-lg"
        />
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {newsItem.title}
          </h1>
          <div className="text-gray-700 text-lg leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: newsItem.fullContent }}>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
          >
            <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to News
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
