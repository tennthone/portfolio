<?php

namespace App\Http\Resources\Backend;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AdminResource extends JsonResource
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
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'gender' => $this->gender,
            'roles' => $this->getRoleNames(),
            'isActive' => $this->isActive,
            'isDeleted' => $this->deleted_at != null ? true : false,
            'profile_image' => !empty($this->image->path) ? Storage::url($this->image->path) : null,
            'created_at' => $this->created_at->toFormattedDateString(),
        ];
    }
}
