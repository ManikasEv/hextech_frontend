import React from 'react';
import T from '../T';
import { useTranslation } from '../../contexts/TranslationContext';

const InputField = ({ field, formData, onChange, errors }) => {
  const { t, language, translations } = useTranslation();
  // Subscribing to translations ensures placeholders re-render after language switch
  void language; void translations;
  const { id, label, type, placeholder, required, rows, options } = field;

  const handleChange = (e) => onChange(e);

  const inputClasses = `w-full px-4 py-2 bg-gray-800 border ${errors?.[id] ? 'border-red-500' : 'border-gray-700'} 
    rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white`;

  const renderInputField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id} name={id} rows={rows || 4}
            placeholder={t(placeholder)}
            value={formData?.[id] || ''}
            onChange={handleChange}
            className={inputClasses}
          />
        );
      case 'select':
        return (
          <select id={id} name={id} value={formData?.[id] || ''} onChange={handleChange} className={inputClasses}>
            <option value="">{t('-- Select an option --')}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>{t(option.label)}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            id={id} name={id} type={type || 'text'}
            placeholder={t(placeholder)}
            value={formData?.[id] || ''}
            onChange={handleChange}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        <T>{label}</T>
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInputField()}
      {errors?.[id] && <p className="mt-1 text-sm text-red-500"><T>{errors[id]}</T></p>}
    </div>
  );
};

export default InputField;