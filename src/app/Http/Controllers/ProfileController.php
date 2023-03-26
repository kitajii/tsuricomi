<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Libs\Util;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $auth = Auth::user()->load('profile');
        //年は降順で表示するが、ここで降順で取得してもview側に渡ると自動的に昇順になってしまうため、View側で降順に変形する
        $yearList = Util::getSelectNum(1900, date('Y'));
        $monthList = Util::getSelectNum(1, 12);
        $dayList = Util::getSelectNum(1, 31);

        return Inertia::render('Profile/Edit', [
            'auth' => $auth,
            'birthdaySelectElement' => [
                'yearList' => $yearList,
                'monthList' => $monthList,
                'dayList' => $dayList,
            ],
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // 生年月日が正しい日付か確認
        $isEnableDate = false;
        if (isset($request->birthday_year) && isset($request->birthday_month) && isset($request->birthday_day)) {
            $isEnableDate = checkdate($request->birthday_month,$request->birthday_day ,$request->birthday_year);
        }
        if ((!$isEnableDate)) {
            $errors = new \Illuminate\Support\MessageBag();
            $errors->add('birthday', '生年月日を正しく入力してください');
            return Redirect::route('profile.edit')->withInput()->withErrors($errors);
        }
        try {
            $request->user()->fill($request->all());
            $request->user()->profile->fill($request->all());
            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }
            $request->user()->profile->save();
            $request->user()->save();
        } catch (\Exception $e) {
            throw $e;
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
