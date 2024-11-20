import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Checkbox from '@mui/joy/Checkbox';
import Cookies from 'js-cookie';

const customTheme = extendTheme({
    colorSchemes: {
        dark: {
            palette: {
                background: {
                    body: '#121212', // Example background color
                },
                text: {
                    primary: '#fff', // Example text color
                },
                primary: {
                    plainColor: '#90caf9', // Example for primary plain text color
                },
                // Add other colors as needed
            },
        },
    },
});


export default function SignUp() {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <CssVarsProvider theme={customTheme} disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s',
                    },
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        width: 400,
                        maxWidth: '100%',
                        p: 3,
                        borderRadius: 'sm',
                        boxShadow: 'sm',
                        backgroundColor: 'background.level1',
                    }}
                >
                    <Typography component="h1" level="h3" textAlign="center" mb={2}>
                        Create an Account
                    </Typography>
                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const data = Object.fromEntries(formData.entries());

                            // Save form data to cookies
                            Cookies.set('formData', JSON.stringify(data), { expires: 7 });

                            // Redirect to the main page
                            navigate('/'); // Adjust '/main' to your actual route
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl required>
                                <FormLabel>Name</FormLabel>
                                <Input name="name" placeholder="Enter your full name" />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" placeholder="Enter your email" />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                />
                            </FormControl>
                            <FormControl>
                                <Checkbox
                                    name="terms"
                                    label="I agree to the terms and conditions"
                                />
                            </FormControl>
                            <Button type="submit" fullWidth>
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                    <Divider sx={{ my: 2 }} />
                    <Typography level="body-sm" textAlign="center">
                        Already have an account?{' '}
                        <Link href="/login" level="title-sm">
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}