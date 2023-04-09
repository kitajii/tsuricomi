import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import { Transition } from '@headlessui/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
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
                        <HelpOutlineOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        パスワードをお忘れの方
                    </Typography>
                    <Typography className="my-4 text-sm text-center">
                        メールアドレスを入力し、再設定メールを送信してください。
                        パスワード再設定ページへの案内メールをお送りします。
                    </Typography>
                    <Box component="form" className="mt-1 w-5/6" onSubmit={submit} noValidate>
                        <TextField
                            id="email"
                            type="email"
                            label="メールアドレス"
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
                            autoFocus
                        />
                        <InputError className="mt-2" message={errors.email} />
                        {processing ?
                            <Button className="mt-3 mb-2" disabled variant="contained" fullWidth>メールを送信する</Button> :
                            <Button className="mt-3 mb-2" onClick={submit} variant="contained" fullWidth>メールを送信する</Button>
                        }
                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-right text-blue-600">送信しました！</p>
                        </Transition>
                        <Grid container>
                            <Grid item>
                                <Link href={route('login')} variant="body2">
                                    ログイン画面
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
