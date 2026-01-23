import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

const initialPackages = [
    {
        id: 1,
        name: 'Basic Photography Package',
        price: '1,000',
        category: 'Photography',
        description: '4 hours of coverage, 200 edited photos, online gallery.',
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-photography'
    },
    {
        id: 2,
        name: 'Premium Photography Package',
        price: '2,500',
        category: 'Photography',
        description: '8 hours of coverage, 500 edited photos, online gallery, and a wedding album.',
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-album'
    },
    {
        id: 3,
        name: 'Full Venue Decoration',
        price: '5,000',
        category: 'Venue Decoration',
        description: 'Complete decoration for the main event, including stage, entrance, and table setup.',
        imageUrl: 'https://source.unsplash.com/random/800x600/?wedding-decor'
    },
     {id: 4,
        name: 'Intimate Venue Decoration',
        price: '2,000',
        category: 'Venue Decoration',
        description: 'Decoration for a small, intimate wedding ceremony.',
        imageUrl: 'https://source.unsplash.com/random/800x600/?intimate-wedding'
    },
];

const MyPackages = () => {
    const [packages, setPackages] = useState(initialPackages);
    const [showConfirm, setShowConfirm] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setPackageToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        setPackages(packages.filter(p => p.id !== packageToDelete));
        setShowConfirm(false);
        setPackageToDelete(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setPackageToDelete(null);
    };

    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Packages</h1>
                <Link to="/vendor/packages/add" className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-red-700">
                    <Plus className="h-5 w-5" />
                    <span>Add New Package</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map(pkg => (
                    <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <img src={pkg.imageUrl} alt={pkg.name} className="h-48 w-full object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-gray-500">{pkg.category}</p>
                            <h3 className="text-xl font-bold text-gray-800 mt-2">{pkg.name}</h3>
                            <p className="text-2xl font-bold text-red-600 mt-2">${pkg.price}</p>
                            <p className="text-gray-600 mt-4 h-16">{pkg.description}</p>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                    <Eye className="h-5 w-5 text-gray-600" />
                                </button>
                                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                    <Edit className="h-5 w-5 text-gray-600" />
                                </button>
                                <button onClick={() => handleDeleteClick(pkg.id)} className="p-2 bg-red-100 rounded-full hover:bg-red-200">
                                    <Trash2 className="h-5 w-5 text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this package?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button onClick={cancelDelete} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPackages;
