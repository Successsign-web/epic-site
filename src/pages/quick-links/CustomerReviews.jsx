import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Aarav Sharma",
    location: "Delhi",
    rating: 5,
    comment: "The best wedding planning platform! We found our perfect venue and photographer in just a few clicks. The team was very supportive throughout the process.",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Diya Patel",
    location: "Mumbai",
    rating: 4,
    comment: "A fantastic experience with Epic Wedding. The vendor listings are extensive, and the reviews are genuine. Made our wedding planning so much easier.",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Rohan Gupta",
    location: "Bangalore",
    rating: 5,
    comment: "I was amazed by the quality of vendors on this platform. The makeup artist I booked was phenomenal. I would recommend Epic Wedding to everyone.",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
    {
    name: "Isha Singh",
    location: "Kolkata",
    rating: 5,
    comment: "Epic Wedding is a lifesaver for busy couples. We planned our entire wedding from home. The virtual tours of the venues were a great feature.",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    name: "Arjun Reddy",
    location: "Hyderabad",
    rating: 4,
    comment: "Good selection of caterers and decorators. The prices were competitive, and the quality of service was excellent. Happy with the overall experience.",
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    name: "Sanya Mehra",
    location: "Pune",
    rating: 5,
    comment: "We had a wonderful experience with Epic Wedding. The customer support team was very helpful and responsive. They helped us find the perfect wedding planner.",
    image: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

const ReviewCard = ({ name, location, rating, comment, image }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="p-8">
                <div className="flex items-center mb-4">
                    <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-red-100" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-500">{location}</p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} size={20} className="fill-yellow-500 text-yellow-500" />
                    ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{comment}</p>
            </div>
        </div>
    );
}


const CustomerReviews = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">Customer Reviews</h1>
          <p className="text-lg text-gray-600 mt-2">See what our customers have to say</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
