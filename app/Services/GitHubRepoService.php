<?php

namespace App\Services;

use GuzzleHttp\Client;
use App\Interface\GitHubRepoInterface;
use App\Models\GitInfo;
use App\Models\Template;

class GitHubRepoService implements GitHubRepoInterface
{

    private $accessToken;
    private $organizationName;

    public function __construct()
    {
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
        } catch (\Exception $e) {
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

    public function addFolderToRepo($repositoryName, $folderPath)
    {
        try {
            $addedItems = [];
            $this->recursiveAdd($folderPath, '', $repositoryName, $addedItems);
            return [
                'success' => true,
                'message' => "Repo created successfully",
                'data' => $addedItems,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'data' => null,
            ];
        }
    }

    private function recursiveAdd($path, $baseFolder, $repositoryName, &$addedItems)
    {
        foreach (scandir($path) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }

            $fullPath = $path . '/' . $item;
            $relativePath = $baseFolder . '/' . $item;

            if (is_dir($fullPath)) {
                // Recursively add subfolder and its contents
                $this->recursiveAdd($fullPath, $relativePath, $repositoryName, $addedItems);
            } else {
                // Add individual file
                $this->addFileToRepo($repositoryName, $relativePath, file_get_contents($fullPath), $addedItems);
            }
        }
    }

    private function addFileToRepo($repositoryName, $relativePath, $fileContent, &$addedItems)
    {   
        $relativePath = ltrim($relativePath, '/');
        $apiEndpoint = "https://api.github.com/repos/$this->organizationName/$repositoryName/contents/$relativePath";

        try {
            $client = new Client();
            $response = $client->request('PUT', $apiEndpoint, [
                'headers' => [
                    'Authorization' => "Bearer $this->accessToken",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
                'json' => [
                    'message' => 'Add file from folder',
                    'content' => base64_encode($fileContent),
                ],
            ]);

            if ($response->getStatusCode() === 201) {
                $addedItem = json_decode($response->getBody(), true);
                $addedItems[] = $addedItem;
            } else {
                throw new \Exception('Failed to add file. HTTP Status Code: ' . $response->getStatusCode());
            }
        } catch (\Exception $e) {
            throw new \Exception('Error adding file: ' . $e->getMessage());
        }
    }
}
