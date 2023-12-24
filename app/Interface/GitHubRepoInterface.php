<?php

namespace App\Interface;

interface GitHubRepoInterface {
    public function createRepo($repositoryName, $repositoryDescription);

    public function deleteRepo($repositoryName);

    public function getAllRemoteUrls();

}