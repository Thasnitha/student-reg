import { MenuItem, TextField, Button, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react';
import Img1 from './assets/lady.png';
import Img2 from './assets/flower.png';
import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Address: '',
    CountryCode: '',
    email: '',
    PhoneNumber: '',
    dateofBirth: '',
    gender: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    countryCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyField = Object.values(formData).some((field) => field === '');
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email); // Email validation regex
    const validPhoneNumber = /^\d{10}$/.test(formData.PhoneNumber); // Phone number must be 10 digits
    const validCountryCode = /^\d+$/.test(formData.CountryCode); // Country code should be numeric

    // Reset errors
    setErrors({
      email: '',
      phone: '',
      countryCode: '',
    });

    let hasError = false;

    // Check for empty fields
    if (emptyField) {
      setErrors((prev) => ({
        ...prev,
        general: 'Please fill in all the fields.',
      }));
      hasError = true;
    }

    // Validate Country Code
    if (!validCountryCode) {
      setErrors((prev) => ({
        ...prev,
        countryCode: 'Invalid Country Code. It should be numeric.',
      }));
      hasError = true;
    }

    // Validate Phone Number
    if (!validPhoneNumber) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Phone number must be exactly 10 digits.',
      }));
      hasError = true;
    }

    // Validate Email
    if (!validEmail) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address '
      }));
      hasError = true;
    }

    if (!hasError) {
      // Form submission is valid
      alert(`Registration Complete 
        First Name: ${formData.FirstName},
        Middle Name: ${formData.MiddleName},
        Last Name: ${formData.LastName},
        Address: ${formData.Address},
        Country Code: ${formData.CountryCode},
        Email: ${formData.email},
        Phone Number: ${formData.PhoneNumber},
        Date of Birth: ${formData.dateofBirth},
        Gender: ${formData.gender}
      `);
    }
  };

  const handleReset = () => {
    setFormData({
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Address: '',
      CountryCode: '',
      email: '',
      PhoneNumber: '',
      dateofBirth: '',
      gender: '',
    });
    setErrors({
      email: '',
      phone: '',
      countryCode: '',
    });
  };

  return (
    <>
    
      <div className='container'>
        <img style={{ height: '200px', marginTop: '400px', marginLeft: '90px' }} className='img-fluid ms-5' src={Img2} alt="landingImg" />

        <div className='main'>
          <h1 style={{ paddingLeft: '50px', paddingTop: '10px', backgroundColor: '#d96c48', color: 'white', height: '50px' }}>Student Registration Form</h1>
          <form onSubmit={handleSubmit}>

          <div style={{ paddingTop: '30px', paddingLeft: '30px', display: 'flex', justifyContent: 'space-around' }}>
            <TextField name='FirstName' value={formData.FirstName} onChange={handleChange} id="outlined-basic" label="First Name" variant="outlined" />
            <TextField name='MiddleName' value={formData.MiddleName} onChange={handleChange} id="outlined-basic" label="Middle Name" variant="outlined" />
            <TextField name='LastName' value={formData.LastName} onChange={handleChange} id="outlined-basic" label="Last Name" variant="outlined" />
          </div>

          <div style={{ paddingTop: '30px', paddingLeft: '30px', display: 'flex', justifyContent: 'space-around' }}>
            <TextField id="outlined-basic" value={formData.Address} onChange={handleChange} label="Address" name='Address' variant="outlined" style={{ width: '350px' }} />
            <TextField name='CountryCode' value={formData.CountryCode} onChange={handleChange} id="outlined-basic" label="Country Code" variant="outlined" style={{ width: '350px' }} />
          </div>
          {/* Display error for Country Code */}
          {errors.countryCode && <div style={{ color: 'red', paddingLeft: '450px' }}>{errors.countryCode}</div>}

          <div style={{ paddingTop: '30px', paddingLeft: '30px', display: 'flex', justifyContent: 'space-around' }}>
            <TextField type='email' id="outlined-basic" value={formData.email} onChange={handleChange} name='email' label="Email" variant="outlined" style={{ width: '350px' }} />
            <TextField name='PhoneNumber' value={formData.PhoneNumber} onChange={handleChange} id="outlined-basic" label="Phone Number" variant="outlined" style={{ width: '350px' }} />
          </div>
          {/* Display errors for Email and Phone */}
          {errors.email && <div style={{ color: 'red', paddingLeft: '50px', }}>{errors.email}</div>}
          {errors.phone && <div style={{ color: 'red', paddingLeft: '450px',padding }}>{errors.phone}</div>}

          <div style={{ paddingTop: '30px', paddingLeft: '30px', display: 'flex', justifyContent: 'space-around' }}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup name="gender" value={formData.gender} onChange={handleChange} row>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <TextField name='dateofBirth' value={formData.dateofBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} id="filled-basic" label="Date of Birth" variant="filled" type='date' style={{ width: '350px', marginLeft: '100px' }} />
          </div>

          <div style={{ paddingTop: '40px', paddingLeft: '40px' }}>
            <TextField id="outlined-basic" label="Select any Course" variant="outlined" style={{ width: '750px' }} select>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Humanities">Humanities</MenuItem>
              <MenuItem value="Commerce">Commerce</MenuItem>
            </TextField>
          </div>

          <div className='buttons'>
            <Button type='submit' variant='outlined'  style={{ color: 'white', backgroundColor: '#d96c48', }}>REGISTER</Button>
            <Button style={{marginLeft:'50px',color:'#d96c48',border:'solid black'}} onClick={handleReset} variant='outlined'>CANCEL</Button>
          </div>
          </form>
        </div>

        <div>
          <img style={{ marginLeft: '10px', marginTop: '200px', height: '400px' }} className='img-fluid ms-5' src={Img1} alt="landingImg" />
        </div>
      </div>

    </>
  );
}

export default App;