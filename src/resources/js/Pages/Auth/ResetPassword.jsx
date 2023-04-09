import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Link, TextField, ThemeProvider, Typography } from '@mui/material';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Head title="パスワード再設定" />
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
                        <LockResetOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        パスワード再設定
                    </Typography>
                    <Box component="form" className="mt-1 w-5/6" onSubmit={submit} noValidate>
                        <TextField
                            id="email"
                            type="email"
                            label="メールアドレス"
                            name="email"
                            value={data.email}
                            variant="standard"
                            error={errors.email}
                            onChange={onHandleChange}
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
                            label="新しいパスワード"
                            name="password"
                            value={data.password}
                            variant="standard"
                            error={errors.password}
                            onChange={onHandleChange}
                            className="mt-1 block"
                            autoComplete="new-password"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                        />
                        <InputError className="mt-2" message={errors.password} />
                        <TextField
                            id="password_confirmation"
                            type="password"
                            label="新しいパスワード（確認）"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            variant="standard"
                            error={errors.password_confirmation}
                            onChange={onHandleChange}
                            className="mt-1 block"
                            autoComplete="new-password"
                            margin="normal"
                            required
                            InputLabelProps={{ required: false }}
                            fullWidth
                        />
                        <InputError className="mt-2" message={errors.password_confirmation} />
                        {processing ?
                            <Button className="mt-3 mb-2" disabled variant="contained" fullWidth>パスワードリセット</Button> :
                            <Button className="mt-3 mb-2" onClick={submit} variant="contained" fullWidth>パスワードリセット</Button>
                        }
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
