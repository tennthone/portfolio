<?php

namespace App\Interface;

interface GitHubActionInterface {
    
    public function pull($templateName);

    public function clone($repositoryUrl, $templateName);

    public function push($templateName, $branchName, $commitName,  $repoUrl);

    public function cloneAndCreateBranch($repositoryUrl, $branchName, $templateName);

    public function getAllBranches($repositoryUrl);
}