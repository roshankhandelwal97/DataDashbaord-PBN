import React, { useState, useEffect } from 'react';
import { fetchFilteredData, fetchCategories } from '../services/api';
import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import Filters from './Filters';
import DataTable from './DataTable';
import Navbar from './Navbar';
import Footer from './Footer';
import { Grid, Paper, Typography } from '@mui/material';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState({ pie: [], bar: [], line: [] });
  const [filters, setFilters] = useState({});
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetchCategories();
        const categoriesData = categoriesResponse.data;
        setCategories(categoriesData);

        const defaultDataResponse = await fetchFilteredData({});
        const defaultData = defaultDataResponse.data;

        const mappedData = defaultData.map((item) => ({
          ...item,
          paytype_name: categoriesData.paytype_id[item.paytype_id],
          provider_name: categoriesData.provider_id[item.provider_id],
          employee_type_name: categoriesData.employee_type_id[item.employee_type_id],
        }));

        setData(mappedData);
        updateGraphData(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateGraphData = (mappedData) => {
    const pieData = Object.values(
      mappedData.reduce((acc, item) => {
        acc[item.paytype_name] = acc[item.paytype_name] || { name: item.paytype_name, value: 0 };
        acc[item.paytype_name].value += item.amount;
        return acc;
      }, {})
    );

    const barData = Object.values(
      mappedData.reduce((acc, item) => {
        acc[item.provider_name] = acc[item.provider_name] || { name: item.provider_name, value: 0 };
        acc[item.provider_name].value += item.amount;
        return acc;
      }, {})
    );

    const lineData = mappedData.reduce((acc, item) => {
      const existing = acc.find((entry) => entry.date === item.date);
      if (existing) {
        existing.amount += item.amount;
      } else {
        acc.push({ date: item.date, amount: item.amount });
      }
      return acc;
    }, []);

    setGraphData({ pie: pieData, bar: barData, line: lineData });
  };

  const applyFilters = () => {
    if (!categories) {
      console.error('Categories not loaded yet');
      return;
    }

    fetchFilteredData(filters)
      .then((response) => {
        const mappedData = response.data.map((item) => ({
          ...item,
          paytype_name: categories.paytype_id[item.paytype_id],
          provider_name: categories.paytype_id[item.provider_id],
          employee_type_name: categories.paytype_id[item.employee_type_id],
        }));

        setData(mappedData);
        updateGraphData(mappedData);
      })
      .catch((error) => console.error('Error fetching filtered data:', error));
  };

  const resetFilters = () => {
    setFilters({});
    fetchFilteredData({})
      .then((response) => {
        const mappedData = response.data.map((item) => ({
          ...item,
          paytype_name: categories.paytype_id[item.paytype_id],
          provider_name: categories.paytype_id[item.provider_id],
          employee_type_name: categories.paytype_id[item.employee_type_id],
        }));

        setData(mappedData);
        updateGraphData(mappedData);
      })
      .catch((error) => console.error('Error fetching default data:', error));
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Filters
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
        />

        {data.length > 0 ? (
          <>
            <DataTable data={data} />
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                margin: '20px 0',
                color: '#ffffff',
              }}
            >
              Analytics and Charts
            </Typography>
            <Grid container spacing={3} className="charts-container">
              <Grid item xs={12} sm={6}>
                <Paper className="chart-paper">
                  <PieChart data={graphData.pie} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className="chart-paper">
                  <BarChart data={graphData.bar} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className="chart-paper">
                  <LineChart data={graphData.line} />
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#ffffff',
              marginTop: '20px',
            }}
          >
            No data for the current filter
          </Typography>
        )}
      </div>
      <Footer /> {/* Add the Footer here */}
    </div>
  );
};

export default Dashboard;
