import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=Product'; // Revert to dynamic image URL

  const handleBuyNowClick = () => {
    navigate('/checkout', { state: { product: product } });
  };

  return (
    <div className="relative z-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="w-full overflow-hidden bg-gray-200 h-56 relative z-0">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center border border-yellow-500 relative z-0"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <p className="text-lg font-semibold text-gray-900">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        <button
          onClick={handleBuyNowClick}
          className="relative z-10 py-2 px-3 btngradiant text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
