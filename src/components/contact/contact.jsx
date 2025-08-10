import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./contact.css";
import Qr_image from "../../assets/QR_code.svg";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaMedium,
} from "react-icons/fa";
import emailjs from "emailjs-com";

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
};

const socialCardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15 },
  }),
};

const Contact = () => {
  const [showSupport, setShowSupport] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cra1ey8",
        "template_ybql4zo",
        e.target,
        "9szvniukc06hlrNxo"
      )
      .then(
        (result) => {
          console.log("Message sent:", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("Error:", error.text);
          alert("Something went wrong. Try again.");
        }
      );

    e.target.reset(); // Clear the form
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact Me</h2>
      <p className="contact-subtitle">
        Reach out via form, social media, or support platforms.
      </p>

      <div className="button-group">
        <button
          className={`btn ${!showSupport ? "primary" : "secondary"}`}
          onClick={() => setShowSupport(false)}
        >
          📧 Contact Me
        </button>
        <button
          className={`btn ${showSupport ? "primary" : "secondary"}`}
          onClick={() => setShowSupport(true)}
        >
          🤝 Support Me
        </button>
      </div>

      <AnimatePresence exitBeforeEnter>
        {showSupport ? (
          <motion.div
            className="support-section"
            key="support"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <h3>Support My Work</h3>
            <p>
              If you like what I do and want to support my journey, you can scan
              the QR code below to donate or show appreciation!
            </p>

            <img
              src={Qr_image}
              alt="Support QR Code"
              className="qr-code"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <motion.div
            className="contact-grid"
            key="contact"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className="social-links">
              {[{
                platform: "GitHub",
                description: "Explore my code & projects",
                icon: <FaGithub />,
                link: "https://github.com/vioscott",
              },
              {
                platform: "LinkedIn",
                description: "Let's connect professionally",
                icon: <FaLinkedin />,
                link: "https://www.linkedin.com/in/victor-onyedikachi",
              },
              {
                platform: "Medium",
                description: "My thoughts and writings on UI/UX",
                icon: <FaMedium />,
                link: "https://medium.com/vioscott",
              },
              {
                platform: "Instagram",
                description: "My visual journal & life updates",
                icon: <FaInstagram />,
                link: "https://instagram.com/vio_scott",
              },
              {
                platform: "Twitter",
                description: "Random thoughts & dev tweets",
                icon: <FaTwitter />,
                link: "https://twitter.com/thevioscott",
              }].map((social, i) => (
                <motion.a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  key={social.platform}
                  variants={socialCardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <div className="social-icon">{social.icon}</div>
                  <div className="social-text">
                    <strong>{social.platform}</strong>
                    <p>{social.description}</p>
                  </div>
                  <span className="arrow">›</span>
                </motion.a>
              ))}
            </div>

            <div className="message-form">
              <h3 className="form-title">📨 Send Me a Message</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                ></textarea>
                <button type="submit" className="btn submit">
                  Send &gt;
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
