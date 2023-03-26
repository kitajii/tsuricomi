<?php

namespace App\Libs;

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
}