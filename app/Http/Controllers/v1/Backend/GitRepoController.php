<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Services\GitHubRepoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GitRepoController extends Controller
{   
    private $git;

    public function __construct() {
        $this->git = new GitHubRepoService();
    }

    public function index() {
        $repos = $this->git->getAllRemoteUrls();
        $repo_collect = collect($repos)->transform(function($item) {
            return [
                'name' => $item['name'],
                'clone_url' => $item['clone_url'],
                'visiblity' => $item['visibility'],
                'url' => $item['url']
            ];
        });
        return Inertia::render('Backend/GitRepo/Index', [
            'repos'  => $repo_collect,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required'
        ]);

        $name = $request->name;
        $description = $request->description;
        $this->git->createRepo($name, $description);
        return to_route('admin.gitrepo.index');
    }

    public function delete($name) {
        $this->git->deleteRepo($name);
        return redirect()->back();
    }
}
