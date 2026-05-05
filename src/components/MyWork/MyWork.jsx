import React, { useState } from 'react';
import './mywork.css';
import mywork_data from '../../assets/mywork_data';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const MyWork = () => {
  const [filter, setFilter] = useState('web');

  const filteredWorks = mywork_data.filter((work) => {
    if (filter === 'all') return true;
    return work.type === filter;
  });

  return (
    <section id="mywork" className="mywork">
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
        viewport={{ once: true, amount: 0.2 }}
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work, index) => (
            <motion.div
              className="work-card"
              key={`${work.w_name}-${index}`}
              variants={itemVariants}
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.02 }}
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
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default MyWork;
