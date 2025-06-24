import React from 'react';

const AboutPage = () => (
  <div className="container mx-auto px-4 py-12 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4">About Us</h1>
    <p className="mb-2">Art Skills is dedicated to connecting skilled professionals, teachers, tutors, and craftsmen with learners and clients worldwide.</p>
    <p className="mb-2">Our mission is to empower people to share knowledge, grow their network, and unlock new opportunities through collaboration and learning.</p>
    <p>Meet the team behind Art Skills — passionate about education, technology, and community building.</p>
    <div className="mt-10 p-4 bg-secondary/30 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Support the Platform</h2>
      <p className="mb-2">Art Skills thrives thanks to the support of our community. If you would like to help us grow, you can contribute by making a donation or becoming a sponsor.</p>
      <p className="mb-2">Crypto donations and Stripe payments will be available soon.</p>
      <p className="font-medium">For partnership or sponsorship, contact: <a href="mailto:sponsor@artskills.com" className="text-primary underline">sponsor@artskills.com</a></p>
    </div>
  </div>
);

export default AboutPage; 