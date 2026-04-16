import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderById } from '../Services/orderService';
import CartContext from '../ContextApi/CartContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { productList } = useContext(CartContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadOrderData();
  }, [orderId]);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      if (orderId) {
        const response = await fetchOrderById(orderId);
        if (response.success) {
          setOrder(response.data);
        } else {
          // Try to get from localStorage if API fails
          const lastOrder = localStorage.getItem('lastOrder');
          if (lastOrder) {
            setOrder(JSON.parse(lastOrder));
          } else {
            setError('Order not found');
          }
        }
      }
    } catch (err) {
      console.error('Error loading order:', err);
      // Fallback to localStorage
      const lastOrder = localStorage.getItem('lastOrder');
      if (lastOrder) {
        setOrder(JSON.parse(lastOrder));
      } else {
        setError('Could not load order details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleTrackOrder = () => {
    if (order?.orderNumber) {
      // In a real application, this would navigate to an order tracking page
      alert(`Tracking order: ${order.orderNumber}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9900] mx-auto mb-4"></div>
          <p className="text-[#0F1111]">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="max-w-6xl mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleContinueShopping}
            className="px-6 py-2 bg-[#FF9900] text-white rounded-lg hover:bg-[#FF8C00]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <CheckCircleIcon
          className="text-green-600"
          style={{ fontSize: '80px' }}
        />
        <h1 className="text-4xl font-bold text-[#0F1111] mt-4 mb-2">
          Order Confirmed! 🎉
        </h1>
        <p className="text-[#666] text-lg mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      {order && (
        <div className="max-w-2xl mx-auto">
          {/* Order Details Card */}
          <div className="bg-[#F9FBFD] border border-[#DDD] rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-[#0F1111] mb-4">Order Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-[#666] font-semibold">Order Number</p>
                <p className="text-lg font-bold text-[#FF9900]">
                  {order.orderNumber || order.order_number || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#666] font-semibold">Order Date</p>
                <p className="text-lg font-bold text-[#0F1111]">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#666] font-semibold">Order Status</p>
                <p
                  className={`text-lg font-bold ${
                    order.status === 'confirmed'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}
                >
                  {(order.status || 'Confirmed').charAt(0).toUpperCase() +
                    (order.status || 'Confirmed').slice(1)}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#666] font-semibold">Total Amount</p>
                <p className="text-lg font-bold text-[#0F1111]">
                  ${Number(order.totalAmount || order.total_amount || 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            {(order.shipping_address ||
              order.shippingAddress) && (
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-[#0F1111] mb-3">
                  Shipping Address
                </h3>
                <p className="text-[#666]">
                  {order.shipping_address || order.shippingAddress}
                </p>
                <p className="text-[#666]">
                  {order.shipping_city || order.shippingCity},{' '}
                  {order.shipping_state || order.shippingState}{' '}
                  {order.shipping_zip || order.shippingZip}
                </p>
                <p className="text-[#666]">
                  {order.shipping_country || order.shippingCountry}
                </p>
              </div>
            )}
          </div>

          {/* Order Items */}
          {order.items && order.items.length > 0 && (
            <div className="bg-white border border-[#DDD] rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-[#0F1111] mb-4">
                Order Items
              </h3>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-[#0F1111]">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-[#666]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-[#0F1111]">
                      ${Number(item.total_price || 0).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#666]">Subtotal</span>
                  <span className="font-semibold text-[#0F1111]">
                    ${Number(order.subtotal || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[#666]">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#0F1111]">
                  <span>Total</span>
                  <span>${Number(order.totalAmount || order.total_amount || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-[#0F1111] mb-4">What's Next?</h3>
            <ul className="space-y-2 text-[#666]">
              <li>✓ You will receive a confirmation email shortly</li>
              <li>✓ Track your order status using your order number</li>
              <li>✓ Items will be shipped within 2-3 business days</li>
              <li>✓ Free delivery on this order</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleTrackOrder}
              className="px-8 py-3 bg-[#FF9900] text-white rounded-lg font-semibold hover:bg-[#FF8C00] transition-colors"
            >
              Track Order
            </button>

            <button
              onClick={handleContinueShopping}
              className="px-8 py-3 border-2 border-[#FF9900] text-[#FF9900] rounded-lg font-semibold hover:bg-[#FFF9F1] transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8 text-[#666]">
            <p className="mb-2">Need help?</p>
            <p>
              Contact us at{' '}
              <a href="mailto:support@amazoni.com" className="text-[#FF9900] font-semibold">
                support@amazoni.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
