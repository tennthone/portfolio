<?php

namespace App\Services {

use App\Models\GitInfo;
use App\Models\Template;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

    use App\Services\GitHubActionService;

    class TemplateService {
        private $gitservice;

        public function __construct() {
            $this->gitservice = new GitHubActionService();
        }

        public function createResource(array $templateData) {
            $res = $this->createTemplate($templateData);
            if($res['success']) {
                $gitResponse = $this->gitservice->clone($templateData['remote_url'], $templateData['name']);
                if($gitResponse['success']) {
                    return [
                        'success' => true,
                        'message' => "Template Resource Successfully",
                    ];
                } else {
                    $res['data']->delete();
                    throw ValidationException::withMessages([
                        'name' => "Name already exists",
                    ]);
                }
            } else {
                return $res;
            }  
        }

        public function createWebsite(array $templateData) {
            $res = $this->cloneTemplate($templateData);
            if($res['success']) {
                $gitResponse = $this->gitservice->cloneAndCreateBranch($templateData['template_id'], $templateData['branch_name'],$templateData['name']);
                if($gitResponse['success']) {
                    return [
                        'success' => true,
                        'message' => "Clone Successfully",
                    ];
                } else {
                    $res['data']->delete();
                    throw ValidationException::withMessages([
                        'name' => "Name already exists",
                    ]);
                }
            } else {
                return $res;
            }    
        }

        private function createTemplate(array $templateData) {
            try {
                $result = DB::transaction(function() use($templateData) {
                        $template = Template::create([
                            'name' => $templateData['name'],
                            'isResource' => $templateData['template_usage'] == 'resource' ? true : false,
                        ]);
                
                        // create git info 
                        $base_path = 'app/resources/'.$template->name;
                        GitInfo::create([
                            'template_id' => $template->id,
                            'base_path' => $base_path,
                            'remote_url' => $templateData['remote_url'],
                            'branch_name' => $branch_name ?? 'main'
                        ]);

                        return $template;
                });
                return [
                    'success' => true,
                    'message' => "Clone Successfully",
                    'data' => $result
                ];
            } catch(\Exception $e) {    
                return [
                    'success' => false,
                    'message' => $e->getMessage(),
                ];
            }
        }

        public function cloneTemplate(array $templateData) {
            $template = Template::with('git_info')
                        ->whereHas('git_info', function($q) use ($templateData) {
                            $q->where('remote_url', $templateData['template_id']);
                        })
                        ->where('isResource', 1)
                        ->first();
            if ($template) {
                try {
                    $result = DB::transaction(function() use($template, $templateData) {
                        // duplicate template 
                        $duplicateTemplate = $template->replicate();
                        $duplicateTemplate->isResource = false;
                        $duplicateTemplate->name = $templateData['name'];
                        $duplicateTemplate->save();

                        // duplicate gitinfo 
                        $duplicateGitInfo = $template->git_info->replicate();
                        $duplicateGitInfo->branch_name = $templateData['branch_name'];
                        $base_path = 'app/resources/'.$duplicateTemplate->name;
                        $duplicateGitInfo->base_path = $base_path;
                        $duplicateGitInfo->template_id = $duplicateTemplate->id;
                        $duplicateGitInfo->save();

                        // Duplicate template fields
                        $template->fields->each(function ($field) use ($duplicateTemplate) {
                            $duplicateField = $field->replicate();
                            $duplicateTemplate->fields()->save($duplicateField);
                        });
    
                        // Duplicate Pages
                        $template->pages->each(function ($page) use ($duplicateTemplate) {
                            $duplicatePage = $page->replicate();
                            $duplicateTemplate->pages()->save($duplicatePage);
    
                            // Duplicate PageData
                            $page->fields->each(function ($field) use ($duplicatePage) {
                                $duplicatePageField = $field->replicate();
                                $duplicatePage->fields()->save($duplicatePageField);
                            });
    
                            // Duplicate Sections
                            $page->sections->each(function ($section) use ($duplicatePage) {
                                $duplicateSection = $section->replicate();
                                $duplicatePage->sections()->save($duplicateSection);
    
                                // Duplicate Section Fields
                                $section->fields->each(function ($field) use ($duplicateSection) {
                                    $duplicateSectionField = $field->replicate();
                                    $duplicateSection->fields()->save($duplicateSectionField);
                                });
                            });
                        });
                        return $duplicateTemplate;
                    });
                    $response = array(
                        'success' => true,
                        'data' => $result,
                    );
                    return $response;
                } catch (\Exception $e) {
                    $response = array(
                        'success' => false,
                        'message' => $e->getMessage(),
                    );
                    return $response;
                }
            }

        }
    }
}