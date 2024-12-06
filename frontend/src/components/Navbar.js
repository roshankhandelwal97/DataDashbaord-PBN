import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Logo from './logo.png'; // Import your logo image

const Navbar = () => {
    return (
        <AppBar
            position="static"
            style={{
                background: 'linear-gradient(to right, #0e1a4e, #183168)', // Gradient background
                color: '#ffffff',
            }}
        >            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left Logo */}
                <Box display="flex" alignItems="center">
                    <img src={Logo} alt="Logo" style={{ height: '120px', marginRight: '10px' }} />
                    <Typography variant="h6" style={{ color: '#0e1a4e' }}>
                    </Typography>
                </Box>

                {/* Right Title */}
                <Typography variant="h6" style={{ color: '#ffffff', fontWeight: 'bold' }}>
                    Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
