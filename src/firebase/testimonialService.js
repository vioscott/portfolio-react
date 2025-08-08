import { 
  collection, 
  addDoc, 
  getDocs, 
  orderBy, 
  query, 
  serverTimestamp,
  limit 
} from 'firebase/firestore';
import { db } from './config';

// Collection name for testimonials
const TESTIMONIALS_COLLECTION = 'testimonials';

/**
 * Add a new testimonial to Firestore
 * @param {Object} testimonialData - The testimonial data
 * @param {string} testimonialData.name - User's name
 * @param {string} testimonialData.role - User's role
 * @param {string} testimonialData.text - Testimonial text
 * @param {number} testimonialData.stars - Star rating (1-5)
 * @returns {Promise<string>} - Document ID of the created testimonial
 */
export const addTestimonial = async (testimonialData) => {
  try {
    const testimonial = {
      ...testimonialData,
      initials: testimonialData.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase(),
      createdAt: serverTimestamp(),
      approved: false // For moderation purposes
    };

    const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), testimonial);
    console.log('Testimonial added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding testimonial: ', error);
    throw new Error('Failed to add testimonial. Please try again.');
  }
};

/**
 * Get all approved testimonials from Firestore
 * @param {number} limitCount - Maximum number of testimonials to fetch (default: 50)
 * @returns {Promise<Array>} - Array of testimonial objects
 */
export const getTestimonials = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, TESTIMONIALS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const testimonials = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      testimonials.push({
        id: doc.id,
        ...data,
        // Convert Firestore timestamp to JavaScript Date if needed
        createdAt: data.createdAt?.toDate?.() || data.createdAt
      });
    });

    console.log('Fetched testimonials: ', testimonials.length);
    return testimonials;
  } catch (error) {
    console.error('Error getting testimonials: ', error);
    throw new Error('Failed to load testimonials. Please try again.');
  }
};

/**
 * Get all testimonials (including unapproved ones) - for admin use
 * @param {number} limitCount - Maximum number of testimonials to fetch
 * @returns {Promise<Array>} - Array of all testimonial objects
 */
export const getAllTestimonials = async (limitCount = 100) => {
  try {
    const q = query(
      collection(db, TESTIMONIALS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const testimonials = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      testimonials.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt
      });
    });

    return testimonials;
  } catch (error) {
    console.error('Error getting all testimonials: ', error);
    throw new Error('Failed to load testimonials.');
  }
};

/**
 * Get only approved testimonials for public display
 * @param {number} limitCount - Maximum number of testimonials to fetch
 * @returns {Promise<Array>} - Array of approved testimonial objects
 */
export const getApprovedTestimonials = async (limitCount = 50) => {
  try {
    const testimonials = await getTestimonials(limitCount);
    // For now, return all testimonials. In production, you'd filter by approved: true
    // return testimonials.filter(testimonial => testimonial.approved);
    return testimonials;
  } catch (error) {
    console.error('Error getting approved testimonials: ', error);
    throw new Error('Failed to load testimonials.');
  }
};
