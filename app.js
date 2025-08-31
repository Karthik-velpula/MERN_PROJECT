import React from 'react';
import './App.css'; // We'll move your CSS here

function App() {
  return (
    <>
      <header>
        <div className="navbar">
          <div className="site-name">Event Booking System</div>
          <div className="search-bar">
            <input type="text" placeholder="Search for Decorations, Photography, Lighting..." />
          </div>
          <div className="nav-links">
            <button className="login-btn">Login</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Plan Your Dream Event with Us!</h1>
          <p>Decorations | Photography | Lighting | Catering</p>
          <a href="#" className="btn-primary">Book Services</a>
        </div>
      </section>

      <section className="categories">
        <h2>Our Services</h2>
        <div className="category-cards">
          {['Decorations', 'Photography', 'Lighting', 'Catering'].map((service) => (
            <div className="card" key={service}>{service}</div>
          ))}
        </div>
      </section>

      <section className="featured-events">
        <h2>Featured Services</h2>
        <div className="event-grid">
          <div className="event-card">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf" alt="Decoration" />
            <h3>Elegant Wedding Decor</h3>
            <p>Starting from ₹25,000</p>
            <a href="#" className="btn-secondary">Book Now</a>
          </div>
          <div className="event-card">
            <img src="/photography_1.jpeg" alt="Photography" />
            <h3>Professional Photography</h3>
            <p>Capture your best moments</p>
            <a href="#" className="btn-secondary">Book Now</a>
          </div>
          <div className="event-card">
            <img src="https://images.unsplash.com/photo-1582719478150-469b9c7d1f71" alt="Lighting" />
            <h3>Premium Lighting Setup</h3>
            <p>Perfect for grand events</p>
            <a href="#" className="btn-secondary">Book Now</a>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Event Booking System. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
