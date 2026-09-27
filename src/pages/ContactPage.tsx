import { useState } from 'react';

interface ContactFormValues {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: ContactFormValues = {
  fullName: '',
  subject: '',
  email: '',
  message: '',
};

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }
  if (values.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }
  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setSubmitted(false);
    // Re-validate live only for fields that already show an error
    if (errors[name as keyof ContactFormValues]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof ContactFormValues;
    const fieldError = validate(values)[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Contact form submitted:', values);
      setValues(initialValues);
      setSubmitted(true);
    }
  };

  const fieldClass = (field: keyof ContactFormValues) =>
    `border w-full p-2 text-white ${errors[field] ? 'border-red-500' : ''}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2>Contact Us</h2>
      <p>Get in touch with us here.</p>
      <form
        className="flex flex-col border w-full max-w-md gap-4 p-4 bg-gray-800 text-white"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName">
            <span className="text-red-500">*</span>Full Name:
          </label>
          <input
            className={fieldClass('fullName')}
            type="text"
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              className="text-red-400 text-sm"
            >
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="subject">
            <span className="text-red-500">*</span>Subject:
          </label>
          <input
            className={fieldClass('subject')}
            type="text"
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" role="alert" className="text-red-400 text-sm">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">
            <span className="text-red-500">*</span>Email:
          </label>
          <input
            className={fieldClass('email')}
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-red-400 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message">
            <span className="text-red-500">*</span>Message:
          </label>
          <textarea
            className={fieldClass('message')}
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-red-400 text-sm">
              {errors.message}
            </p>
          )}
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          type="submit"
        >
          Send
        </button>

        {submitted && (
          <p role="status" className="text-green-400">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
}

export default ContactPage;
