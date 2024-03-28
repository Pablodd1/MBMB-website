'use client'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { Button, FormControl, TextField, Typography, LinearProgress, Step, StepContent, StepLabel, Stepper, Grid, Divider, Select, InputLabel, MenuItem, IconButton, Alert, Accordion, AccordionSummary, AccordionDetails, Backdrop, CircularProgress, AlertTitle, Box } from '@mui/material';
import Image from 'next/image';

const ConsultationForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [personal, setPersonal] = useState({})       //Billing > Personal
    const [services, setServices] = useState({})       //Billing > Services
    const [billing, setBilling] = useState({})         //Billing > Billing
    const [corres, setCorres] = useState({})           //Billing > Corres
    const [agreement, setAgreement] = useState({})     //Agreement
    const [business, setBusiness] = useState({})       //Client > Business
    const [management, setManagement] = useState({})   //Client > Management
    const [emails, setEmails] = useState({})           //Client > Emails
    const [billForm, setBillForm] = useState(0);
    const [clientForm, setClientForm] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [otherToggle, setOtherToggle] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorrs, setErrorrs] = useState(false);
    const [dark, settDark] = useState(false);
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
    const theme = createTheme({
        palette: {
            text: {
                main: '#fff',
                contrastText: '#fff'
            },
            primary: {
                main: '#d5278faa  ',
                contrastText: '#CCCCCC'
            }
        },
    });



    const checkLength = (obj, n) => Object.keys(obj).length >= n ? false : true;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
    };
    const renderFormStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div>
                        <h2 className='text-lg' >PERSONAL</h2>
                        <Grid container spacing={2} rowSpacing={1} sx={{
                            width: 'auto', m: 0, overflow: 'auto',
                        }}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Full Name" name="Full Name" label="Full Name" value={personal["Full Name"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Full Name' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Date of Birth" name="Date of Birth" label="Date of Birth" value={personal["Date of Birth"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Date of Birth' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                <FormControl fullWidth >
                                    <InputLabel variant="standard" style={{ color: dark && '#fffa' }} htmlFor="type">
                                        Request
                                    </InputLabel>
                                    <Select
                                        InputLabelProps={dark && { style: { color: 'white' } }}
                                        id="Request Type"
                                        name='Request'
                                        style={{ color: dark && 'white' }}
                                        variant="standard"
                                        onChange={(e) => { setPersonal({ ...personal, [`${e.target.name}`]: e.target.value }) }}
                                        InputProps={{
                                            name: 'Request',
                                            id: 'Request',
                                            placeholder: 'Request',
                                            style: { color: dark && 'white' }
                                        }}
                                    >
                                        <MenuItem value={"Credential"} selected>Credential</MenuItem>
                                        <MenuItem value={"Re-Credential"}>Re-Credential</MenuItem>
                                    </Select>
                                </FormControl></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                <FormControl fullWidth >
                                    <InputLabel variant="standard" style={{ color: dark && '#fffa' }} htmlFor="type">
                                        Provider Type
                                    </InputLabel>
                                    <Select
                                        InputLabelProps={dark && { style: { color: 'white' } }}
                                        style={{ color: dark && 'white' }}
                                        variant="standard"
                                        name='Provider Type'
                                        onChange={(e) => { setPersonal({ ...personal, [`${e.target.name}`]: e.target.value }); e.target.value === 'Other' ? setOtherToggle(true) : setOtherToggle(false); }}
                                        InputProps={{
                                            name: 'Provider Type',
                                            id: 'Provider Type',
                                            placeholder: 'Provider Type',
                                            style: { color: 'white' }
                                        }}
                                    >
                                        <MenuItem value={"Physical Therapist"} selected>Physical Therapist</MenuItem>
                                        <MenuItem value={"Physician Assistant"}>Physician Assistant</MenuItem>
                                        <MenuItem value={"Practitioner"}>Practitioner</MenuItem>
                                        <MenuItem value={"Physician"}>Physician</MenuItem>
                                        <MenuItem value={"Nurse"}>Nurse</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>

                                </FormControl></Grid>
                            {otherToggle && <Grid item xs={12} sm={12} md={12} lg={12} xl={12} ><TextField
                                fullWidth
                                name={`Provider Type Other`}
                                variant='standard'
                                placeholder={"Type here."}
                                label="Please Specify Type"
                                InputProps={dark && { style: styles.textfield }}
                                InputLabelProps={dark && { style: styles.textfield }}
                                color={dark && 'text'}
                                onChange={(e) => { setPersonal({ ...personal, [`${e.target.name}`]: e.target.value }) }}
                                sx={{ m: 0, p: 0, }} /></Grid>}
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Provider SSN" name="Provider SSN" label="Provider SSN" value={personal["Provider SSN"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Provider SSN' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Provider NPI" name="Provider NPI" label="Provider NPI" value={personal["Provider NPI"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Provider NPI' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Group NPI" name="Group NPI" label="Group NPI" value={personal["Group NPI"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Group NPI' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Practice Name" name="Practice Name" label="Practice Name" value={personal["Practice Name"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Practice Name' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Practice Specialty" name="Practice Specialty" label="Practice Specialty" value={personal["Practice Specialty"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Practice Specialty' fullWidth /></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Home Address" name="Home Address" label="Home Address" value={personal["Home Address"]} onChange={(e) => setPersonal({ ...personal, [e.target.name]: e.target.value })} placeholder='Home Address' multilines="true" fullWidth /></Grid>
                        </Grid>
                        <Box sx={{ mb: 2, p: 2, ml: 'auto', maxWidth: '720px', width: 'auto', mr: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <button
                                className={` bg-primary text-white  w-full py-2 rounded-md mx-auto max-w-md my-4 tracking-wider ${checkLength(personal, 10) ? ' grayscale cursor-not-allowed ' : 'grayscale-0'} `}
                                disabled={checkLength(personal, 10)}
                                onClick={() => { setActiveStep(1) }}
                            >
                                Next
                            </button>
                        </Box>
                    </div>
                );
            case 1:
                return (
                    <div>

                        <h2 component='h4' sx={{ fontSize: "2rem", color: dark ? '#fff' : '#000', fontFamily: 'Sofia', p: 2 }} >SERVICES</h2>
                        <Grid container spacing={2} rowSpacing={1} sx={{
                            width: 'auto', m: 0, overflow: 'auto',
                        }}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                <TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Service Phone" name="Service Phone" label="Phone" value={services["Service Phone"]} onChange={(e) => setServices({ ...services, [e.target.name]: e.target.value })} placeholder='Service Phone' fullWidth />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Service Fax Number" name="Service Fax Number" label="Fax Number" value={services["Service Fax Number"]} onChange={(e) => setServices({ ...services, [e.target.name]: e.target.value })} placeholder='Service Fax Number' fullWidth /></Grid>
                            <Grid item xs={12} sm={12} md={6} lg={12} xl={12} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Work Hours Details" name="Work Hours Details" label="Work Hours Details" value={services["Work Hours Details"]} onChange={(e) => setServices({ ...services, [e.target.name]: e.target.value })} placeholder='Work Hours Details' fullWidth /></Grid>
                            <Grid item xs={12} sm={12} md={6} lg={12} xl={12} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Service Location Address" name="Service Location Address" label="Location Address" value={services["Service Location Address"]} onChange={(e) => setServices({ ...services, [e.target.name]: e.target.value })} placeholder='Service Location Address' multilines="true" fullWidth /></Grid>
                        </Grid>
                        <Box sx={{ mb: 2, p: 2, ml: 'auto', maxWidth: '720px', width: 'auto', mr: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <button
                                className={` bg-primary text-white  w-full py-2 rounded-md mx-auto max-w-md my-4 tracking-wider ${checkLength(services, 4) ? ' grayscale cursor-not-allowed ' : 'grayscale-0'} `}
                                disabled={checkLength(services, 4)}
                                onClick={() => { setActiveStep(2) }}
                            >
                                Next
                            </button>
                        </Box>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 component='h4' sx={{ fontSize: "2rem", color: dark ? '#fff' : '#000', fontFamily: 'Sofia', p: 2 }} >BILLING</h2>

                        <Grid container spacing={2} rowSpacing={1} sx={{
                            width: 'auto', m: 0, overflow: 'auto',
                        }}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Billing Phone" name="Billing Phone" label="Phone" value={billing["Billing Phone"]} onChange={(e) => setBilling({ ...billing, [e.target.name]: e.target.value })} placeholder='Billing Phone' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Billing Fax Number" name="Billing Fax Number" label="Fax Number" value={billing["Billing Fax Number"]} onChange={(e) => setBilling({ ...billing, [e.target.name]: e.target.value })} placeholder='Billing Fax Number' fullWidth /></Grid>
                            <Grid item xs={12} sm={12} md={6} lg={12} xl={12} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Billing Location Address" name="Billing Address" label="Address" value={billing["Billing Address"]} onChange={(e) => setBilling({ ...billing, [e.target.name]: e.target.value })} placeholder='Billing Address' multilines="true" fullWidth /></Grid>
                        </Grid>
                        <Box sx={{ mb: 2, p: 2, ml: 'auto', maxWidth: '720px', width: 'auto', mr: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <button
                                className={` bg-primary text-white  w-full py-2 rounded-md mx-auto max-w-md my-4 tracking-wider ${checkLength(billing, 3) ? ' grayscale cursor-not-allowed ' : 'grayscale-0'} `}
                                disabled={checkLength(billing, 3)}
                                onClick={() => { setActiveStep(3) }}
                            >
                                Next
                            </button>
                        </Box>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 component='h4' sx={{ fontSize: "2rem", color: dark ? '#fff' : '#000', fontFamily: 'Sofia', p: 2 }} >CORRESPONDENCE</h2>

                        <Grid container spacing={2} rowSpacing={1} sx={{
                            width: 'auto', m: 0, overflow: 'auto',
                        }}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Correspondence Phone" name="Correspondence Phone" label="Phone" value={corres["Correspondence Phone"]} onChange={(e) => setCorres({ ...corres, [e.target.name]: e.target.value })} placeholder='Correspondence Phone' fullWidth /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Correspondence Fax Number" name="Correspondence Fax Number" label="Fax Number" value={corres["Correspondence Fax Number"]} onChange={(e) => setCorres({ ...corres, [e.target.name]: e.target.value })} placeholder='Correspondence Fax Number' fullWidth /></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} ><TextField variant='standard' InputProps={dark && { style: styles.textfield }} InputLabelProps={dark && { style: styles.textfield }} color={dark && 'text'} id="Correspondence Location Address" name="Correspondence Address" label="Address" value={corres["Correspondence Address"]} onChange={(e) => setCorres({ ...corres, [e.target.name]: e.target.value })} placeholder='Correspondence Address' multilines="true" fullWidth /></Grid>

                        </Grid>

                        <button
                            className={` bg-primary text-white w-full py-2 rounded-md mx-auto max-w-md my-4 tracking-wider ${(checkLength(personal, 10) || checkLength(services, 4) || checkLength(billing, 3) || checkLength(corres, 3)) ? ' grayscale cursor-not-allowed ' : 'grayscale-0'} `}
                            disabled={checkLength(personal, 10) || checkLength(services, 4) || checkLength(billing, 3) || checkLength(corres, 3)}
                            onClick={() => submitBill(personal, services, billing, corres)}>
                            Submit
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <main className="px-4 py-8 flex flex-col items-center justify-center min-h-screen w-screen max-w-full ">

            <figure className="md:absolute top-5 left-5" >
                <Image
                    className="mx-auto h-fit w-36"
                    src={'/mbmb-black.png'}
                    width={250}
                    height={180}
                    alt="Medical Billing Miami Beach | Company | Medical Reveneu Management | Healthcare Coding"
                />
            </figure>
            <h1 className=" text-4xl font-semibold text-center my-14 lg:my-20">Medical Billing Miami Beach</h1>
            <form onSubmit={handleSubmit} className="mx-auto max-w-4xl mt-10">
                {renderFormStep()}
            </form>
        </main>
    );
};

export default ConsultationForm;
