import { useRef } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Button, TextField } from "@mui/material";

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    パスワード更新
                </h2>
            </header>
            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <TextField
                        id="current_password"
                        label="現在のパスワード"
                        type="password"
                        className="block"
                        value={data.current_password}
                        variant="standard"
                        error={errors.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        autoComplete="off"
                        required
                        fullWidth
                    />
                    <InputError
                        className="mt-2"
                        message={errors.current_password}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="新しいパスワード"
                        type="password"
                        className="block"
                        value={data.password}
                        variant="standard"
                        error={errors.password}
                        onChange={(e) => setData("password", e.target.value)}
                        autoComplete="off"
                        required
                        fullWidth
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>
                <div>
                    <TextField
                        id="password_confirmation"
                        label="新しいパスワード（確認）"
                        type="password"
                        className="block"
                        value={data.password_confirmation}
                        variant="standard"
                        error={errors.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        autoComplete="off"
                        required
                        fullWidth
                    />
                    <InputError
                        className="mt-2"
                        message={errors.password_confirmation}
                    />
                </div>
                <div className="flex items-center gap-4">
                    {processing ? (
                        <Button disabled variant="contained">
                            更新
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            onClick={updatePassword}
                            variant="contained"
                        >
                            更新
                        </Button>
                    )}
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
