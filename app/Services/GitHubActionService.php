<?php

namespace App\Services;
use PhpGit\Git;

use App\Interface\GitHubActionInterface;
use Illuminate\Support\Facades\File;

class GitHubActionService implements GitHubActionInterface {
    private $git;
    public function __construct() {
        $this->git = new Git();
    }

    public function pull($templateName, $branchName = "main")
    {
        try {
            $repositoryPath = storage_path("app/public/resources/$templateName");
            $this->git->setRepository($repositoryPath);
            $this->git->pull('origin', $branchName); 
            return [
                'success' => true,
                'message' => 'Git Pull Done'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function push($templateName, $branchName = "main", $commitName="first commit", $repoUrl)
    {
        try {
            $repositoryPath = storage_path("app/public/resources/$templateName");
            if(!File::isEmptyDirectory($repositoryPath)) {
                $this->git->setRepository($repositoryPath);
                $this->git->add($repositoryPath);
                $this->git->commit($commitName);
                $this->git->push($repoUrl, $branchName);
                return [
                    'success' => true,
                    'message' => 'Commit Successfully'
                ];
            } else {
                return [
                    'success' => false,
                    'message' => "Directroy not exists"
                ];
            }
        } catch(\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function clone($repositoryUrl, $templateName)
    {   
        $repositoryPath = storage_path("app/public/resources/$templateName");
        if(!File::isDirectory($repositoryPath)) {
            $this->git->clone($repositoryUrl, $repositoryPath);
            return [
                'success' => true,
                'message' => "Clone successfully",
                'path' => $repositoryPath,
            ];
        } else {
            return [
                'success' => false,
                'message' => "Directory already exists",
                'path' => null,
            ];
        }
    }

    public function cloneAndCreateBranch($repositoryUrl, $branchName, $templateName)
    {   
        try {
            $repositoryPath = storage_path("app/public/resources/$templateName");
            $this->git->clone($repositoryUrl, $repositoryPath);
            $this->git->setRepository($repositoryPath);
            $this->git->checkout->create($branchName);
            $this->git->push($repositoryUrl);
            return [
                'success' => true,
                'message' => "Clone successfully",
                'path' => $repositoryPath,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'path' => null,
            ];
        }
    }
    
    public function getAllBranches($repositoryUrl)
    {
        // $this->git->remote->branches($repositoryUrl, )
    }
}