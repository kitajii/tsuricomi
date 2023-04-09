import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.login'));
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Head title="ログイン" />
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        管理者ログイン
                    </Typography>
                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                    <Box component="form" className="mt-1 w-5/6" onSubmit={submit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            id="email"
                            type="email"
                            label="メールアドレス"
                            value={data.email}
                            variant="standard"
                            error={errors.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block"
                            autoComplete="email"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                            autoFocus
                        />
                        <InputError className="mt-2" message={errors.email} />
                        <TextField
                            id="password"
                            type="password"
                            label="パスワード"
                            value={data.password}
                            variant="standard"
                            error={errors.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block"
                            autoComplete="current-password"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                        />
                        <InputError className="mt-2" message={errors.password} />
                        <FormControlLabel
                            control={<Checkbox name="remember" value={data.remember} onChange={handleOnChange} />}
                            label="ログイン状態を保存"
                        />
                        {processing ?
                            <Button className="mt-3 mb-2" disabled variant="contained" fullWidth>ログイン</Button> :
                            <Button className="mt-3 mb-2" type="submit" onClick={submit} variant="contained" fullWidth>ログイン</Button>
                        }
                        <Grid container>
                            <Grid item xs>
                                <Link href={route('login')} variant="body2">
                                    ユーザーログイン画面へ
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
