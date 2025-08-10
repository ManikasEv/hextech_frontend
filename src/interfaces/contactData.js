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

// Contact information items
export const contactInfoItems = [
    {
        id: 'location',
        title: 'Our Location',
        content: 'Brüderhofweg 16, 8057 Zürich',
        iconType: 'location'
    },
    {
        id: 'phone',
        title: 'Phone Number',
        content: '+41 78 33 17 777',
        iconType: 'phone'
    },
    {
        id: 'email',
        title: 'Email Address',
        content: 'info@hextech-it.ch',
        iconType: 'email'
    }
]; 