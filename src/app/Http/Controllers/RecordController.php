<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecordUpdateRequest;
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

class RecordController extends Controller
{
    /**
     * 釣果登録・更新
     */
    public function update(RecordUpdateRequest $request)
    {
        dd($request->all());
    }

    /**
     * 釣果一覧
     */
    public function list(Request $request)
    {
    }

    /**
     * 釣果詳細
     */
    public function detail(Request $request)
    {
    }

    /**
     * 釣果削除
     */
    public function destroy(Request $request)
    {
    }

    /**
     * 釣果画像取得
     *
     * @param integer $id
     * @param string $filename
     * @return void
     */
    public function getImage($id, $fileName)
    {
        $filepath = 'record_image/' . $id . '/' . $fileName;
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
