import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../ContextApi/CartContext';
import { createOrder } from '../Services/orderService';
import StarIcon from '@mui/icons-material/Star';

const Checkout = () => {
  const navigate = useNavigate();
  const { productList, user_id, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'United States',
    paymentMethod: 'COD',
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (productList.length === 0) {
      navigate('/CartPage');
    }
  }, []);

  const getTotalPrice = () => {
    return productList.reduce((total, product) => total + parseInt(product.price), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { shippingAddress, shippingCity, shippingState, shippingZip } = formData;

    if (!shippingAddress.trim()) {
      setError('Shipping address is required');
      return false;
    }
    if (!shippingCity.trim()) {
      setError('City is required');
      return false;
    }
    if (!shippingState.trim()) {
      setError('State is required');
      return false;
    }
    if (!shippingZip.trim()) {
      setError('ZIP code is required');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    setError(null);

    if (!validateForm()) {
      return;
    }

    if (!user_id) {
      setError('User ID not found. Please refresh the page.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        user_id: parseInt(user_id) || 1,  // Ensure integer
        cartItems: productList,
        ...formData,
      };
      console.log(' ORDER PAYLOAD:', orderPayload);
      
      const response = await createOrder(orderPayload);

      if (response.success) {
        // Clear cart after successful order
        clearCart();

        // Store order info for success page
        localStorage.setItem(
          'lastOrder',
          JSON.stringify({
            orderId: response.data.orderId,
            orderNumber: response.data.orderNumber,
            totalAmount: response.data.totalAmount,
          })
        );

        // Navigate to order success page
        navigate(`/OrderSuccess/${response.data.orderId}`);
      } else {
        setError(response.message || 'Failed to place order');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error placing order. Please try again.');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (productList.length === 0) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const subtotal = getTotalPrice();
  const shippingFee = 0;
  const totalAmount = subtotal + shippingFee;

  return (
    <div className="max-w-6xl mx-auto bg-white mb-12">
      <div className="flex gap-8 p-6">
        {/* Left Section - Shipping & Payment Form */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-[#0F1111]">Checkout</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Shipping Address Section */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#0F1111]">Shipping Address</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F1111] mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="w-full px-3 py-2 border border-[#DDD] rounded-lg text-black bg-white focus:outline-none focus:border-[#FF9900]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F1111] mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="w-full px-3 py-2 border border-[#DDD] rounded-lg text-black bg-white focus:outline-none focus:border-[#FF9900]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F1111] mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="shippingState"
                    value={formData.shippingState}
                    onChange={handleInputChange}
                    placeholder="NY"
                    className="w-full px-3 py-2 border border-[#DDD] rounded-lg text-black bg-white focus:outline-none focus:border-[#FF9900]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F1111] mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="shippingZip"
                    value={formData.shippingZip}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full px-3 py-2 border border-[#DDD] rounded-lg text-black bg-white focus:outline-none focus:border-[#FF9900]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F1111] mb-2">
                    Country
                  </label>
                  <select
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#DDD] rounded-lg text-black bg-white focus:outline-none focus:border-[#FF9900]"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#0F1111]">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="text-[#0F1111]">Cash on Delivery (COD)</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CREDIT_CARD"
                  checked={formData.paymentMethod === 'CREDIT_CARD'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="text-[#0F1111]">Credit/Debit Card (Demo)</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={formData.paymentMethod === 'UPI'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="text-[#0F1111]">UPI/Digital Wallet (Demo)</span>
              </label>
            </div>

            <p className="text-xs text-[#666] mt-3">
              ℹ This is a demo application. No actual payment will be processed.
            </p>
          </div>

          {/* Order Items Summary */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#0F1111]">Order Items</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-[#F5F5F5] rounded-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0F1111]">{product.name}</p>
                    <p className="text-xs text-[#666]">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-80 h-fit">
          <div className="bg-[#F9FBFD] p-4 rounded-lg border border-[#DDD]">
            <h3 className="text-lg font-semibold mb-4 text-[#0F1111]">Order Summary</h3>

            <div className="space-y-3 border-b pb-4 mb-4">
              <div className="flex justify-between text-[#0F1111]">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-[#0F1111]">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>

              <div className="flex justify-between text-[#0F1111]">
                <span>Tax</span>
                <span className="font-semibold">$0.00</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-xl font-bold text-[#0F1111]">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FF9900] hover:bg-[#FF8C00]'
              }`}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>

            <div className="text-xs text-[#666] mt-4 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span>Free delivery on this order</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span>7-day return policy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">✓</span>
                <span>Secure transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
