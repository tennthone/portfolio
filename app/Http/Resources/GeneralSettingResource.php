<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class GeneralSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'value' => $this->getValue(),
            'type' => $this->type,
            'category' => $this->category,
        ];
    }

    protected function getValue()
    {
        if($this->type == 'file') {
            $value = Storage::url($this->value);
        } else {
            $value = $this->value;
        }
        return $value;
    }
}
