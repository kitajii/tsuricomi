<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecordUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'image1' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:10240'],
            'image2' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:10240'],
            'image3' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:10240'],
            'fishing_date' => ['required', 'date_format:Y/m/d'],
            'fishing_time' => ['required', 'date_format:H:i'],
            'size' => ['required', 'integer'],
            'weight' => ['required', 'integer'],
            'public_memo' => ['nullable', 'string'],
            'self_memo' => ['nullable', 'string'],
            'lure' => ['nullable', 'string'],
            'weather' => ['nullable', 'integer'],
            'wind_direction' => ['nullable', 'integer'],
            'latitude' => ['required', 'between:-90,90'],
            'longitude' => ['required', 'between:-180,180'],
        ];
    }

    /**
     * バリデーションメッセージ
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'image1.required' => ':attributeは必ず1枚選択してください。',
        ];
    }

    /**
     * バリデーションが走る前に実行されます
     *
     * @return void
     */
    public function getValidatorInstance()
    {
        $fishingTime = isset($this->fishing_time) ? substr($this->fishing_time, -5) : null;
        $this->merge([
            'fishing_time' => $fishingTime,
        ]);

        return parent::getValidatorInstance();
    }
}
