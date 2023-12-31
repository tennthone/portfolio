<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionComponentResource extends JsonResource
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
            'value' => $this->value,
            'component_designs' => $this->component_designs->transform(function($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'component_name' => $item->component->name,
                ];
            }),
        ];
    }
}
