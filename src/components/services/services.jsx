import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Services_Data from '../../assets/services_data';
import { FaLongArrowAltRight } from 'react-icons/fa';
import './services.css';

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Services = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedId((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="services" className="services">
      <motion.div
        className="services_title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1>My Services</h1>
      </motion.div>

      <motion.div
        className="services-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {Services_Data.map((service, index) => {
          const isExpanded = expandedId === index;
          return (
            <motion.div
              className={`services_card ${isExpanded ? 'expanded' : ''}`}
              key={index}
              variants={cardVariants}
              layout
            >
              <h3>{service.s_no}</h3>
              <h2>{service.s_name}</h2>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p>{service.s_description}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isExpanded && (
                <p className="truncated-description">
                  {service.s_description}
                </p>
              )}

              <div className="services_readmore" onClick={() => toggleExpand(index)}>
                <p>{isExpanded ? 'Read Less' : 'Read More'}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Services;
