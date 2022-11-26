import * as React from 'react';
import { Box, FormControl, InputLabel, FilledInput, TextField } from '@mui/material';
import { IMaskInput } from 'react-imask';

const PhoneNumber = React.forwardRef(({id, onChange, ...other}, ref) => {
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: {id, value}})}
      overwrite
    />
  )
})



export const CustomerForm = () => {


  const handleChange = (event) => {
    console.log(formData);
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        variant="filled"
      />
      <TextField
        id="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        variant="filled"
      />
      <FormControl variant="filled">
        <InputLabel htmlFor="phone" variant="filled">Phone</InputLabel>
        <FilledInput
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          id="phone"
          inputComponent={PhoneNumber}
        />
      </FormControl>
    </Box>
  );
}
