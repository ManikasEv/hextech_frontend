import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactFormFields, contactInfoItems } from '../interfaces/contactData';
import { validateContactForm } from '../interfaces/formValidation';
import InputField from './form/InputField';
import ContactInfo from './form/ContactInfo';

const Contact = () => {
    // Form state management
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Event handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const { errors: validationErrors, isValid } = validateContactForm(formData);
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Web3Forms API integration
            const formDataToSend = new FormData();
            
            // Add your access key - replace with your actual key from web3forms.com
            formDataToSend.append('access_key', import.meta.env.VITE_WEB3JS_API_KEY);
            
            // Add form fields
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('subject', formData.subject);
            formDataToSend.append('message', formData.message);
            formDataToSend.append('from_name', 'HEXTECH Contact Form');
            
            // Botcheck for spam prevention (hidden field)
            formDataToSend.append('botcheck', '');
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Success response
                setSubmitStatus({
                    success: true,
                    message: 'Thank you for your message! We will be in touch soon.'
                });
                
                // Reset form
                setFormData({ name: '', email: '', message: '', subject: '' });
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: error.message || 'Something went wrong. Please try again later.'
            });
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variant
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <motion.section 
            id="contact" 
            className="py-20 bg-secondary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
        >
            <div className="container mx-auto ">
                <h2 className="text-4xl font-bold text-center mb-4 text-primary">Propose Your Project</h2>
                <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
                    Share your vision with us, and let's transform your ideas into innovative digital solutions. 
                    Tell us about your project requirements, and we'll get back to you with a tailored plan.
                </p>
                
                {/* Contact Form */}
                <div className="max-w-3xl mx-auto bg-secondary shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        {submitStatus && (
                            <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-800/30 text-green-400' : 'bg-red-800/30 text-red-400'}`}>
                                {submitStatus.message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            {/* Hidden Web3Forms fields */}
                            <input type="hidden" name="access_key" value="c5b89214-2409-4e41-8c82-bb904d800ddf" />
                            <input type="hidden" name="from_name" value="HEXTECH Contact Form" />
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                            
                            {/* Name and Email fields (2 columns on desktop) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {contactFormFields.slice(0, 2).map(field => (
                                    <InputField 
                                        key={field.id} 
                                        field={field} 
                                        formData={formData}
                                        onChange={handleChange}
                                        errors={errors}
                                    />
                                ))}
                            </div>
                            
                            {/* Subject and Message fields (full width) */}
                            {contactFormFields.slice(2).map(field => (
                                <InputField 
                                    key={field.id} 
                                    field={field} 
                                    formData={formData}
                                    onChange={handleChange}
                                    errors={errors}
                                />
                            ))}
                            
                            {/* Submit button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                {/* Contact information */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {contactInfoItems.map(item => (
                        <ContactInfo key={item.id} item={item} />
                    ))}
                </div>
                <div className="border-b-2 border-gray-700 w-full"></div>
            </div>
        </motion.section>
    );
};

export default Contact;
