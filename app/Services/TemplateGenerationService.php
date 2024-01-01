<?php

namespace App\Services;

use App\Models\Template;
use Illuminate\Support\Facades\Storage;
use Twig\Loader\FilesystemLoader;
use Twig\Environment;

class TemplateGenerationService {

    private $twigTemplate;
    private $basePath;
    private $template;
    
    public function __construct(string $templateId) {
        $this->generateTemplateFiles($templateId);
    }
    
    public function generateTemplate() {
        if($this->template) {
            $renderData = [
                'asset_path' => Storage::url('resources/' .$this->template->name . '/'),
                'page' => 'home',
                'sections' => [
                    'hero',
                    'about',
                ],
                "hero_sec" => [
                    'name' => "Paing lay"
                ]
            ];
            $finalOutput = $this->twigTemplate->render($renderData);
            echo $finalOutput;
            return [
                'success' => true,
                'output' => $finalOutput,
            ];
        } else {
            return [
                'success' => false,
                'message' => "Template Not Found",
            ];
        }
    }

    private function generateTemplateFiles(int $templateId) {
        $this->template = Template::with('git_info')->find($templateId);
        $this->basePath = storage_path('app/public/resources/'.$this->template->name);
        $loader = new FilesystemLoader($this->basePath);
        $twig = new Environment($loader);
        $this->twigTemplate = $twig->load('public/index.html');
    }

    private function generateTemplateData() {

    }
}
