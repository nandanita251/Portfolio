import emailjs from '@emailjs/browser';

// TODO: Replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_hnw42j8';
const TEMPLATE_ID = 'template_itbofom';
const PUBLIC_KEY = 'NwTEz5m945eiidoA0';

/**
 * Sends an email using EmailJS.
 * @param {Object} formData - The form data containing name, email, and message.
 * @returns {Promise} - Resolves on success, rejects on failure.
 */
export const sendEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: 'Nandanita', // Explicitly setting the recipient name
      message: formData.message,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};