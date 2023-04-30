<?php

namespace App\Libs;

use Illuminate\Support\Facades\Storage;

class Util
{

    /**
     * 指定した範囲の数を配列にして返します
     * 「年」等のselectリスト生成用
     *
     * @param int $start
     * @param int $end
     * @param boolean $reverse
     * @return array
     */
    public static function getSelectNum($start, $end, $reverse = false)
    {
        $returnArray = [];
        for ($i = $start; $i <= $end; $i++) {
            $returnArray[$i] = $i;
        }
        // 順番を逆にする
        if ($reverse) {
            $returnArray = array_reverse($returnArray, true);
        }
        return $returnArray;
    }

    /**
     * 指定したファイルを削除する
     *
     * @param string $targetPath
     * @param string $deleteFileName
     * @return void
     */
    public static function deleteFile($targetPath, $deleteFileName)
    {
        if (file_exists($targetPath)) {
            $targetFiles = glob($targetPath . '*');
            foreach ($targetFiles as $targetFile) {
                $fileNamePosition = strrpos($targetFile, '/');
                $fileName = substr($targetFile, $fileNamePosition + 1); //ファイル名だけ抽出
                //ファイルが存在しない場合
                if (!file_exists($targetFile)) {
                    continue;
                }
                if ($fileName == $deleteFileName) {
                    // 削除パス生成（Storage::deleteでは storage/app 配下のパスを指定する）
                    $deletePathPosition = strrpos($targetFile, '/boat');
                    $deletePath = substr($targetFile, $deletePathPosition);
                    Storage::delete($deletePath); //ファイル削除
                }
            }
        }
        return;
    }
}