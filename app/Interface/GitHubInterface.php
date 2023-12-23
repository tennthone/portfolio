<?php

namespace App\Interface;

interface GitHubInterface {
    public function createRepo($repositoryName, $repositoryDescription);

    public function deleteRepo($repositoryName);

    public function pull($templateName);

    public function clone($repositoryUrl, $templateName);

    public function push($templateName, $branchName, $commitName,  $repoUrl);

    public function cloneAndCreateBranch($repositoryUrl, $branchName, $templateName);

    public function getAllRemoteUrls();

    public function getAllBranches($repositoryUrl);
}