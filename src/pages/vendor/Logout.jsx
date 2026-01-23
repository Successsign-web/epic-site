import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.success("You have been logged out successfully.");
        // Clear authentication tokens from local storage
        localStorage.removeItem('vendorToken');
        localStorage.removeItem('vendor');
        
        // Redirect to the vendor login page after a short delay
        setTimeout(() => {
            navigate('/vendor/login');
        }, 800);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p className="text-lg text-gray-700">Logging out...</p>
        </div>
    );
};

export default Logout;
