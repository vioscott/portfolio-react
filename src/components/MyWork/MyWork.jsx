import React, { useState } from 'react';
import './mywork.css';
import mywork_data from '../../assets/mywork_data';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const MyWork = () => {
  const [filter, setFilter] = useState('web');

  const filteredWorks = mywork_data.filter((work) => {
    if (filter === 'web') return work.type === 'web';
    if (filter === 'mobile') return work.type === 'mobile';
    if (filter === 'graphics') return work.type === 'graphics';
    return true;
  });

  return (
    <section className='mywork'>
      <motion.div
        className="mywork_title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1>Selected Works</h1>
      </motion.div>

      <div className="button-group">
        <button
          className={`btn ${filter === 'web' ? 'primary' : 'secondary'}`}
          onClick={() => setFilter('web')}
        >
          Web
        </button>
        <button
          className={`btn ${filter === 'mobile' ? 'primary' : 'secondary'}`}
          onClick={() => setFilter('mobile')}
        >
          Mobile
        </button>
        <button
          className={`btn ${filter === 'graphics' ? 'primary' : 'secondary'}`}
          onClick={() => setFilter('graphics')}
        >
          Graphics
        </button>
      </div>

      <motion.div
        className="mywork_container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {filteredWorks.map((work, index) => (
          <motion.div
            className="work-card"
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="work-image-container">
              <img src={work.w_img} alt={work.w_name} />
              <div className="work-overlay">
                <div className="work-overlay-content">
                  <a
                    href={work.w_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-title-link"
                  >
                    <h3>{work.w_name}</h3>
                  </a>
                  <p className="work-description">{work.w_description}</p>
                  <a
                    href={work.w_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-link-btn"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* <motion.div
        className="mywork_showmore"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>Show More</p>
      </motion.div> */}
    </section>
  );
};

export default MyWork;
