<?php

namespace App\Http\Controllers\v1\Backend;

use App\Helpers\FileHelper;
use App\Helpers\GeneralHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\MediaResource;
use App\Models\Admin;
use App\Models\MediaLibrary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaLibraryController extends Controller
{
    public function index(Request $request)
    {
        $parent_id = null;
        $old_parent_id = $request->old_parent_id;

        if ($request->parent_id) {
            $parent_id = $request->parent_id;
        }

        $media = MediaLibrary::with('children')
            ->where('parent_id', $parent_id)
            ->get();

        return Inertia::render('Media/Index', [
            'media' => MediaResource::collection($media),
            'parent_id' => $parent_id,
            'old_parent_id' => $old_parent_id,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $admin = auth('admin')->user();
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $mimetype = $file->getClientMimeType();
            $dir = GeneralHelper::getGeneralSetting('media-path');
            if (!$dir) {
                $dir = GeneralHelper::createGeneralSetting(['media-path', 'media/admin', 'text', 'admin', auth('admin')->id()]);
            }
            $path = FileHelper::uploadFile($file, $dir);
        } else {
            $path = null;
        }

        $admin->mediaFiles()->create([
            'parent_id' => $request->parent_id ?? null,
            'name' => $request->name,
            'type' => $request->type,
            'path' => $path,
            'mimetype' => $mimetype ?? null,
        ]);

        return redirect()->back();
    }

    public function delete($id)
    {
        $media = MediaLibrary::find($id);
        if ($media) {
            $media->delete();
        }
    }
}
