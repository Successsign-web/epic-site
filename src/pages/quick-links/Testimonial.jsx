import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya & Rohan",
    location: "Delhi",
    rating: 5,
    comment: "Epic Wedding made our dream wedding a reality! The vendors were professional, and the platform was so easy to use. Highly recommended!",
    image: "https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Anjali & Vikram",
    location: "Mumbai",
    rating: 5,
    comment: "We found the most amazing photographer through Epic Wedding. The memories they captured are priceless. Thank you for making our special day perfect.",
    image: "https://images.pexels.com/photos/3779791/pexels-photo-3779791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Sneha & Amit",
    location: "Bangalore",
    rating: 4,
    comment: "The venue we booked through Epic Wedding was stunning. The entire process was smooth and hassle-free. A great platform for wedding planning.",
    image: "https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
    {
    name: "Pooja & Sameer",
    location: "Jaipur",
    rating: 5,
    comment: "From the makeup artist to the caterers, every vendor we chose from Epic Wedding was top-notch. Our wedding was everything we hoped for and more.",
    image: "https://images.pexels.com/photos/3779759/pexels-photo-3779759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Neha & Raj",
    location: "Goa",
    rating: 5,
    comment: "Planning a destination wedding in Goa was a breeze with Epic Wedding. They have the best vendors and deals. Our guests had an unforgettable time.",
    image: "https://images.pexels.com/photos/3779750/pexels-photo-3779750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Kavita & Sunil",
    location: "Hyderabad",
    rating: 4,
    comment: "The decorators we found on Epic Wedding did a fantastic job. The venue looked like a fairytale. Thank you for the wonderful recommendations.",
    image: "https://images.pexels.com/photos/3779789/pexels-photo-3779789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const TestimonialCard = ({ name, location, rating, comment, image }) => {
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


const Testimonial = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">Testimonials</h1>
          <p className="text-lg text-gray-600 mt-2">What Our Happy Couples Say</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
