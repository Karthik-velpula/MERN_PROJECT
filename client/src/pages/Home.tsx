import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Calendar, Award } from 'lucide-react';

const Home: React.FC = () => {
  const achievements = [
    { icon: Calendar, number: '500+', text: 'Events Organized' },
    { icon: Users, number: '1000+', text: 'Happy Clients' },
    { icon: Award, number: '50+', text: 'Awards Won' },
    { icon: Star, number: '4.9', text: 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      event: 'Wedding',
      rating: 5,
      comment: 'BookMyEvent made our dream wedding come true! Every detail was perfect.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Rajesh Kumar',
      event: 'Corporate Event',
      rating: 5,
      comment: 'Professional service and exceptional attention to detail. Highly recommended!',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Anita Patel',
      event: 'Birthday Party',
      rating: 5,
      comment: 'Amazing decoration and entertainment. Our guests are still talking about it!',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const sampleEvents = [
    {
      title: 'Royal Wedding',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'A magnificent wedding celebration with traditional decorations'
    },
    {
      title: 'Corporate Gala',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Elegant corporate event with professional setup'
    },
    {
      title: 'Birthday Celebration',
      image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Colorful and fun birthday party arrangement'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
              BookMyEvent
            </h1>
            {/* Removed tagline as requested */}
            <p className="text-lg mb-8 text-primary-200 max-w-2xl mx-auto">
              Creating unforgettable moments with exceptional event management services. 
              From weddings to corporate events, we bring your vision to life.
            </p>
            <div className="space-x-4">
              <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                Get Started
              </Link>
              <Link to="/login" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Our Recent Events</h2>
            <p className="text-xl text-gray-600">Showcasing our expertise in creating memorable experiences</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {sampleEvents.map((event, index) => (
              <div key={index} className="card overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 font-serif">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Our Achievements</h2>
            <p className="text-xl text-gray-600">Numbers that speak for our excellence</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{achievement.number}</div>
                  <div className="text-gray-600">{achievement.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from satisfied customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.event}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 font-serif">Ready to Create Your Perfect Event?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of satisfied customers who trusted us with their special moments
          </p>
          <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;