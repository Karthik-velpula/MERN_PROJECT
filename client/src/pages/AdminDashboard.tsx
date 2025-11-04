import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Mail, Calendar, User, DollarSign } from 'lucide-react';

interface Booking {
  id: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  total_amount: number;
  booking_date: string;
  status: string;
  items: Array<{
    name: string;
    category: string;
    price: number;
    quantity: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data);
    } catch (err: any) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (type: 'phone' | 'email', contact: string) => {
    if (type === 'phone') {
      window.open(`tel:${contact}`);
    } else {
      window.open(`mailto:${contact}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage all event bookings and customer inquiries
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <div className="card p-8 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
              <p className="text-gray-600">Bookings will appear here once customers start making reservations.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif">
                      Booking #{booking.id}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ₹{booking.total_amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Customer Details
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Name:</strong> {booking.user_name}
                      </p>
                      <p className="text-gray-700">
                        <strong>Email:</strong> {booking.user_email}
                      </p>
                      <p className="text-gray-700">
                        <strong>Phone:</strong> {booking.user_phone}
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleContact('phone', booking.user_phone)}
                        className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </button>
                      <button
                        onClick={() => handleContact('email', booking.user_email)}
                        className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </button>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            className="btn-primary"
                            onClick={async () => {
                              await axios.patch(`/api/bookings/${booking.id}/status`, { status: 'confirmed' });
                              fetchBookings();
                            }}
                          >Accept</button>
                          <button
                            className="btn-danger"
                            onClick={async () => {
                              await axios.patch(`/api/bookings/${booking.id}/status`, { status: 'rejected' });
                              fetchBookings();
                            }}
                          >Reject</button>
                        </>
                      )}
                      {booking.status === 'confirmed' && <span className="text-green-600 font-bold">Accepted</span>}
                      {booking.status === 'rejected' && <span className="text-red-600 font-bold">Rejected</span>}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Booked Services</h4>
                    <div className="space-y-2">
                      {booking.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;