import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { fetchCategories } from '../services/api';
import '../styles/Filters.css';

const Filters = ({ filters, setFilters, onApplyFilters, onResetFilters }) => {
  const [paytypes, setPaytypes] = useState([]);
  const [providers, setProviders] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        const data = response.data;
        setPaytypes(Object.entries(data.paytype_id).map(([id, name]) => ({ id, name })));
        setProviders(Object.entries(data.provider_id).map(([id, name]) => ({ id, name })));
        setEmployeeTypes(Object.entries(data.employee_type_id).map(([id, name]) => ({ id, name })));
      })
      .catch((error) => console.error('Error Fetching Categories:', error));
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters-container">
      <div className="filter-fields">
        <TextField
          select
          label="Pay Type"
          value={filters.paytype_id || ''}
          onChange={(e) => handleFilterChange('paytype_id', e.target.value)}
          className="filter-field"
          sx={{
            input: { color: '#ffffff' }, // Text color for the dropdown values
            '.MuiInputLabel-root': { color: '#ffffff' }, // Label color
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' }, // Border color
              '&:hover fieldset': { borderColor: '#f9d342' }, // Hover border color
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' }, // Focused border color
            },
          }}
        >
          <MenuItem value="">Select Pay Type</MenuItem>
          {paytypes.map((paytype) => (
            <MenuItem key={paytype.id} value={paytype.id}>
              {paytype.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Provider"
          value={filters.provider_id || ''}
          onChange={(e) => handleFilterChange('provider_id', e.target.value)}
          className="filter-field"
          sx={{
            input: { color: '#ffffff' },
            '.MuiInputLabel-root': { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#f9d342' },
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
            },
          }}
        >
          <MenuItem value="">Select Provider</MenuItem>
          {providers.map((provider) => (
            <MenuItem key={provider.id} value={provider.id}>
              {provider.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Employee Type"
          value={filters.employee_type_id || ''}
          onChange={(e) => handleFilterChange('employee_type_id', e.target.value)}
          className="filter-field"
          sx={{
            input: { color: '#ffffff' },
            '.MuiInputLabel-root': { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#f9d342' },
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
            },
          }}
        >
          <MenuItem value="">Select Employee Type</MenuItem>
          {employeeTypes.map((employeeType) => (
            <MenuItem key={employeeType.id} value={employeeType.id}>
              {employeeType.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Min Amount"
          type="number"
          value={filters.min_amount || ''}
          onChange={(e) => handleFilterChange('min_amount', e.target.value)}
          className="filter-field"
          sx={{
            input: { color: '#ffffff' },
            '.MuiInputLabel-root': { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#f9d342' },
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
            },
          }}
        />
        <TextField
          label="Max Amount"
          type="number"
          value={filters.max_amount || ''}
          onChange={(e) => handleFilterChange('max_amount', e.target.value)}
          className="filter-field"
          sx={{
            input: { color: '#ffffff' },
            '.MuiInputLabel-root': { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#f9d342' },
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
            },
          }}
        />

        <TextField
          label="Start Date"
          type="date"
          value={filters.start_date || ''}
          onChange={(e) => handleFilterChange('start_date', e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="filter-field"
          sx={{
            input: { color: '#ffffff' },
            '.MuiInputLabel-root': { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#f9d342' },
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
            },
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={filters.end_date || ''}
          onChange={(e) => handleFilterChange('end_date', e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="filter-field"
          sx={{
            input: { color: '#ffffff' },
            '.MuiInputLabel-root': { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#f9d342' },
              '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
            },
          }}
        />
      </div>

      <div className="filter-actions">
        <Button
          variant="contained"
          onClick={onApplyFilters}
          style={{
            '--button-height': '50px',
            '--button-width': '160px',
            '--button-bg-color': '#3b82f6',
            '--button-hover-color': '#2563eb',
          }}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          onClick={onResetFilters}
          style={{
            '--button-height': '50px',
            '--button-width': '160px',
            '--button-bg-color': '#ffffff',
            '--button-hover-color': '#d1d5db',
            border: '1px solid #3b82f6',
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
