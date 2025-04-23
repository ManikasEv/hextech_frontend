import React from 'react';
import ContactIcon from './ContactIcons';

// A reusable component for displaying contact information
const ContactInfo = ({ item }) => {
  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <ContactIcon iconType={item.iconType} />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
      <p className="text-gray-300">{item.content}</p>
    </div>
  );
};

export default ContactInfo; 