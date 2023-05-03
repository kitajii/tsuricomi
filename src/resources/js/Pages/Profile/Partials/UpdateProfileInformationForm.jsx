import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    birthdaySelectElement,
    className,
}) {
    const user = usePage().props.auth;
    const [yearList, setYearList] = useState([]);
    const [monthList, setMonthList] = useState([]);
    const [dayList, setDayList] = useState([]);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.profile.name,
            email: user.email,
            birthday_year: user.profile.birthday_year,
            birthday_month: user.profile.birthday_month,
            birthday_day: user.profile.birthday_day,
            experience: user.profile.experience,
            introduction: user.profile.introduction,
        });

    /**
     * 生年月日のセレクト生成
     */
    useEffect(() => {
        setYearList(Object.values(birthdaySelectElement.yearList).reverse());
        setMonthList(Object.values(birthdaySelectElement.monthList));
        setDayList(Object.values(birthdaySelectElement.dayList));
    }, []);

    /**
     * 釣り歴の入力禁止文字
     * 入力をonKeyDownで判定し、該当すれば入力イベント発火しない
     * @param {event} e
     * @returns
     */
    const blockInvalidChar = (e) =>
        ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

    /**
     * 釣り歴のフォーマットチェック
     * @param {event} e
     */
    const changeExperience = (e) => {
        var experience = null;
        if (e.target.value.match("^[0-9]{1,2}$")) {
            experience = e.target.value;
        } else {
            // 0〜99以外の場合は元の値に戻す
            experience = data.experience;
        }
        // 値が空文字の場合はnullに変換
        if (e.target.value === "") {
            experience = null;
        }
        setData("experience", experience);
    };

    /**
     * 更新処理
     * @param {event} e
     */
    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    プロフィール
                </h2>

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
                        onChange={(e) => setData("name", e.target.value)}
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
                        onChange={(e) => setData("email", e.target.value)}
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
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                確認メールを再送信するには、こちらをクリックしてください。
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-blue-600">
                                確認リンクがメールアドレスに送信されました。
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <Label
                        className="text-[12px] text-gray-600"
                        htmlFor="birthday"
                        value="生年月日"
                    />
                    <FormControl
                        variant="standard"
                        sx={{ mt: 1, mr: 1, minWidth: 100 }}
                    >
                        <InputLabel id="year">年</InputLabel>
                        <Select
                            id="year"
                            arrow=""
                            name="birthday_year"
                            value={data.birthday_year}
                            label="年"
                            error={errors.birthday}
                            onChange={(e) =>
                                setData("birthday_year", e.target.value)
                            }
                            className="w-full"
                            inputProps={{ IconComponent: () => null }}
                        >
                            {yearList.map((year) => (
                                <MenuItem
                                    key={year}
                                    value={year.toString()}
                                    selected={
                                        data.birthday_year === year.toString()
                                    }
                                >
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ mt: 1, mr: 1, minWidth: 100 }}
                    >
                        <InputLabel id="month">月</InputLabel>
                        <Select
                            id="month"
                            arrow=""
                            name="birthday_month"
                            value={data.birthday_month}
                            label="年"
                            error={errors.birthday}
                            onChange={(e) =>
                                setData("birthday_month", e.target.value)
                            }
                            className="w-full"
                            inputProps={{ IconComponent: () => null }}
                        >
                            {monthList.map((month) => (
                                <MenuItem
                                    key={month}
                                    value={month.toString()}
                                    selected={
                                        data.birthday_month === month.toString()
                                    }
                                >
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ mt: 1, mr: 1, minWidth: 100 }}
                    >
                        <InputLabel id="day">日</InputLabel>
                        <Select
                            id="day"
                            arrow=""
                            name="birthday_day"
                            value={data.birthday_day}
                            label="年"
                            error={errors.birthday}
                            onChange={(e) =>
                                setData("birthday_day", e.target.value)
                            }
                            className="w-full"
                            inputProps={{ IconComponent: () => null }}
                        >
                            {dayList.map((day) => (
                                <MenuItem
                                    key={day}
                                    value={day.toString()}
                                    selected={
                                        data.birthday_day === day.toString()
                                    }
                                >
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <InputError className="mt-2" message={errors.birthday} />
                </div>
                <div>
                    <FormControl variant="standard" sx={{ minWidth: 100 }}>
                        <TextField
                            id="experience"
                            label="釣り歴"
                            type="number"
                            name="experience"
                            className="block"
                            value={data.experience}
                            variant="standard"
                            error={errors.experience}
                            onChange={(e) => changeExperience(e)}
                            onKeyDown={blockInvalidChar}
                            autoComplete="off"
                            fullWidth
                            InputProps={{
                                // shrink: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        年
                                    </InputAdornment>
                                ),
                                inputProps: {
                                    min: 0,
                                    max: 99,
                                },
                            }}
                        />
                        <InputError
                            className="mt-2"
                            message={errors.experience}
                        />
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="introduction"
                        label="コメント"
                        name="introduction"
                        type="textarea"
                        className="block"
                        value={data.introduction}
                        variant="standard"
                        error={errors.introduction}
                        onChange={(e) =>
                            setData("introduction", e.target.value)
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
                            更新
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            onClick={submit}
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
