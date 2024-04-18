'use client'
import { useState } from 'react';
import Image from 'next/image';
import Alert from '../utils/alert';
import Link from 'next/link';
import LoaderFullPage from '../utils/loader';
const formFields = [
    {
        "groupName": "Practice Information",
        "fields": [
            {
                "fieldName": "Practice Name",
                "dataType": "text",
                "regexTest": ""
            },
            {
                "fieldName": "Practice Phone Number (Ph#)",
                "dataType": "phone",
                "regexTest": "^[\\(\\)\\d -]+$"  // Basic phone number format regex
            },
            {
                "fieldName": "Practice Fax Number",
                "dataType": "phone",
                "regexTest": "^[\\(\\)\\d -]+$"  // Basic phone number format regex
            },
            {
                "fieldName": "Practice Address (Service/Billing/Mailing)",
                "dataType": "text",
                "regexTest": ""
            }
        ]
    },
    {
        "groupName": "Provider Information",
        "fields": [
            {
                "fieldName": "Tax Identification Number (Tax ID)",
                "dataType": "text",
                "regexTest": "^\\d{2}-\\d{3}-\\d{4}$"  // Basic SSN format regex (US)
            },
            {
                "fieldName": "Provider Name",
                "dataType": "text",
                "regexTest": ""
            },
            {
                "fieldName": "Date of Birth",
                "dataType": "date",
                "regexTest": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"  // YYYY-MM-DD format regex
            },
            {
                "fieldName": "Joining Date / Start Date of Group",
                "dataType": "date",
                "regexTest": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"  // YYYY-MM-DD format regex
            },
            {
                "fieldName": "Social Security Number (SSN#)",
                "dataType": "text",
                "regexTest": "^\\d{3}-\\d{2}-\\d{4}$"  // Basic SSN format regex (US)
            },
            {
                "fieldName": "Group National Provider Identifier (NPI)",
                "dataType": "text",
                "regexTest": "^\\d{10}$"  // Basic NPI format regex
            },
            {
                "fieldName": "Individual NPI",
                "dataType": "text",
                "regexTest": "^\\d{10}$"  // Basic NPI format regex
            },
            {
                "fieldName": "Provider Specialty",
                "dataType": "text",
                "regexTest": ""
            },
            {
                "fieldName": "Provider Degree",
                "dataType": "text",
                "regexTest": ""
            }
        ]
    },
    {
        "groupName": "Login Information",
        "fields": [
            {
                "fieldName": "CAQH Login",
                "dataType": "text",
                "regexTest": ""
            },
            {
                "fieldName": "CAQH Password",
                "dataType": "password",
                "regexTest": ""
            },
            {
                "fieldName": "PECOS Login",
                "dataType": "text",
                "regexTest": ""
            }
        ]
    },
    {
        "groupName": "Contact Information",
        "fields": [
            {
                "fieldName": "Provider Email",
                "dataType": "email",
                "regexTest": "/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
            },
            {
                "fieldName": "Office Manager/Primary Contact Person",
                "dataType": "text",
                "regexTest": ""
            },
            {
                "fieldName": "Office Manager/Primary Contact Person Number",
                "dataType": "phone",
                "regexTest": "^[\\(\\)\\d -]+$"
            }
        ]
    },
    {
        "groupName": "Additional Information",
        "fields": [
            {
                "fieldName": "Clinical Laboratory Improvement Amendments (CLIA) Certification (If Available)",
                "dataType": "text",
                "regexTest": ""
            }
        ]
    }
]

const ConsultationForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submitting, setSubmitting] = useState(false)
    const [alert, setAlert] = useState(null);
    const [formData, setFormData] = useState(null)
    const [errors, setErrorrs] = useState(null);
    const handleChange = (key, value) => {
        if (formData) {
            if (formData[formFields[activeStep].groupName]) {
                setFormData(prevState => ({
                    ...prevState, [formFields[activeStep].groupName]: {
                        ...prevState[formFields[activeStep].groupName],
                        [key]: value
                    }
                }));
            }
            else {

                setFormData(prevState => ({
                    ...prevState, [formFields[activeStep].groupName]: {
                        [key]: value
                    }
                }));
            }
        }
        else {
            setFormData(_ => ({
                [formFields[activeStep].groupName]: {
                    [key]: value
                }
            }));
        }
    };
    function LinearProgressWithLabel() {
        let a = Math.ceil((activeStep + 1) * 100 / formFields.length,)
        return (
            <section className='flex w-screen bg-gray-100 h-2 fixed top-0 ' >
                <div className='bg-primary ' style={{ width: `${a}%` }} />
                <p className=' tracking-wide font-sans text-sm absolute right-5 top-5' >{`${activeStep + 1}/${formFields.length} steps`}</p>
            </section>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true); 
        try {
            const response = await fetch('/api/billing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setAlert({ message: 'Form submitted successfully!', type: 'success' });
                setSubmitting(false)
            } else {
                setAlert({ message: 'Internal Server Error', type: 'alert' });
                setSubmitting(false)
            }
        } catch (error) {
            setAlert({ message: 'Error submitting form.', type: 'alert' });
            setSubmitting(false)
        }
        finally {
            setFormData(null)
        }

    };

    const validateStep = () => {
        if (formData) {
            setErrorrs([])
            const data = formData[formFields[activeStep].groupName];
            const failed = [];
            for (const field of formFields[activeStep].fields) {
                const { fieldName, regexTest } = field;
                const value = data[fieldName];
                if (value) {
                    if (value && regexTest && !value.match(regexTest)) {
                        failed.push(fieldName);
                    }
                    else if (!value.trim()) failed.push(fieldName);
                }
                else failed.push(fieldName);
            }
            setErrorrs(failed)
            if (failed.length < 1) {
                return setActiveStep(Math.min(activeStep + 1, formFields.length - 1)); // All fields passed validation
            }

        }
        else window.alert('Please fill the form!')
    };
    return (

        <main className="px-4 py-8 flex flex-col items-center justify-center min-h-screen w-screen max-w-full ">
            {submitting && <LoaderFullPage />}

            <Link href={'/'} className="md:absolute top-5 left-5" >
                <Image
                    className="mx-auto h-fit w-36"
                    src={'/mbmb-black.png'}
                    width={250}
                    height={180}
                    alt="Medical Billing Miami Beach | Company | Medical Reveneu Management | Healthcare Coding"
                />
            </Link>
            <h1 className=" text-4xl font-semibold text-center my-14 lg:my-20">Medical Billing Miami Beach</h1>
            <form onSubmit={handleSubmit} className="mx-auto mt-10 font-sans">
                <div className="flex flex-col w-full">
                    <FormSection key={activeStep + 'Group'} errors={errors} {...formFields[activeStep]} handleChange={handleChange} />
                    <footer className='flex flex-col-reverse sm:flex-row items-center justify-evenly  sm:space-x-2 my-6' >
                        <button
                            type='button'
                            className={` border border-primary w-full py-2 rounded-md mx-auto max-w-sm my-1 sm:my-4 tracking-wider ${activeStep === 0 && 'grayscale cursor-not-allowed'} `}
                            onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
                        >
                            Back
                        </button>
                        <button
                            type={activeStep === formFields.length - 1 ? 'Submit' : 'button'}
                            className={` bg-primary text-white  w-full py-2 rounded-md mx-auto max-w-sm my-1 sm:my-4 tracking-wider `}
                            onClick={validateStep}
                        >
                            {activeStep === formFields.length - 1 ? 'Submit' : 'Next'}
                        </button>
                    </footer>
                </div>
            </form>
            <LinearProgressWithLabel total={4} />
            {alert && <Alert {...alert} setAlert={setAlert} />}
        </main>
    );
};

export default ConsultationForm;

const InputField = ({ fieldName, dataType, value, onChange, error }) => {
    const inputProps = {
        className: `min-w-96 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-500 text-rose-700' : ''}`,
        value,
        name: fieldName,
        placeholder: fieldName,
        onChange: (e) => onChange(e.target.name, e.target.value),
    };

    switch (dataType) {
        case 'text':
            return <input {...inputProps} />;
        case 'password':
            return <input {...inputProps} type="password" />;
        case 'phone':
            return <input {...inputProps} type="tel" />;
        case 'email':
            return <input {...inputProps} type="email" />;
        case 'date':
            return <input {...inputProps} type="date" />;
        default:
            return <input {...inputProps} />;
    }
};

const FormSection = ({ groupName, fields, handleChange, errors }) => {
    return (
        <section className={`mb-6 shadow rounded-lg p-4 bg-white grid  gap-x-4 min-w-fit ${fields.length > 4 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} `}>
            <h2 className={`text-lg font-bold text-primary mb-4  ${fields.length > 4 && 'lg:col-span-2'}`}>{groupName}</h2>
            {fields.map((field) => {
                const showError = errors && errors.includes(field.fieldName);
                return (
                    <div key={field.fieldName} className="mb-4">
                        <label htmlFor={field.fieldName} className={`block mb-2 text-sm font-medium text-gray-700 ${showError ? 'border-red-500 text-rose-700' : ''}`}>
                            {field.fieldName}
                        </label>
                        <InputField {...field} error={showError} onChange={handleChange} />
                    </div>
                )
            })}
        </section>
    );
};

