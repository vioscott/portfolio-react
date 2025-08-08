import React from 'react';
import './services.css';
import Services_Data from '../../assets/services_data';
import { motion } from 'framer-motion';
import { FaLongArrowAltRight } from "react-icons/fa";

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
  return (
    <section id='services' className='services'>
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
        {Services_Data.map((service, index) => (
          <motion.div className='services_card' key={index} variants={cardVariants}>
            <h3>{service.s_no}</h3>
            <h2>{service.s_name}</h2>
            <p>{service.s_description}</p>
            <div className='services_readmore'>
              <p>Read More</p>
              <FaLongArrowAltRight className='readmore_arrow'/>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
