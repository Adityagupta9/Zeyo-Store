import React from 'react';
import Layout from '../components/layout/Layout';
import '../../src/style/about.css';

const About = () => {
  return (
    <Layout title={"Zeyo-About"}>
      <div className="about-container">
        <h1 className="about-title">About Zeyo Store</h1>
        <div className="about-content">
          <p>Zeyo Store is your one-stop destination for all your shopping needs. Founded in 2021, we have quickly grown to become a trusted name in the e-commerce industry.</p>
          
          <h2>Our Mission</h2>
          <p>At Zeyo Store, our mission is to provide high-quality products at affordable prices while ensuring an exceptional shopping experience for our customers. We believe in the power of customer satisfaction and strive to meet and exceed your expectations every time you shop with us.</p>
          
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> We are committed to offering only the best products, carefully curated to meet our high standards.</li>
            <li><strong>Customer Service:</strong> Our dedicated customer service team is here to help you with any questions or concerns.</li>
            <li><strong>Affordability:</strong> We believe that quality products should be accessible to everyone, which is why we offer competitive pricing on all our items.</li>
            <li><strong>Innovation:</strong> We continuously update our inventory to include the latest trends and innovations in the market.</li>
          </ul>
          
          <h2>Why Shop With Us?</h2>
          <p>We understand that you have many choices when it comes to online shopping. Here are just a few reasons why you should choose Zeyo Store:</p>
          <ul>
            <li>Extensive range of products across various categories</li>
            <li>Fast and reliable shipping</li>
            <li>Secure online transactions</li>
            <li>Easy returns and exchanges</li>
            <li>Dedicated customer support</li>
          </ul>

          <p>Thank you for choosing Zeyo Store. We look forward to serving you!</p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
