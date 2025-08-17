import React, { useState } from 'react';
import './about.css';
import { FiDownload } from 'react-icons/fi';
import {
  FaEnvelope, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaBirthdayCake,
  FaCertificate, FaQuestionCircle, FaLightbulb, FaInfoCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import profile_image from '../../assets/profile-image-black.jpg';
import resume_image from "../../assets/resume.png"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const About = () => {
  const [showExperience, setShowExperience] = useState(false);

  const handleExperienceClick = () => {
    setShowExperience(!showExperience);
  };
 
  const techSkills = [
  { name: "HTML & CSS", level: "Advanced" },
  { name: "JavaScript", level: "Advanced" },
  { name: "React.js", level: "Advanced" },
  { name: "Next.js", level: "Intermediate" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Express.js", level: "Intermediate" },
  { name: "MongoDB", level: "Intermediate" },
  { name: "PostgreSQL", level: "Beginner" },
  { name: "Git & GitHub", level: "Advanced" },
  { name: "BootStrap", level: "Advanced" },
  { name: "Firebase", level: "Beginner" }
];


  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.h2
          className="about-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          About Me
        </motion.h2>

        <motion.p
          className="about-subtitle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          I'm a passionate fullstack developer with a knack for creating responsive and interactive user interfaces.
        </motion.p>

        <div className="button-group">
          <button
            className={`btn ${!showExperience ? 'primary' : 'secondary'}`}
            onClick={() => setShowExperience(false)}
          >
            About Me
          </button>
          <button
            className={`btn ${showExperience ? 'primary' : 'secondary'}`}
            onClick={() => setShowExperience(true)}
          >
            My Experiences
          </button>
        </div>


        <div className="about-grid">
          {/* Profile Image */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={profile_image} alt="Profile" className="about-image" />
          </motion.div>

          {showExperience ? (
            <motion.div
              className="experience-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="about-heading">
                <FaCertificate /> Tech Stack & Proficiency
              </h3>
              <div className="tech-skill-list">
                {techSkills.map((skill, index) => (
                  <div key={index} className="tech-skill">
                    <div className="tech-skill-name">{skill.name}</div>
                    <div className={`tech-skill-level ${skill.level.toLowerCase()}`}>
                      {skill.level}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="about-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="about-block">
                <h3 className="about-heading">
                  <span className="title-icon">
                    <FaQuestionCircle />
                  </span>
                  Who Am I?
                </h3>
                <p>
                  I'm a fullstack developer that crafts responsive, interactive and clean UIs.
                  With a background in Informatics Engineering, I blend design sense with technical knowledge.
                </p>
              </div>

              <div className="about-block">
                <h3 className="about-heading">
                  <span className="title-icon">
                    <FaLightbulb />
                  </span>
                  My Approach
                </h3>
                <p>
                  I focus on user-centered design, performance and accessibility, always evolving
                  with modern tech to deliver seamless digital experiences.
                </p>
              </div>

              <div className="about-block">
                <h3 className="about-heading">
                  <FaInfoCircle />
                  Personal Info
                </h3>
                <div className="personal-info-grid">
                  <div><span className="icon"><FaUser /></span><strong>Name:</strong> Victor Onyedikachi</div>
                  <div><span className="icon"><FaBirthdayCake /></span><strong>D.O.B:</strong> June 20 2005</div>
                  <div><span className="icon"><FaMapMarkerAlt /></span><strong>Place of Birth:</strong> Nigeria</div>
                  <div><span className="icon"><FaEnvelope /></span><strong>Email:</strong> vionyedikachi@gmail.com</div>
                  <div><span className="icon"><FaPhoneAlt /></span><strong>Phone:</strong> +2349037583286</div>
                  <div><span className="icon"><FaCertificate /></span><strong>Education:</strong> University of Nigeria Nsukka</div>
                  <div><span className="icon"><FaCertificate /></span><strong>CGPA:</strong> 3.54</div>
                </div>

                <div className="download-button-wrapper">
                  <a href={resume_image} download className="btn-outline">
                    <FiDownload /> Download My Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
