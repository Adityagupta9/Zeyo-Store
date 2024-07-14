import React from 'react';
import Layout from '../components/layout/Layout';
import '../../src/style/policy.css';

const Policy = () => {
  return (
    <Layout title={"Zeyo-Policy"}>
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p className="privacy-policy-updated">Last updated: [Date]</p>

        <section className="privacy-section">
          <h2>Introduction</h2>
          <p>Welcome to Zeyo Store. We value your privacy and are committed to protecting your personal data. This policy explains how we handle your information when you visit our site.</p>
        </section>

        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <p>We collect personal information like name, email, and payment details to process orders and improve our services.</p>
        </section>

        <section className="privacy-section">
          <h2>Use of Information</h2>
          <p>Your information is used to process transactions, improve our website, and communicate with you.</p>
        </section>

        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about this policy, please contact us at support@zeyostore.com.</p>
        </section>
      </div>
    </Layout>
  );
}

export default Policy;
