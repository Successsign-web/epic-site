import React from 'react';
import { Plus, DollarSign, List, Image as ImageIcon } from 'lucide-react';

const AddPackage = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Package</h1>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div>
                            {/* Package Name */}
                            <div className="mb-6">
                                <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                                <input type="text" id="packageName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
                            </div>

                            {/* Category */}
                            <div className="mb-6">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select id="category" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    <option>Photography</option>
                                    <option>Venue Decoration</option>
                                    <option>Catering</option>
                                    <option>Music & Entertainment</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="text" id="price" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea id="description" rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-5 border-t border-gray-200">
                        <div className="flex justify-end">
                            <button type="button" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" className="ml-3 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-red-700">
                                <Plus className="h-5 w-5" />
                                <span>Save Package</span>
                             </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;
