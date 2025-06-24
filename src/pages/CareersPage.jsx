import React from 'react';

const CareersPage = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4">Careers</h1>
    <p className="mb-2">We are always looking for talented and passionate people to join our growing team.</p>
    <p>Explore career opportunities and help us build the future of learning and professional networking. Send your resume to <a href="mailto:careers@artskills.com" className="text-primary underline">careers@artskills.com</a>.</p>
    <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Open Applications</h2>
      <p className="mb-2">Even if there are no current openings, we welcome applications from talented professionals. Submit your resume and cover letter, and we will review your profile and contact you when relevant opportunities arise.</p>
      <p className="font-medium">Send your resume to: <a href="mailto:careers@artskills.com" className="text-primary underline">careers@artskills.com</a></p>
    </div>
  </div>
);

export default CareersPage; 