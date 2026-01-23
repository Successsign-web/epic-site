import React from 'react';
import { Link } from 'react-router-dom';

const mockNews = [
  {
    id: '1',
    title: 'The Latest Wedding Trends of 2026',
    image: 'https://via.placeholder.com/400x250/FFD700/FFFFFF?text=Wedding+Trends',
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
    image: 'https://via.placeholder.com/400x250/ADD8E6/000000?text=Dream+Venue',
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
    image: 'https://via.placeholder.com/400x250/90EE90/000000?text=Stress-Free+Tips',
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

const NewsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 relative">
          <span className="relative z-10">Latest Wedding News & Updates</span>
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-2 w-24 bg-rose-500 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockNews.map((newsItem) => (
            <div key={newsItem.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="relative overflow-hidden h-52">
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="p-7">
                <h3 className="font-bold text-2xl text-gray-900 mb-3 leading-tight group-hover:text-rose-600 transition-colors duration-300">
                  {newsItem.title}
                </h3>
                <p className="text-gray-700 text-base mb-5 line-clamp-3">
                  {newsItem.shortDescription}
                </p>
                <Link
                  to={"/news/" + newsItem.id}
                  className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700 transition-colors duration-300"
                >
                  Read More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

