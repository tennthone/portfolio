<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MediaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->mediable_id,
            'parent_id' => $this->parent_id,
            'name' => $this->name,
            'path' => $this->path,
            'type' => $this->type,
            'size' => $this->path != null ? Storage::size($this->path) : '',
            'mimetype' => $this->mimetype,
            'children' => $this->children,
        ];
    }
}
