<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Services\GitHubActionService;
use Illuminate\Http\Request;

class GitHubActionController extends Controller
{
    public function git_push(Request $request) {
        $template_id = $request->template_id;
        $template = Template::with('git_info')->where('id', $template_id)->first();
        $commit_name = $request->data['commit_name'];
        $repo_url = $template->git_info->remote_url;
        $branch_name = $template->git_info->branch_name;
        $git = new GitHubActionService();
        $response = $git->push($template->name, $branch_name, $commit_name, $repo_url);
        if($response['success'] == true) {
            return to_route('admin.template.resource.file');
        } else {
            return to_route('admin.template.resource.file')->with('message', $response);
        }
    }
}
