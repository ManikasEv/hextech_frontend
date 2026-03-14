/**
 * Validates the entire form data
 * @param {object} formData - The current form values
 * @returns {object} - Object with errors and isValid flag
 */
export const validateContactForm = (formData) => {
    const newErrors = {};
    let isValid = true;

    // Validate name
    if (!formData.name?.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
    }

    // Validate email
    if (!formData.email?.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        isValid = false;
    }

    // Validate subject
    if (!formData.subject?.trim()) {
        newErrors.subject = 'Subject is required';
        isValid = false;
    }

    // Validate message
    if (!formData.message?.trim()) {
        newErrors.message = 'Message is required';
        isValid = false;
    } else if (formData.message.length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
        isValid = false;
    }

    return { errors: newErrors, isValid };
}; 