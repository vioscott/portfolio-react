import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "./footer.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <motion.div className="footer-main" variants={fadeInUp}>
        {/* Branding */}
        <motion.div className="footer-brand" variants={fadeInUp}>
          <h2 className="footer-logo">&lt;/&gt; Victor Onyedikachi</h2>
          <p>
            FullStack Developer specializing in UI/UX, modern web technologies,
            and building smooth digital experiences with clean code & creative
            flow.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div className="footer-nav" variants={fadeInUp}>
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </motion.div>

        {/* Social Icons */}
        <motion.div className="footer-social" variants={fadeInUp}>
          <h3>Find Me Online</h3>
          <div className="social-icons">
            {[{
              icon: <FaGithub />,
              url: "https://github.com/vioscott",
            },{
              icon: <FaLinkedin />,
              url: "https://www.linkedin.com/in/victor-onyedikachi",
            },{
              icon: <FaTwitter />,
              url: "https://twitter.com/thevioscott",
            },{
              icon: <FaInstagram />,
              url: "https://instagram.com/vio_scott",
            }].map(({ icon, url }, idx) => (
              <motion.a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#00bfff" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="social-icon-link"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div className="footer-newsletter" variants={fadeInUp}>
          <h3>Subscribe to Newsletter</h3>
          <p>Stay updated with my latest projects and articles.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="subscribe-btn"
            >
              Subscribe ➤
            </motion.button>
          </form>

          {submitted && (
            <motion.p
              className="success-msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Thanks for subscribing!
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        className="footer-bottom"
        variants={fadeInUp}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Sitemap</a>
        </div> */}
        <p>© 2025 VioScott. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
