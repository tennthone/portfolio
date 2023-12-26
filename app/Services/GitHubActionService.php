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

    public function pull($templateName)
    {
        try {
            $repositoryPath = storage_path("app/resources/$templateName");
            $this->git->setRepository($repositoryPath);
            $this->git->pull('origin', 'main'); // Replace 'main' with the appropriate branch name
            dd('git pull done');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function push($templateName, $branchName = "main", $commitName="first commit", $repoUrl)
    {
        try {
            $repositoryPath = storage_path("app/resources/$templateName");
            if(!File::isDirectory($repositoryPath)) {
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
                    'message' => "Directroy already exists"
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
        $destination = storage_path("app/resources/$templateName");
        if(!File::isDirectory($destination)) {
            $this->git->clone($repositoryUrl, $destination);
            return [
                'success' => true,
                'message' => "Clone successfully",
                'path' => $destination,
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
            $repositoryPath = storage_path("app/resources/$templateName");
            $this->git->clone($repositoryUrl, $repositoryPath);
            $this->git->setRepository($repositoryPath);
            $this->git->checkout->create($branchName);
            $this->git->push($repositoryUrl);
            dd('clone and create branch');
        } catch (\Exception $e) {
            dd("Error: " . $e->getMessage());
        }
    }
    
    public function getAllBranches($repositoryUrl)
    {
        // $this->git->remote->branches($repositoryUrl, )
    }
}