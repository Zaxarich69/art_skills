import React from 'react';

const HelpPage = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4">Help Center</h1>
    <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
    <ul className="list-disc ml-6 space-y-2">
      <li><b>How do I find a professional?</b> Use the Explore page to browse and search for specialists by category or skill.</li>
      <li><b>How do I book a session?</b> Click "Book a Session" on a professional's profile and follow the instructions.</li>
      <li><b>How do I contact support?</b> Email us at <a href="mailto:contact@artskills.com" className="text-primary underline">contact@artskills.com</a>.</li>
    </ul>
  </div>
);

export default HelpPage; 