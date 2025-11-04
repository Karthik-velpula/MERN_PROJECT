import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Plus } from 'lucide-react';

interface MakeupItem {
  id: string;
  name: string;
  image: string;
  prices: number[];
  description: string;
}

const MakeupPage: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedBudgets, setSelectedBudgets] = useState<{ [key: string]: number }>({});

  const makeupItems: MakeupItem[] = [
    {
      id: 'namrata-soni',
      name: 'Namrata Soni',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: [25000],
      description: 'Celebrity makeup artist known for bridal and fashion looks.'
    },
    {
      id: 'mickey-contractor',
      name: 'Mickey Contractor',
      image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: [35000],
      description: 'Bollywood’s most sought-after makeup artist.'
    },
    {
      id: 'mehak-ghan',
      name: 'Mehak Ghan',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      prices: [18000],
      description: 'Popular for contemporary bridal looks.'
    }
  ];

  const handleBudgetSelect = (itemId: string, price: number) => {
    setSelectedBudgets(prev => ({ ...prev, [itemId]: price }));
  };

  const handleAddToCart = (item: MakeupItem) => {
    const selectedPrice = selectedBudgets[item.id];
    if (!selectedPrice) {
      alert('Please select a budget first');
      return;
    }

    addToCart({
      id: `${item.id}-${selectedPrice}`,
      name: item.name,
      category: 'Makeup',
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
            Makeup & Styling Services
          </h1>
          <p className="text-xl text-gray-600">
            Look your best with our professional makeup and styling services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {makeupItems.map((item) => (
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
                  <h4 className="font-medium text-gray-900 mb-2">Choose Your Makeup Artist:</h4>
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
                        <span className="text-gray-700">{item.name} - ₹{price.toLocaleString()}</span>
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

export default MakeupPage;