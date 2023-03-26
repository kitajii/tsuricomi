<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'experience' => ['nullable', 'integer', 'max:100'],
        ];
    }

    // /**
    //  * バリデーションが走る前に実行されます
    //  *
    //  * @return void
    //  */
    // public function getValidatorInstance()
    // {
    //     //生年月日,郵便番号をここで結合
    //     // $birthday = implode('/', $this->birthday);

    //     // 年月日いずれかが未選択だったらnullとしてバリデーションチェック回避
    //     // if(!isset($this->birthdayYear) || !isset($this->birthdayMonth) || !isset($this->birthdayDay)) {
    //     //     $birthday = null;
    //     // }
    //     // $this->merge([
    //     //     'birthday' => $birthday,
    //     // ]);
    //     return parent::getValidatorInstance();
    // }
}
