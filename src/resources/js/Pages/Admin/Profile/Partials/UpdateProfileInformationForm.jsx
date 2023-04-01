import InputError from '@/Components/InputError';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    /**
     * 更新処理
     * @param {event} e 
     */
    const submit = (e) => {
        e.preventDefault();

        patch(route('admin.profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">プロフィール</h2>

                <p className="mt-1 text-sm text-gray-600">
                    プロフィール情報を更新できます。
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <TextField
                        id="name"
                        label="名前"
                        name="name"
                        value={data.name}
                        variant="standard"
                        error={errors.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="block"
                        autoComplete="off"
                        required
                        fullWidth
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="メールアドレス"
                        value={data.email}
                        variant="standard"
                        error={errors.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block"
                        autoComplete="off"
                        required
                        fullWidth
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            メールアドレスの確認を行なってください
                            <Link
                                href={route('admin.verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                確認メールを再送信するには、こちらをクリックしてください。
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-blue-600">
                                確認リンクがメールアドレスに送信されました。
                            </div>
                        )}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    {processing ? <Button disabled variant="contained">更新</Button> : <Button onClick={submit} variant="contained">更新</Button>}
                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-blue-600">更新しました！</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
