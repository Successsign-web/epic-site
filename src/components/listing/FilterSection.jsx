import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = () => {
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const filters = [
    { name: "Venue Type", options: ["Banquet Halls", "Hotels", "Lawns/Farm House", "Resorts", "Kalyan Mandaps", "Function Halls", "Destination Wedding"] },
    { name: "Space Preferences", options: ["Indoor", "Open Lawn", "Indoor with outdoor", "Poolside Wedding", "Terrace"] },
    { name: "No. of Guests", options: ["Less than 100", "100 - 150", "150 - 200", "200 - 300", "300 & Above"] },
    { name: "Price Per Plate", options: ["Less than 1000", "1000 - 1500", "1500 - 2000", "2000 - 3000", "3000 & Above"] },
    { name: "Safe Wedding", options: ["Wedz Safe", "Vaccinated"] }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-5">
          {filters.map((filter) => (
            <div
              key={filter.name}
              className="cursor-pointer hover:bg-gray-50 transition py-3 flex items-center justify-between px-3"
              onClick={() => toggleFilter(filter.name)}
            >
              <p className="font-semibold  text-black text-sm">{filter.name}</p>
              {openFilter === filter.name ? <ChevronUp className="w-5 h-5 text-red-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </div>
          ))}
        </div>

        {/* Dropdown */}
        {openFilter && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {filters.map((filter) => (
                <div key={filter.name} className={openFilter === filter.name ? 'block' : 'hidden md:block'}>
                  {/* <h3 className="font-bold gradient-text border-b pb-2 border-dashed border-red-600 text-md mb-3">{filter.name}</h3> */}
                  <ul className="space-y-2">
                    {filter.options.map((option) => (
                      <li key={option}>
                        <label className="flex items-center pb-1.5 cursor-pointer">
                          <input
  type="checkbox"
  className="w-4 h-4 transition-all duration-200 border-1 border-gray-400 rounded checked:w-5 checked:h-5 checked:border-red-600  accent-red-600 cursor-pointer"
/>
                          <span className="ml-1 text-sm text-gray-700">{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end gap-4 border-t pt-6">
              <button onClick={() => setOpenFilter(null)} className="text-gray-600 hover:text-red-600">
                Close
              </button>
              <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full">
                View Venues
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;