import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アカウント削除</h2>
                <p className="mt-1 text-sm text-gray-600">
                    アカウントが削除されると、すべてのデータが完全に削除されます。
                </p>
            </header>
            <Button onClick={confirmUserDeletion} variant="contained" color="error">アカウント削除</Button>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        アカウントを削除してもよろしいですか？
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        アカウントが削除されると、すべてのデータが完全に削除されます。
                        アカウントを完全に削除するには、パスワードを入力してください。
                    </p>
                    <div className="mt-6">
                        <TextField
                            id="password"
                            label="パスワード"
                            type="password"
                            className="block"
                            ref={passwordInput}
                            value={data.password}
                            variant="standard"
                            error={errors.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="off"
                            isFocused
                            required
                            fullWidth
                        />
                        <InputError className="mt-2" message={errors.password} />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button onClick={closeModal} color="inherit">キャンセル</Button>
                        {processing ? <Button disabled className="ml-3" variant="contained" color="error">削除する</Button> : <Button onClick={deleteUser} className="ml-3" variant="contained" color="error">削除する</Button>}
                    </div>
                </form>
            </Modal>
        </section>
    );
}
