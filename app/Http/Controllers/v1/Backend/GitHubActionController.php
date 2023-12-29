<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Services\GitHubActionService;
use Illuminate\Http\Request;

class GitHubActionController extends Controller
{   
    public $git_action;
    public function __construct() {
        $this->git_action = new GitHubActionService();
    }

    public function git_push(Request $request) {
        $request->validate([
            'commit_name' => 'required',
        ]);
        
        $template = Template::with('git_info')->where('id', $request->template_id)->first();
        $commit_name = $request->commit_name;
        $repo_url = $template->git_info->remote_url;
        $branch_name = $template->git_info->branch_name;
        $response = $this->git_action->push($template->name, $branch_name, $commit_name, $repo_url);
        if($response['success'] == true) {
            return redirect()->back()->with('success', $response['message']);
        } else {
            return redirect()->back()->with('error', $response['message']);
        }
    }

    public function git_pull(Request $request) {
        
        $request->validate([
            'branch_name' => 'required',
        ]);

        $template_id = $request->template_id;
        $branch_name = $request->branch_name;
        $template = Template::with('git_info')->where('id', $template_id)->first();
        $response = $this->git_action->pull($template->name, $branch_name);
        if($response['success'] == true) {
            return redirect()->back()->with('success', $response['message']);
        } else {
            return redirect()->back()->with('error', $response['message']);
        }
    }
}
