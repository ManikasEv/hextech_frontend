// Contact form fields definition
export const contactFormFields = [
    {
        id: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true
    },
    {
        id: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true
    },
    {
        id: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'What is this regarding?',
        required: true
    },
    {
        id: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Enter your message here...',
        required: true,
        rows: 5
    }
]; 