import React, { useState } from 'react';

const data = [
  { id: 1, name: 'office', address: "205 North Michigan Avenue, Suite 810", city: '', contact: "(123) 456-7890 ", email: "contact@Evara.com" },
  { id: 2, name: 'office', address: "205 North Michigan Avenue, Suite 810", city: '', contact: "(123) 456-7890 ", email: "contact@Evara.com" },
  { id: 3, name: 'office', address: "205 North Michigan Avenue, Suite 810", city: '', contact: "(123) 456-7890 ", email: "contact@Evara.com" }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    number: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send the data to a server)
    console.log(formData);
  };

  const handleClick = () => {
    window.open('https://maps.google.com/maps?q=dm%20school%20daulat%20nagar%20borivali%20east', '_blank');
  };

  return (
    <div className="container">
      {/* Map iframe */}
      <div className="map-container w-full">
        <iframe
          className="w-full h-96" // Ensures the iframe is fully responsive
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=dm%20school%20daulat%20nagar%20borivali%20east+(web%20development)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>

      {/* Contact details grid */}
      <div className="contact-details grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 my-8">
        {data.map(item => (
          <div key={item.id} className="contact-item p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p>{item.address}</p>
            <p>{item.city}</p>
            <p>{item.contact}</p>
            <p>{item.email}</p>
            <div className="button-container mt-6">
              <button
                onClick={handleClick}
                className="map-button px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-300"
              >
                Go to Map
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Message */}
          <div className="mb-4 col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
