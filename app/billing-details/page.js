'use client'
import { useState } from 'react';
import Image from 'next/image';
import Alert from '@UTILS/alert';
import Link from 'next/link';
import LoaderFullPage from '@UTILS/loader';

const formFields = [
    {
        groupName: 'Practice Information',
        fields: [
            { fieldName: 'Practice Name', dataType: 'text', regexTest: '' },
            { fieldName: 'Practice Phone Number (Ph#)', dataType: 'phone', regexTest: /^[\(\)\d -]+$/ },
            { fieldName: 'Practice Fax Number', dataType: 'phone', regexTest: /^[\(\)\d -]+$/ },
            { fieldName: 'Practice Address (Service/Billing/Mailing)', dataType: 'text', regexTest: '' }
        ],
    },
    {
        groupName: 'Provider Information',
        fields: [
            { fieldName: 'Tax Identification Number (Tax ID)', dataType: 'text', regexTest: /^\d{2}-\d{3}-\d{4}$/ },
            { fieldName: 'Provider Name', dataType: 'text', regexTest: '' },
            { fieldName: 'Date of Birth', dataType: 'date', regexTest: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ },
            { fieldName: 'Joining Date / Start Date of Group', dataType: 'date', regexTest: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ },
            { fieldName: 'Social Security Number (SSN#)', dataType: 'text', regexTest: /^\d{3}-\d{2}-\d{4}$/ },
            { fieldName: 'Group National Provider Identifier (NPI)', dataType: 'text', regexTest: /^\d{10}$/ },
            { fieldName: 'Individual NPI', dataType: 'text', regexTest: /^\d{10}$/ },
            { fieldName: 'Provider Specialty', dataType: 'text', regexTest: '' },
            { fieldName: 'Provider Degree', dataType: 'text', regexTest: '' }
        ],
    },
    {
        groupName: 'Login Information',
        fields: [
            { fieldName: 'CAQH Login', dataType: 'text', regexTest: '' },
            { fieldName: 'CAQH Password', dataType: 'password', regexTest: '' },
            { fieldName: 'PECOS Login', dataType: 'text', regexTest: '' }
        ],
    },
    {
        groupName: 'Contact Information',
        fields: [
            { fieldName: 'Provider Email', dataType: 'email', regexTest: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            { fieldName: 'Office Manager/Primary Contact Person', dataType: 'text', regexTest: '' },
            { fieldName: 'Office Manager/Primary Contact Person Number', dataType: 'phone', regexTest: /^[\(\)\d -]+$/ }
        ],
    },
    {
        groupName: 'Additional Information',
        fields: [
            { fieldName: 'Clinical Laboratory Improvement Amendments (CLIA) Certification (If Available)', dataType: 'text', regexTest: '' }
        ],
    }
];

const ConsultationForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [alert, setAlert] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);

    const handleChange = (key, value) => {
        const groupName = formFields[activeStep].groupName;
        setFormData(prev => ({
            ...prev,
            [groupName]: {
                ...prev[groupName],
                [key]: value,
            }
        }));
    };

    const validateStep = () => {
        const group = formFields[activeStep];
        const data = formData[group.groupName] || {};
        const failed = [];

        for (const field of group.fields) {
            const value = data[field.fieldName]?.toString() || '';

            // Check if empty
            if (!value.trim()) {
                failed.push(field.fieldName);
                continue;
            }

            // Validate regex if exists
            if (field.regexTest) {
                const regex = field.regexTest instanceof RegExp ? field.regexTest : new RegExp(field.regexTest);
                if (!regex.test(value.trim())) {
                    failed.push(field.fieldName);
                }
            }
        }

        setErrors(failed);

        if (failed.length === 0) {
            if (activeStep < formFields.length - 1) {
                setActiveStep(activeStep + 1);
            }
            return true;
        }

        return false;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Validate last step before submit
        if (!validateStep()) return;

        setSubmitting(true);

        try {
            const response = await fetch('/my-api/billing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setAlert({ message: 'Form submitted successfully!', type: 'success' });
                setFormData({});
                setActiveStep(0);
            } else {
                setAlert({ message: 'Internal Server Error', type: 'alert' });
            }
        } catch (error) {
            setAlert({ message: 'Error submitting form.', type: 'alert' });
        } finally {
            setSubmitting(false);
        }
    };

    function LinearProgressWithLabel() {
        const progressPercent = Math.ceil(((activeStep + 1) / formFields.length) * 100);
        return (
            <section className="flex w-screen bg-gray-100 h-2 fixed top-0">
                <div className="bg-primary" style={{ width: `${progressPercent}%` }} />
                <p className="tracking-wide font-sans text-sm absolute right-5 top-5">{`${activeStep + 1}/${formFields.length} steps`}</p>
            </section>
        );
    }

    return (
        <main className="px-4 py-8 flex flex-col items-center justify-center min-h-screen w-screen max-w-full">
            {submitting && <LoaderFullPage />}
            <Link href="/" className="md:absolute top-5 left-5">
                <Image
                    className="mx-auto h-fit w-36"
                    src="/mbmb-black.png"
                    width={250}
                    height={180}
                    alt="Medical Billing Miami Beach | Company | Medical Revenue Management | Healthcare Coding"
                />
            </Link>

            <h1 className="text-4xl font-semibold text-center my-14 lg:my-20">Medical Billing Miami Beach</h1>

            <form onSubmit={handleSubmit} className="mx-auto mt-10 font-sans w-full max-w-4xl">
                <FormSection
                    key={activeStep + 'Group'}
                    errors={errors}
                    {...formFields[activeStep]}
                    handleChange={handleChange}
                    formData={formData[formFields[activeStep].groupName] || {}}
                />

                <footer className="flex flex-col-reverse sm:flex-row items-center justify-evenly sm:space-x-2 my-6">
                    <button
                        type="button"
                        className={`border border-primary w-full py-2 rounded-md mx-auto max-w-sm my-1 sm:my-4 tracking-wider ${activeStep === 0 ? 'grayscale cursor-not-allowed' : ''}`}
                        onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
                        disabled={activeStep === 0}
                    >
                        Back
                    </button>

                    <button
                        type={activeStep === formFields.length - 1 ? 'submit' : 'button'}
                        className="bg-primary text-white w-full py-2 rounded-md mx-auto max-w-sm my-1 sm:my-4 tracking-wider"
                        onClick={() => {
                            if (activeStep === formFields.length - 1) {
                                // On final step, submit the form
                                handleSubmit(new Event('submit'));
                            } else {
                                validateStep();
                            }
                        }}
                    >
                        {activeStep === formFields.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </footer>
            </form>

            <LinearProgressWithLabel />

            {alert && <Alert {...alert} setAlert={setAlert} />}
        </main>
    );
};

export default ConsultationForm;

const InputField = ({ fieldName, dataType, value, onChange, error }) => {
    const inputProps = {
        className: `min-w-96 w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-500 text-rose-700' : 'border-gray-300'
            }`,
        value: value || '',
        name: fieldName,
        placeholder: fieldName,
        onChange: e => onChange(e.target.name, e.target.value),
        autoComplete: 'off',
    };

    let inputType = 'text';
    switch (dataType) {
        case 'password':
            inputType = 'password';
            break;
        case 'phone':
            inputType = 'tel';
            break;
        case 'email':
            inputType = 'email';
            break;
        case 'date':
            inputType = 'date';
            break;
        default:
            inputType = 'text';
    }

    return (
        <>
            <input {...inputProps} type={inputType} aria-invalid={error ? 'true' : 'false'} />
            {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                    Please enter a valid {fieldName.toLowerCase()}.
                </p>
            )}
            {!error && (
                <p className="mt-1 text-sm text-gray-500">
                    {/* You can customize helper text here for each field if needed */}
                    {getHelperText(fieldName)}
                </p>
            )}
        </>
    );
};

// Example helper text function — you can expand this to customize per field as needed
const getHelperText = fieldName => {
    switch (fieldName) {
        case 'Practice Phone Number (Ph#)':
        case 'Practice Fax Number':
        case 'Office Manager/Primary Contact Person Number':
            return 'Format: (xxx) xxx-xxxx or digits with spaces/dashes.';
        case 'Tax Identification Number (Tax ID)':
            return 'Format: XX-XXX-XXXX.';
        case 'Social Security Number (SSN#)':
            return 'Format: XXX-XX-XXXX.';
        case 'Provider Email':
            return 'Enter a valid email address.';
        case 'Group National Provider Identifier (NPI)':
        case 'Individual NPI':
            return 'Must be a 10-digit number.';
        case 'Date of Birth':
        case 'Joining Date / Start Date of Group':
            return 'Use YYYY-MM-DD format.';
        default:
            return '';
    }
};

const FormSection = ({ groupName, fields, handleChange, errors, formData }) => {
    return (
        <section
            className={`mb-6 shadow rounded-lg p-4 bg-white grid gap-x-4 min-w-fit ${fields.length > 4 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                }`}
        >
            <h2 className={`text-lg font-bold text-primary mb-4 ${fields.length > 4 ? 'lg:col-span-2' : ''}`}>{groupName}</h2>
            {fields.map(field => {
                const showError = errors && errors.includes(field.fieldName);
                return (
                    <div key={field.fieldName} className="mb-4">
                        <label
                            htmlFor={field.fieldName}
                            className={`block mb-2 text-sm font-medium text-gray-700 ${showError ? 'border-red-500 text-rose-700' : ''}`}
                        >
                            {field.fieldName}
                        </label>
                        <InputField
                            {...field}
                            value={formData[field.fieldName]}
                            error={showError}
                            onChange={handleChange}
                        />
                    </div>
                );
            })}
        </section>
    );
};
