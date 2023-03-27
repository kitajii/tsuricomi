import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AccountCircleOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        アカウント登録
                    </Typography>
                    <Box component="form" className="mt-1 w-5/6" onSubmit={submit} noValidate>
                        <TextField
                            id="name"
                            label="アカウント名"
                            name="name"
                            value={data.name}
                            variant="standard"
                            error={errors.name}
                            onChange={handleOnChange}
                            className="mt-1 block"
                            autoComplete="name"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                            autoFocus
                        />
                        <InputError className="mt-2" message={errors.name} />
                        <TextField
                            id="email"
                            type="email"
                            label="メールアドレス"
                            name="email"
                            value={data.email}
                            variant="standard"
                            error={errors.email}
                            onChange={handleOnChange}
                            className="mt-1 block"
                            autoComplete="email"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                        />
                        <InputError className="mt-2" message={errors.email} />
                        <TextField
                            id="password"
                            type="password"
                            label="パスワード"
                            name="password"
                            value={data.password}
                            variant="standard"
                            error={errors.password}
                            onChange={handleOnChange}
                            className="mt-1 block"
                            autoComplete="current-password"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                        />
                        <InputError className="mt-2" message={errors.password} />
                        <TextField
                            id="password_confirmation"
                            type="password"
                            label="パスワード（確認）"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            variant="standard"
                            error={errors.password_confirmation}
                            onChange={handleOnChange}
                            className="mt-1 block"
                            autoComplete="new-password"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                        />
                        <InputError className="mt-2" message={errors.password_confirmation} />
                        {processing ?
                            <Button className="mt-3 mb-2" disabled variant="contained" fullWidth>登録</Button> :
                            <Button className="mt-3 mb-2" onClick={submit} variant="contained" fullWidth>登録</Button>
                        }
                        <Grid container>
                            <Grid item xs>
                                <Link href={route('login')} variant="body2">
                                    ログインはこちら
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                    Copyright ©
                    <Link color="inherit" href="">
                        釣りコミ
                    </Link> 2023.
                </Typography>
            </Container>
        </ThemeProvider>
    );
}
