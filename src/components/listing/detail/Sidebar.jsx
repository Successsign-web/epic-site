import React from 'react';

const Sidebar = () => {

  return (
    <aside className="right-form">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="p-6">
                <div className="text-center btngradiant font-bold text-xl text-white py-2 mb-4">
                    Get Free Quote
                </div>
                <form>
                    <div className="space-y-4">
                        <input type="text" name="e_name" placeholder="Name" required className="w-full px-4 py-2 border rounded-md" />
                        <input type="email" name="e_email" placeholder="Email" required className="w-full px-4 py-2 border rounded-md" />
                        <input type="text" name="e_mobile" placeholder="Mobile Number" required className="w-full px-4 py-2 border rounded-md" />
                        <div className="relative">
                            <i className="fa fa-calendar absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="text" name="fn_date" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} placeholder="Event Date" className="w-full pl-10 pr-4 py-2 border rounded-md" />
                        </div>
                        <input type="text" name="location" placeholder="Location" className="w-full px-4 py-2 border rounded-md" />
                        <select name="budget" required className="w-full px-4 py-2 border rounded-md bg-white">
                            <option value="">Budget</option>
                            <option value="Below 25k">Below 25k</option>
                            <option value="Upto 50k">Upto 50k</option>
                            <option value="Upto 1 Lakh">Upto 1 Lakh</option>
                            <option value="1lakh - 5lakh">1 Lakh - 5 Lakh</option>
                            <option value="5lakh - 10lakh">5 Lakh - 10 Lakh</option>
                            <option value="10lakh - 20lakh">10 Lakh - 20 Lakh</option>
                            <option value="25lakh - 50lakh">25 Lakh - 50 Lakh</option>
                            <option value="Above 50 lakh">Above 50 Lakh</option>
                        </select>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="guest_no" placeholder="Number of Guests" className="w-full px-4 py-2 border rounded-md" />
                            <input type="text" name="rooms" placeholder="No of rooms" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                         <div>
                            <p className="text-sm text-gray-700 mb-2">Function Type</p>
                            <div className="flex space-x-4">
                               <label className="flex items-center">
                                 <input name="fn_type" type="radio" value="1" className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Pre-Wedding</span>
                               </label>
                               <label className="flex items-center">
                                 <input name="fn_type" type="radio" value="2" className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Wedding</span>
                               </label>
                            </div>
                         </div>
                         <div>
                            <p className="text-sm text-gray-700 mb-2">Function Time</p>
                            <div className="flex space-x-4">
                               <label className="flex items-center">
                                 <input name="fn_time" type="radio" value="1" className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Evening</span>
                               </label>
                               <label className="flex items-center">
                                 <input name="fn_time" type="radio" value="2" className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Day</span>
                               </label>
                            </div>
                         </div>
                         <textarea name="wed_detail" placeholder="Details about your wedding" required className="w-full px-4 py-2 border rounded-md"></textarea>
                         <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 font-semibold">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
