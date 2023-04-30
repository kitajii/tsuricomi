<?php

namespace App\Http\Controllers;

use App\Http\Requests\IconUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Libs\Util;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
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

        $iconUrl = isset($auth->profile->icon_path) ? url('profile/get-icon/'. $auth->profile->id . '/' . $auth->profile->icon_path . '/') : null;

        return Inertia::render('Profile/Edit', [
            'auth' => $auth,
            'birthdaySelectElement' => [
                'yearList' => $yearList,
                'monthList' => $monthList,
                'dayList' => $dayList,
            ],
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'iconUrl' => $iconUrl,
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
        //年月日全てnullかどうか
        $isBirthdayAllNull = is_null($request->birthday_year) && is_null($request->birthday_month) && is_null($request->birthday_day);
        // 有効な日付じゃない && 年月日いずれかにデータがセットされている:更新不可（全てnullだったら更新可）
        if (!$isEnableDate && !$isBirthdayAllNull) {
            $errors = new \Illuminate\Support\MessageBag();
            $errors->add('birthday', '生年月日を正しく選択してください');
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
     * Update the user's profile icon.
     */
    public function IconUpdate(IconUpdateRequest $request): RedirectResponse
    {
        $profile = $request->user()->profile;
        DB::beginTransaction();
        try {
        $profile->saveIcon($request->file('icon'));
            DB::commit();
        } catch (\Exception $e) {
            Log::error($e);
            DB::rollBack();
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

    /**
     * アイコン画像取得
     *
     * @param integer $id
     * @param string $filename
     * @return void
     */
    public function getIcon($id, $fileName)
    {
        // $myId = Auth::user()->id;
        // ボートIDに紐づくショップが存在しない、または、ボートIDが他ショップのボートだった場合404
        $filepath = 'icon/' . $id . '/' . $fileName;
        // ファイルがない場合404
        if (!Storage::exists($filepath)) {
            return abort(404);
        }
        $image = Storage::get($filepath);
        return response()->make($image, 200, [
            'Content-Type'        => Storage::mimeType($filepath),
            'Content-Disposition' => 'inline; filename="' . $filepath . '"'
        ]);
    }
}
