import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Button } from '@mui/material';
import CropIconImage from './CropIconImage';

export default function UpdateProfileIconForm({ className }) {
    const user = usePage().props.auth;

    const { data, setData, patch, progress, errors, processing, recentlySuccessful } = useForm({
        icon: null,
    });

    /**
     * 更新処理
     * @param {event} e 
     */
    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.icon-upload'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アイコン</h2>

                <p className="mt-1 text-sm text-gray-600">
                    アイコン画像を更新できます。
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <CropIconImage />
                <div className="flex items-center gap-4">
                    {processing ? <Button disabled variant="contained">更新</Button> : <Button type="submit" onClick={submit} variant="contained">更新</Button>}
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
