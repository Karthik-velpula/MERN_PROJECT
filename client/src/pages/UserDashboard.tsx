import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Utensils, Music, Palette, Flower } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const services = [
    {
      id: 'decoration',
      name: 'Decoration',
      icon: Flower,
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Beautiful decorations for your special events',
      path: '/services/decoration'
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional photography and videography services',
      path: '/services/photography'
    },
    {
      id: 'catering',
      name: 'Catering',
      icon: Utensils,
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Delicious food and catering services',
      path: '/services/catering'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: Music,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Music, DJ, and entertainment services',
      path: '/services/entertainment'
    },
    {
      id: 'makeup',
      name: 'Makeup',
      icon: Palette,
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional makeup and styling services',
      path: '/services/makeup'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Choose from our premium event services to create your perfect celebration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.id}
                to={service.path}
                className="card overflow-hidden hover:scale-105 transform transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 font-serif text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                  <div className="mt-4">
                    <span className="text-primary-600 font-medium hover:text-primary-700">
                      Explore Options →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;