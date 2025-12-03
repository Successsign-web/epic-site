import React from 'react';
import { Star } from 'lucide-react';

const vendorReviews = [
  {
    name: "Perfect Planners",
    category: "Wedding Planners",
    rating: 5,
    comment: "Absolutely incredible service! Perfect Planners made our wedding day seamless and stress-free. Every detail was meticulously handled, and their team was a joy to work with.",
    image: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Elite Photographers",
    category: "Wedding Photographers",
    rating: 5,
    comment: "The photos are breathtaking! Elite Photographers captured every emotional moment beautifully. They were professional, discreet, and delivered memories we'll cherish forever.",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Grand Decorators",
    category: "Decor & Design",
    rating: 4,
    comment: "Our venue looked magical thanks to Grand Decorators! They brought our vision to life with stunning floral arrangements and elegant lighting. Minor delays in setup, but the end result was superb.",
    image: "https://images.pexels.com/photos/1036620/pexels-photo-1036620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Delicious Catering",
    category: "Caterers",
    rating: 5,
    comment: "The food was a highlight of our wedding! Delicious Catering provided an exquisite menu, and all our guests raved about the quality and presentation. Highly recommend their services.",
    image: "https://images.pexels.com/photos/1036618/pexels-photo-1036618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Glamour Makeup Studio",
    category: "Bridal Makeup",
    rating: 5,
    comment: "I felt like a queen on my wedding day! Glamour Makeup Studio did an amazing job with my bridal makeup. It lasted all day and night, and I received so many compliments.",
    image: "https://images.pexels.com/photos/1036616/pexels-photo-1036616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Melody Makers",
    category: "Wedding DJ",
    rating: 4,
    comment: "Melody Makers kept the party going all night! Great song selection and energetic presence. There was a slight technical glitch at the start, but they quickly recovered.",
    image: "https://images.pexels.com/photos/1036615/pexels-photo-1036615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const ReviewCard = ({ name, category, rating, comment, image }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="p-8">
                <div className="flex items-center mb-4">
                    <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-red-100" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-500">{category}</p>
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

const VendorReviews = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">Vendor Reviews</h1>
          <p className="text-lg text-gray-600 mt-2">Hear what couples say about our top vendors</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendorReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorReviews;
