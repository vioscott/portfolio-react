import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./testimonials.css";
import { addTestimonial, getApprovedTestimonials } from "../../firebase/testimonialService";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Testimonials = () => {
  const [showForm, setShowForm] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    stars: 5,
  });

  // Load testimonials from Firestore on component mount
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const firestoreTestimonials = await getApprovedTestimonials();

        // Combine Firestore testimonials with local data (fallback)
        const allTestimonials = [...firestoreTestimonials];
        setTestimonials(allTestimonials);
      } catch (err) {
        console.error('Error loading testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const handleAddTestimonial = () => setShowForm(!showForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stars" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return; // Prevent double submission

    try {
      setSubmitting(true);
      setError(null);

      // Add testimonial to Firestore
      const testimonialData = {
        text: formData.text,
        name: formData.name,
        role: formData.role,
        stars: formData.stars,
      };

      const docId = await addTestimonial(testimonialData);

      // Create local testimonial object for immediate UI update
      const newTestimonial = {
        id: docId,
        ...testimonialData,
        initials: formData.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase(),
        createdAt: new Date(),
        approved: false
      };

      // Add to local state for immediate feedback
      setTestimonials([newTestimonial, ...testimonials]);

      // Reset form
      setFormData({ name: "", role: "", text: "", stars: 5 });
      setShowForm(false);

      // Show success message
      alert("Thank you for your testimonial! It has been submitted successfully.");

    } catch (err) {
      console.error('Error submitting testimonial:', err);
      setError('Failed to submit testimonial. Please try again.');
      alert("Sorry, there was an error submitting your testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // const [testimonials, setTestimonials] = useState([]);

  // useEffect(() => {
  //   fetch('/api/testimonials')
  //     .then(res => res.json())
  //     .then(data => setTestimonials(data))
  //     .catch(err => console.error('Failed to load testimonials', err));
  // }, []);

  return (
    <section className="testimonial-section" aria-label="Testimonials">
      <h2 className="testimonial-title">What People Say</h2>
      <p className="testimonial-subtitle">
        Voices from clients, collaborators, and friends who have experienced my work.
      </p>



      <div className="testimonial-box">
        <div className="testimonial-header">
          <h3>🗨️ Testimonials</h3>
          <button
            className="add-button"
            onClick={handleAddTestimonial}
            aria-expanded={showForm}
            aria-controls="testimonial-form"
            disabled={submitting}
          >
            {showForm ? "✖ Cancel" : "+ Add Testimonial"}
          </button>
        </div>

        {error && (
          <div className="error-message" style={{
            color: '#e53e3e',
            background: '#fed7d7',
            padding: '8px 12px',
            borderRadius: '4px',
            margin: '10px 0',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <motion.form
              id="testimonial-form"
              className="testimonial-form"
              onSubmit={handleSubmit}
              aria-live="polite"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={formVariants}
            >
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                name="role"
                placeholder="Your Role (e.g. Client, Colleague)"
                value={formData.role}
                onChange={handleChange}
                required
              />

              <label htmlFor="text">Testimonial</label>
              <textarea
                id="text"
                name="text"
                placeholder="Your Testimonial"
                value={formData.text}
                onChange={handleChange}
                required
              />

              <label htmlFor="stars">
                Rating:
                <select
                  id="stars"
                  name="stars"
                  value={formData.stars}
                  onChange={handleChange}
                >
                  {[5, 4, 3, 2, 1].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="btn submit"
                disabled={submitting}
                style={{
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div
          className="testimonial-list"
          role="list"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {loading ? (
            <div className="loading-message" style={{
              textAlign: 'center',
              padding: '20px',
              color: '#666',
              fontSize: '16px'
            }}>
              Loading testimonials...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="no-testimonials" style={{
              textAlign: 'center',
              padding: '20px',
              color: '#666',
              fontSize: '16px'
            }}>
              No testimonials yet. Be the first to share your experience!
            </div>
          ) : (
            testimonials.map(({ id, text, name, role, initials, stars }) => (
            <motion.article
              className="testimonial-card"
              key={id}
              role="listitem"
              tabIndex={0}
              aria-label={`Testimonial from ${name}, ${stars} star rating`}
              variants={cardVariants}
            >
              <p className="quote">“{text}”</p>
              <div className="stars" aria-hidden="true">
                <span className="filled-stars">{"★".repeat(stars)}</span>
                <span className="empty-stars">{"☆".repeat(5 - stars)}</span>
              </div>
              <div className="user-info">
                <div className="avatar" aria-hidden="true">{initials}</div>
                <div>
                  <strong>{name}</strong>
                  <div className="role">{role}</div>
                </div>
              </div>
            </motion.article>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
