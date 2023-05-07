import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import Label from "@/Components/InputLabel";
import {
    Button,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import Modal from "@/Components/Modal";
import CropImage from "./CropImage";

export default function CreateRecordModal({
    location,
    createRecordModalOpen = false,
    setCreateRecordModalOpen,
    weatherList,
    windDirectionList,
}) {
    const { data, setData, post, errors, setError, clearErrors, processing, recentlySuccessful, reset } =
        useForm({
            image1: null,
            image2: null,
            image3: null,
            size: null,
            weight: null,
            public_memo: null,
            self_memo: null,
            lure: null,
            weather: 0,
            wind_direction: 0,
            date: null,
            temperature: null,
            water_temperature: null,
            latitude: location.lat,
            longitude: location.lng,
        });

    /**
     * 数字のみinputの入力禁止文字
     * 入力をonKeyDownで判定し、該当すれば入力イベント発火しない
     * @param {event} e
     * @returns
     */
    const blockInvalidChar = (e) =>
        ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

    /**
     * サイズのフォーマットチェック
     * @param {event} e
     */
    const changeSize = (e) => {
        var size = null;
        if (e.target.value.match("^(100|[0-9]{1,2}(?:\.[0-9])?)$")) {
        // if (e.target.value.match("^[0-9]{1,4}$")) {
            size = e.target.value;
        } else {
            // 0〜99以外の場合は元の値に戻す
            size = data.size;
        }
        // 値が空文字の場合はnullに変換
        if (e.target.value === "") {
            size = null;
        }
        setData("size", size);
    };

    /**
     * 重さのフォーマットチェック
     * @param {event} e
     */
    const changeWeight = (e) => {
        var weight = null;
        if (e.target.value.match("^[0-9]{1,4}$")) {
            weight = e.target.value;
        } else {
            // 0〜99以外の場合は元の値に戻す
            weight = data.weight;
        }
        // 値が空文字の場合はnullに変換
        if (e.target.value === "") {
            weight = null;
        }
        setData("weight", weight);
    };

    /**
     * 更新処理
     * @param {event} e
     */
    const submit = (e) => {
        e.preventDefault();

        post(route("record.update"), {
            forceFormData: true,
        });
    };

    const handleClose = () => {
        setCreateRecordModalOpen(false);
        reset();
    }
    return (
        <Modal show={createRecordModalOpen} onClose={handleClose}>
            <form onSubmit={submit} className="p-6 space-y-3">
                <div className="flex space-x-2 overflow-auto">
                    <div>
                        <CropImage
                            setData={setData}
                            imageUrl={null}
                            errors={errors}
                            setError={setError}
                            clearErrors={clearErrors}
                            imageName="image1"
                            previewText="画像を追加する"
                            processing={processing}
                        />
                        <InputError className="mt-2" message={errors.image1} />
                    </div>
                    {data.image1 != null &&
                        <div>
                            <CropImage
                                setData={setData}
                                imageUrl={null}
                                errors={errors}
                                setError={setError}
                                clearErrors={clearErrors}
                                imageName="image2"
                                previewText="画像を追加する"
                                processing={processing}
                            />
                            <InputError className="mt-2" message={errors.image2} />
                        </div>}
                    {data.image2 != null &&
                        <div>
                            <CropImage
                                setData={setData}
                                imageUrl={null}
                                errors={errors}
                                setError={setError}
                                clearErrors={clearErrors}
                                imageName="image3"
                                previewText="画像を追加する"
                                processing={processing}
                            />
                            <InputError className="mt-2" message={errors.image3} />
                        </div>
                    }
                </div>
                <div>
                    <FormControl
                        variant="standard"
                        sx={{ minWidth: 100 }}
                    >
                        <TextField
                            id="size"
                            label="サイズ"
                            type="number"
                            name="size"
                            className="block"
                            value={data.size  === null ? "" : data.size}
                            variant="standard"
                            error={errors.size}
                            onChange={(e) => changeSize(e)}
                            onKeyDown={blockInvalidChar}
                            autoComplete="off"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        cm
                                    </InputAdornment>
                                ),
                                inputProps: {
                                    min: 0,
                                    max: 500000,
                                },
                            }}
                        />
                        <InputError
                            className="mt-2"
                            message={errors.size}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl
                        variant="standard"
                        sx={{ minWidth: 100 }}
                    >
                        <TextField
                            id="weight"
                            label="重さ"
                            type="number"
                            name="weight"
                            className="block"
                            value={data.weight === null ? "" : data.weight}
                            variant="standard"
                            error={errors.weight}
                            onChange={(e) => changeWeight(e)}
                            onKeyDown={blockInvalidChar}
                            autoComplete="off"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        g
                                    </InputAdornment>
                                ),
                                inputProps: {
                                    min: 0,
                                    max: 500000,
                                },
                            }}
                        />
                        <InputError
                            className="mt-2"
                            message={errors.weight}
                        />
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="lure"
                        label="ルアー"
                        name="lure"
                        value={data.lure  === null ? "" : data.lure}
                        variant="standard"
                        error={errors.lure}
                        onChange={(e) =>
                            setData("lure", e.target.value)
                        }
                        className="block"
                        autoComplete="off"
                        required
                        fullWidth
                    />
                    <InputError
                        className="mt-2"
                        message={errors.lure}
                    />
                </div>
                <div>
                    <Label
                        className="text-[12px] text-gray-600"
                        htmlFor="weather"
                        value="天気"
                    />
                    <FormControl
                        variant="standard"
                        sx={{ mt: 1, mr: 1, minWidth: 100 }}
                    >
                        <Select
                            id="weather"
                            arrow=""
                            name="weather"
                            value={data.weather}
                            label="天候"
                            error={errors.weather}
                            onChange={(e) =>
                                setData("weather", e.target.value)
                            }
                            className="w-full"
                            inputProps={{ IconComponent: () => null }}
                        >
                            {weatherList.map((value, key) => (
                                <MenuItem
                                    key={key}
                                    value={key}
                                    selected={data.weather === key}
                                >
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Label
                        className="text-[12px] text-gray-600"
                        htmlFor="wind_direction"
                        value="風向"
                    />
                    <FormControl
                        variant="standard"
                        sx={{ mt: 1, mr: 1, minWidth: 100 }}
                    >
                        <Select
                            id="wind_direction"
                            arrow=""
                            name="wind_direction"
                            value={data.wind_direction}
                            label="風向"
                            error={errors.wind_direction}
                            onChange={(e) =>
                                setData(
                                    "wind_direction",
                                    e.target.value
                                )
                            }
                            className="w-full"
                            inputProps={{ IconComponent: () => null }}
                        >
                            {windDirectionList.map((value, key) => (
                                <MenuItem
                                    key={key}
                                    value={key}
                                    selected={data.wind_direction.toString() === key.toString()}
                                >
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="public_memo"
                        label="公開メモ"
                        name="public_memo"
                        type="textarea"
                        className="block"
                        value={data.public_memo  === null ? "" : data.public_memo}
                        variant="standard"
                        error={errors.public_memo}
                        onChange={(e) =>
                            setData("public_memo", e.target.value)
                        }
                        autoComplete="off"
                        rows={4}
                        multiline
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        id="self_memo"
                        label="非公開メモ"
                        name="self_memo"
                        type="textarea"
                        className="block"
                        value={data.self_memo  === null ? "" : data.self_memo}
                        variant="standard"
                        error={errors.self_memo}
                        onChange={(e) =>
                            setData("self_memo", e.target.value)
                        }
                        autoComplete="off"
                        rows={4}
                        multiline
                        fullWidth
                    />
                </div>
                <div className="flex items-center gap-4">
                    {processing ? (
                        <Button disabled variant="contained">
                            登録
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            onClick={submit}
                            variant="contained"
                        >
                            登録
                        </Button>
                    )}
                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-blue-600">
                            登録しました！
                        </p>
                    </Transition>
                </div>
            </form>
        </Modal>
    );
}

