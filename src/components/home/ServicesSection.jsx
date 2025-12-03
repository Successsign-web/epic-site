import React from 'react';

// Images Import
import weddingPlanner from '../../assets/services/wedding-planner.jpeg';
import weddingDecorators from '../../assets/services/wedding-decorators.jpg';
import photographers from '../../assets/services/photographers.jpg';
import bridalMakeup from '../../assets/services/bridal-makeup.webp';
import bridalGroomWear from '../../assets/services/bridal-groom-wear.jpg';
import cateringSweets from '../../assets/services/catering-sweets.jpg';
import musicEntertainment from '../../assets/services/music-entertainment.jpeg';
import jewelleryInvitation from '../../assets/services/jewellery-invitation.jpg';
import panditsAstrologers from '../../assets/services/pandits-astrologers.jpeg';
import Headingicon from "../../assets/icons/title-img.webp";

const services = [
  {
    title: 'Wedding Planners',
    description: 'Let us handle the stress of planning your dream wedding.',
    backgroundImage: weddingPlanner
  },
  {
    title: 'Wedding Decorators',
    description: 'Transform your venue into a magical setting.',
    backgroundImage: weddingDecorators
  },
  {
    title: 'Photographers',
    description: 'Capture every precious moment of your special day.',
    backgroundImage: photographers
  },
  {
    title: 'Bridal Makeup',
    description: 'Look your absolute best with our professional makeup artists.',
    backgroundImage: bridalMakeup
  },
  {
    title: 'Bridal & Groom Wear',
    description: 'Find the perfect attire for your wedding day.',
    backgroundImage: bridalGroomWear
  },
  {
    title: 'Catering & Sweets',
    description: 'Delight your guests with a delicious culinary experience.',
    backgroundImage: cateringSweets
  },
  {
    title: 'Music & Entertainment',
    description: 'Keep your guests entertained with live bands, DJs, and more.',
    backgroundImage: musicEntertainment
  },
  {
    title: 'Jewellery & Invitation',
    description: 'Find the perfect jewellery and invitations for your wedding.',
    backgroundImage: jewelleryInvitation
  },
  {
    title: 'Pandits & Astrologers',
    description: 'Find the right pandit or astrologer for your wedding ceremony.',
    backgroundImage: panditsAstrologers
  },
];

const ServicesSection = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className='flex justify-center items-center flex-col mb-8'>
                
                 <h2 className="text-4xl  font-bold gradient-text mb-4">
                  Our Services
                </h2>
                <img className='text-center' src={Headingicon} alt="heading-icon" />
                <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
                  We provide a wide range of services to make your wedding a memorable one.
                </p>
               </div>
        

        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-64 flex items-end"
            >
              <img
                src={service.backgroundImage}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>

              <div className="relative z-10 p-8 text-left text-white">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-base">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;
