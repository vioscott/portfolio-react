import React from "react";
import "./hero.css";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";
import profile_image from "../../assets/profile-image-black.jpg";
import resume_image from "../../assets/resume.png"
import Typewriter from "./typewriter"; // import the typewriter

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          Hi, I'm Victor Onyedikachi
        </motion.h1>

        {/* Replace motion.h2 with Typewriter */}
        <Typewriter text="A  Full Stack Developer" />

        <motion.p className="hero-description" variants={itemVariants}>
          I specialize in building exceptional digital experiences. With a passion for coding and a keen eye for design,
          I create web applications that are not only functional but also visually appealing. Let's bring your ideas to life!
        </motion.p>

        <motion.div className="hero-socials" variants={itemVariants}>
          <p className="hero-description">Follow Me on</p>
          <a href="https://github.com/vioscott" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/victor-onyedikachi" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://twitter.com/thevioscott" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://instagram.com/vio_scott" aria-label="Instagram"><FaInstagram /></a>
        </motion.div>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <button className="btn-primary">
            <HiOutlineExternalLink /> Explore My Work
          </button>
          {/* <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <FiDownload /> View My Resume
          </a> */}
          <a href={resume_image} download className="btn-outline">
            <FiDownload /> Download My Resume
          </a>



        </motion.div>

        <motion.div className="hero-tags" variants={itemVariants}>
          <div>2 Years Experience</div>
          <div>Javascript</div>
          <div>3 Projects</div>
          <div>MongoDB</div>
        </motion.div>
      </motion.div>

      <div className="hero-image-wrapper">
        <img
          src={profile_image}
          alt="Victor Onyedikachi profile"
          className="hero-image"
        />
        <SiReact className="tech-icon react-icon" />
        <SiJavascript className="tech-icon js-icon" />
        <SiTailwindcss className="tech-icon tailwind-icon" />
        <SiGit className="tech-icon git-icon" />
      </div>
    </section>
  );
};

export default Hero;
