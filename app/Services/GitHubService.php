<?php 

namespace App\Services;

use PhpGit\Git;
use GuzzleHttp\Client;
use App\Interface\GitHubInterface;
use App\Models\GitInfo;
use App\Models\Template;

class GitHubService implements GitHubInterface {

    private $git;
    private $accessToken;
    private $organizationName;

    public function __construct() {
        $this->git = new Git();
        $this->accessToken =  env('GIT_ACCESS_TOKEN');
        $this->organizationName = "tennthone";
    }

    public function createRepo($repositoryName, $repositoryDescription)
    {
        try {
            $apiEndpoint = "https://api.github.com/orgs/$this->organizationName/repos";
            $client = new Client();
            $response = $client->request('POST', $apiEndpoint, [
                'headers' => [
                    'Authorization' => "Bearer $this->accessToken",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
                'json' => [
                    'name' => $repositoryName,
                    'description' => $repositoryDescription,
                    // You can include other repository settings here as needed
                ],
            ]);
            $createdRepository = json_decode($response->getBody(), true);
            return $createdRepository;
        } catch(\Exception $e) {
            return $e->getMessage();
        }
    }

    public function deleteRepo($repositoryName)
    {
        try {
            $apiEndpoint = "https://api.github.com/repos/$this->organizationName/$repositoryName";

            $client = new Client();
            $response = $client->request('DELETE', $apiEndpoint, [
                'headers' => [
                    'Authorization' => "Bearer $this->accessToken",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            // Check if the repository was successfully deleted (HTTP status 204)
            if ($response->getStatusCode() === 204) {
                return true;
            } else {
                // Handle errors if the repository deletion was not successful
                echo 'Error deleting repository. HTTP Status Code: ' . $response->getStatusCode();
                return false;
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function pull($templateName)
    {
        $repositoryPath = storage_path("app/templates/$templateName");
        $this->git->setRepository($repositoryPath);
        $this->git->pull('origin', 'main'); // Replace 'main' with the appropriate branch name
        dd('git pull done');
    }

    public function push($templateName, $branchName = "main", $commitName="first commit", $repoUrl)
    {
        // Assume $repositoryPath is the path to the cloned repository within your Laravel app
        $repositoryPath = storage_path("app/templates/$templateName");
        $this->git->setRepository($repositoryPath);
        $this->git->checkout($branchName);
        $this->git->add($repositoryPath);
        $this->git->commit($commitName);
        $this->git->push($repoUrl);
        dd('git push done');
    }

    public function clone($repositoryUrl, $templateName)
    {   
        $destination = storage_path("app/templates/$templateName");
        $this->git->clone($repositoryUrl, $destination);
        dd("clone done");
    }

    public function cloneAndCreateBranch($repositoryUrl, $branchName, $templateName)
    {   
        try {
            $repositoryPath = storage_path("app/templates/$templateName");
            $this->git->clone($repositoryUrl, $repositoryPath);
            $this->git->setRepository($repositoryPath);
            $this->git->checkout->create($branchName);
            $this->git->push($repositoryUrl);
            dd('clone and create branch');
        } catch (\Exception $e) {
            dd("Error: " . $e->getMessage());
        }
    }

    public function getAllRemoteUrls()
    {

        $apiEndpoint = "https://api.github.com/orgs/$this->organizationName/repos";

        $client = new Client();

        // Make a GET request to GitHub API to list repositories
        $response = $client->request('GET', $apiEndpoint, [
            'headers' => [
                'Authorization' => "Bearer $this->accessToken",
                'Accept' => 'application/vnd.github.v3+json',
            ],
        ]);

        // Decode the JSON response
        $repositories = json_decode($response->getBody(), true);
        return $repositories;
    }

    public function getAllBranches($repositoryUrl)
    {
        // $this->git->remote->branches($repositoryUrl, )
    }
}