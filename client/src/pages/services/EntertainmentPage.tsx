import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Plus } from 'lucide-react';

interface EntertainmentItem {
  id: string;
  name: string;
  image: string;
  prices: number[];
  description: string;
}

const EntertainmentPage: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedBudgets, setSelectedBudgets] = useState<{ [key: string]: number }>({});

  const entertainmentItems: EntertainmentItem[] = [
    {
      id: 'dj-night',
      name: 'DJ Night',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: [10000, 20000, 40000],
      description: 'Professional DJ with sound system and lighting'
    },
    {
      id: 'sangeet',
      name: 'Sangeet Ceremony',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: [15000, 30000, 60000],
      description: 'Traditional sangeet ceremony with music and dance'
    },
    {
      id: 'mehndi',
      name: 'Mehndi Ceremony',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: [8000, 15000, 30000],
      description: 'Beautiful mehndi ceremony setup with entertainment'
    },
    {
      id: 'orchestra',
      name: 'Orchestra',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: [25000, 50000, 100000],
      description: 'Live orchestra performance for your special event'
    }
  ];

  const handleBudgetSelect = (itemId: string, price: number) => {
    setSelectedBudgets(prev => ({ ...prev, [itemId]: price }));
  };

  const handleAddToCart = (item: EntertainmentItem) => {
    const selectedPrice = selectedBudgets[item.id];
    if (!selectedPrice) {
      alert('Please select a budget first');
      return;
    }

    addToCart({
      id: `${item.id}-${selectedPrice}`,
      name: item.name,
      category: 'Entertainment',
      price: selectedPrice,
      image: item.image
    });

    alert('Item added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Entertainment Services
          </h1>
          <p className="text-xl text-gray-600">
            Make your event memorable with our entertainment options
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entertainmentItems.map((item) => (
            <div key={item.id} className="card overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-serif">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Choose Your Budget:</h4>
                  <div className="space-y-2">
                    {item.prices.map((price) => (
                      <label key={price} className="flex items-center">
                        <input
                          type="radio"
                          name={`budget-${item.id}`}
                          value={price}
                          onChange={() => handleBudgetSelect(item.id, price)}
                          className="mr-2 text-primary-600"
                        />
                        <span className="text-gray-700">₹{price.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentPage;