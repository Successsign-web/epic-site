import React, { useState, useEffect } from 'react';
import { Eye, Lock, Phone, Mail } from 'lucide-react'; // Added Phone and Mail icons
import api from '../../utils/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner'; // Assuming this path

const LEAD_UNLOCK_COST = 10; // Define unlock cost

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [walletBalance, setWalletBalance] = useState(150); 
    const [isLoadingLeads, setIsLoadingLeads] = useState(true); // New state for loading leads
    const [leadsError, setLeadsError] = useState(null); // New state for leads fetching error

    const fetchLeads = async () => {
        setIsLoadingLeads(true);
        setLeadsError(null);
        try {
            // Updated endpoint to /vendor/inquiry for fetching leads
            const response = await api.get('/vendor/inquiry'); 
            if (response.data && Array.isArray(response.data.data)) {
                // Assuming leads come with a 'status' and contact details are initially locked
                setLeads(response.data.data.map(lead => ({ ...lead, unlocked: false, status: lead.status || 'New' })));
            } else {
                setLeads([]);
                console.warn("API response data for leads is not an array:", response.data);
            }
        } catch (err) {
            setLeadsError(err.message || 'Failed to fetch leads.');
            console.error("Failed to fetch leads:", err);
        } finally {
            setIsLoadingLeads(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []); // Fetch leads on component mount

    const handleViewClick = (lead) => {
        setSelectedLead(lead);
    };
    
    const closeModal = () => {
        setSelectedLead(null);
    };

    const handleUnlockLead = () => {
        if (!selectedLead) return;

        if (walletBalance >= LEAD_UNLOCK_COST) {
            setWalletBalance(walletBalance - LEAD_UNLOCK_COST);
            setLeads(prevLeads => prevLeads.map(lead => 
                lead._id === selectedLead._id ? { ...lead, unlocked: true } : lead // Use _id
            ));
            setSelectedLead(prev => ({ ...prev, unlocked: true })); // Update selected lead in modal
            alert(`Contact details unlocked for ${selectedLead.name}! $${LEAD_UNLOCK_COST} deducted from your wallet.`);
            // In a real app, you would also update transactions for the wallet
        } else {
            alert('Insufficient balance. Please add funds to your wallet.');
        }
    };

    if (isLoadingLeads) {
        return (
            <div className="p-8 flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (leadsError) {
        return (
            <div className="p-8 text-center text-red-600">
                Error loading leads: {leadsError}
            </div>
        );
    }

    if (leads.length === 0) {
        return (
            <div className="p-8 text-center text-gray-600">
                No leads available.
            </div>
        );
    }

  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Leads</h1>
         <div className="bg-white rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue/Service</th> {/* Changed 'Service' to 'Venue/Service' */}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead._id}> {/* Use _id for key */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.eventDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.venueTitle || lead.category || lead.message}</td> {/* Use venueTitle or category for service */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                lead.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                                lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleViewClick(lead)} className="text-red-600 hover:text-red-900 flex items-center">
                              <Eye className="h-5 w-5 mr-1" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>

        {selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 shadow-2xl max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Lead Details</h2>
                    <div className="space-y-4">
                        <p><span className="font-semibold">Client Name:</span> {selectedLead.name}</p>
                        <p><span className="font-semibold">Event Date:</span> {selectedLead.eventDate}</p>
                        <p><span className="font-semibold">Venue/Service:</span> {selectedLead.venueTitle || selectedLead.category || selectedLead.message}</p>
                        
                        {selectedLead.unlocked ? (
                            <div className="p-6 bg-green-100 rounded-lg text-center">
                                <p className="text-green-800 mb-4">Contact details unlocked!</p>
                                <div className="flex justify-center items-center space-x-2 text-green-700">
                                    <Phone className="h-5 w-5" />
                                    <span>{selectedLead.phone}</span>
                                </div>
                                <div className="flex justify-center items-center space-x-2 text-green-700 mt-2">
                                    <Mail className="h-5 w-5" />
                                    <span>{selectedLead.email}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 bg-gray-100 rounded-lg text-center">
                                <p className="text-gray-600 mb-4">Unlock contact details to connect with the client.</p>
                                <div className="flex justify-center items-center space-x-2 text-gray-500">
                                    <Lock className="h-5 w-5" />
                                    <span>+91 XXXXX XXXXX</span>
                                </div>
                                <div className="flex justify-center items-center space-x-2 text-gray-500 mt-2">
                                    <Lock className="h-5 w-5" />
                                    <span>XXXXX@XXXXX.com</span>
                                </div>
                                <button onClick={handleUnlockLead} className="mt-6 w-full bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700">
                                    Unlock for ${LEAD_UNLOCK_COST}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Close</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Leads;