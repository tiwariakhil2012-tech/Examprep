import React from 'react';

import image2 from '../assets/images/images2.jpg';
import image3 from '../assets/images/images3.jpg'
const Home = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      color: '#1c1c1c',
      padding: '0',
      margin: '0',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 60px',
      borderBottom: '1px solid #eaeaea',
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
      gap: '25px',
    },
    navLink: {
      textDecoration: 'none',
      color: '#333',
      fontWeight: '500',
    },
    registerBtn: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '25px',
      backgroundColor: '#000',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    heroSection: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '60px',
      flexWrap: 'wrap',
    },
    heroText: {
      flex: '1',
      maxWidth: '550px',
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '20px',
    },
    heroPara: {
      fontSize: '1.1rem',
      color: '#555',
      marginBottom: '30px',
    },
    stats: {
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
    },
    statBox: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      textAlign: 'center',
    },
    getStartedBtn: {
      padding: '10px 25px',
      borderRadius: '30px',
      border: '2px solid #000',
      backgroundColor: 'transparent',
      fontWeight: '500',
      cursor: 'pointer',
    },
    heroImage: {
      flex: '1',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      marginTop: '20px',
      maxWidth: '450px',
    },
    imageGrid: {
      width: '100%',
      height: '160px',
      objectFit: 'cover',
      borderRadius: '15px',
    },
    quoteSection: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: '#f9f9f9',
    },
    quote: {
      fontStyle: 'italic',
      maxWidth: '600px',
      margin: '0 auto',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <h2>Edukre</h2>
        <ul style={styles.navLinks}>
          <li><a style={styles.navLink} href="#">Home</a></li>
          <li><a style={styles.navLink} href="#">About</a></li>
          <li><a style={styles.navLink} href="#">Courses</a></li>
          <li><a style={styles.navLink} href="#">Review</a></li>
          <li><a style={styles.navLink} href="#">Our Story</a></li>
        </ul>
        <button style={styles.registerBtn}>Register</button>
      </nav>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>
            Study from home <br /> with our experts
          </h1>
          <p style={styles.heroPara}>
            Learning with Experts offers a range of courses across gardening, photography and more, delivered online.
          </p>
          <div style={styles.stats}>
            <div style={styles.statBox}>
              <div>Total Students</div>
              <h3>12K</h3>
            </div>
            <button style={styles.getStartedBtn}>Get Started</button>
          </div>
        </div>

        {/* Image Collage */}
        <div style={styles.heroImage}>
          <img src={image2} alt="student1" style={styles.imageGrid} />
          <img src={image2} alt="student2" style={styles.imageGrid} />
          <img src={image3} alt="student3" style={styles.imageGrid} />
          <img src="https://via.placeholder.com/200x160?text=Student+4" alt="student4" style={styles.imageGrid} />
        </div>
      </section>

      {/* Quote Section */}
      <section style={styles.quoteSection}>
        <h4>This is Future Learning.</h4>
        <p>Learn online with world-class universities and industry experts.</p>
        <blockquote style={styles.quote}>
          “You only have to know one thing — you can learn anything, anywhere, to discover yourself.”
        </blockquote>
      </section>
    </div>
  );
};

export default Home;



