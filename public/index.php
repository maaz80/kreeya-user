<?php
// 1. Detect Bots/Crawlers (Googlebot, Bingbot, WhatsApp, Facebook, LinkedIn, Twitter, etc.)
$userAgent = $_SERVER['HTTP_USER_AGENT'];
$isBot = preg_match('/baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|redditbot|Applebot|WhatsApp|flipboard|tumblr|bitlybot|SkypeUriPreview|nuzzel|Discordbot|GooglePageSpeedInsights|Qwantify|pinterest|gitbook:brand|Baiduspider|yandex|yandexbot|yahoo|bingbot|googlebot/i', $userAgent);

// Exclude static assets/files from proxying
$requestUri = $_SERVER['REQUEST_URI'];
$isAsset = preg_match('/\.(css|js|gif|png|jpg|jpeg|svg|ico|webp|woff|woff2|mp4|json|xml|txt)$/i', $requestUri);

if ($isBot && !$isAsset) {
    // 2. Fetch from Prerender.io via PHP cURL (Since mod_proxy is disabled on Hostinger shared hosting)
    $prerenderUrl = "https://service.prerender.io/https://kreeyadesign.com" . $requestUri;
    
    $ch = curl_init($prerenderUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Hostinger SSL handshake bug fix
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 12);
    
    // Set a custom User-Agent to satisfy Prerender requirements
    curl_setopt($ch, CURLOPT_USERAGENT, 'PrerenderProxy/1.0 (' . $userAgent . ')');
    
    // If they have a token, they can set it here:
    // curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-Prerender-Token: YOUR_TOKEN'));
    
    $html = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($statusCode == 200 && !empty($html)) {
        header("Content-Type: text/html; charset=utf-8");
        echo $html;
        exit;
    }
}

// 3. Normal users (or fallback if proxy fails) serve standard React SPA index.html with dynamically injected SEO tags
if (file_exists('index.html')) {
    $html = file_get_contents('index.html');

    // Get current URL pathname (no query params, strip trailing slash except for root)
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if ($path !== '/') {
        $path = rtrim($path, '/');
    }
    
    // Construct canonical URL
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $host = $_SERVER['HTTP_HOST'];
    $canonicalUrl = $protocol . $host . $path;

    // Load SEO data from json if exists
    $seoTitle = "Kreeya Design | Social Media & Web Design/Development Agency";
    $seoDescription = "AI-powered creative services for enterprises and scale faster with on-demand design, marketing creatives, and flexible solutions that boost growth and performance.";
    $seoKeywords = "";
    $triggerFetch = false;

    $seoJson = [];
    if (file_exists('seo-data.json')) {
        $seoJson = json_decode(file_get_contents('seo-data.json'), true);
        if (!is_array($seoJson)) {
            $seoJson = [];
        }
    }

    if (isset($seoJson[$path])) {
        $pageSeo = $seoJson[$path];
        if (!empty($pageSeo['title'])) {
            $seoTitle = $pageSeo['title'];
        }
        if (!empty($pageSeo['description'])) {
            $seoDescription = $pageSeo['description'];
        }
        if (!empty($pageSeo['keywords'])) {
            $seoKeywords = $pageSeo['keywords'];
        }
        
        // Cache lifetime: 10 minutes (600 seconds)
        if (!isset($pageSeo['fetched_at']) || (time() - $pageSeo['fetched_at'] > 600)) {
            $triggerFetch = true;
            $seoJson[$path]['fetched_at'] = time();
            file_put_contents('seo-data.json', json_encode($seoJson, JSON_PRETTY_PRINT), LOCK_EX);
        }
    } else {
        $triggerFetch = true;
        $seoJson[$path] = [
            'title' => $seoTitle,
            'description' => $seoDescription,
            'keywords' => $seoKeywords,
            'fetched_at' => time()
        ];
        file_put_contents('seo-data.json', json_encode($seoJson, JSON_PRETTY_PRINT), LOCK_EX);
    }

    // Inject SEO tags in <head>
    $seoTags = "\n  <!-- Dynamically injected SEO headers by index.php -->";
    $seoTags .= "\n  <link rel=\"canonical\" href=\"" . htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') . "\" />";
    $seoTags .= "\n  <meta property=\"og:url\" content=\"" . htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') . "\" />";
    
    // We insert right after <head> tag
    $html = preg_replace('/<head>/i', "<head>" . $seoTags, $html, 1);

    // Replace or insert <title> tag
    if (!empty($seoTitle)) {
        if (preg_match('/<title>.*?<\/title>/i', $html)) {
            $html = preg_replace('/<title>.*?<\/title>/i', "<title>" . htmlspecialchars($seoTitle, ENT_QUOTES, 'UTF-8') . "</title>", $html, 1);
        } else {
            $html = preg_replace('/<head>/i', "<head>\n  <title>" . htmlspecialchars($seoTitle, ENT_QUOTES, 'UTF-8') . "</title>", $html, 1);
        }
    }

    // Replace or insert description
    if (!empty($seoDescription)) {
        if (preg_match('/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i', $html)) {
            $html = preg_replace('/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i', '<meta name="description" content="' . htmlspecialchars($seoDescription, ENT_QUOTES, 'UTF-8') . '" />', $html, 1);
        } else {
            $html = preg_replace('/<head>/i', "<head>\n  <meta name=\"description\" content=\"" . htmlspecialchars($seoDescription, ENT_QUOTES, 'UTF-8') . "\" />", $html, 1);
        }
    }

    // Replace or insert keywords
    if (!empty($seoKeywords)) {
        if (preg_match('/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i', $html)) {
            $html = preg_replace('/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i', '<meta name="keywords" content="' . htmlspecialchars($seoKeywords, ENT_QUOTES, 'UTF-8') . '" />', $html, 1);
        } else {
            $html = preg_replace('/<head>/i', "<head>\n  <meta name=\"keywords\" content=\"" . htmlspecialchars($seoKeywords, ENT_QUOTES, 'UTF-8') . "\" />", $html, 1);
        }
    }

    header("Content-Type: text/html; charset=utf-8");

    if ($triggerFetch) {
        // Ob Buffer starts
        ob_start();
        echo $html;
        $size = ob_get_length();
        
        // Output headers to close the connection to user
        header("Content-Length: $size");
        header("Connection: close");
        ob_end_flush();
        flush();

        // If PHP-FPM, finish the request
        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }

        // Run background refresh process
        ignore_user_abort(true);
        set_time_limit(60);

        $staticPageIds = [
            '/' => 'home',
            '/contact-us' => 'contact-us',
            '/about-us' => 'about-us',
            '/category/blogs' => 'blogs',
            '/portfolio-beyekls' => 'portfolio-beyekls',
            '/portfolio-daccord' => 'portfolio-daccord',
            '/portfolio-coinpay' => 'portfolio-coinpay',
            '/portfolio-nectar' => 'portfolio-nectar',
            '/privacy-policy' => 'privacy-policy',
            '/disclaimer' => 'disclaimer',
            '/landing-page' => 'landing-page',
            '/portfolios' => 'portfolios',
            '/services' => 'services'
        ];

        $apiUrl = "https://api.kreeyadesign.com/api";
        $updatedSeo = null;

        if (isset($staticPageIds[$path])) {
            $pageId = $staticPageIds[$path];
            $url = $apiUrl . "/pages/" . $pageId . "/seo";
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 5);
            $res = curl_exec($ch);
            curl_close($ch);

            if ($res) {
                $data = json_decode($res, true);
                if ($data) {
                    $updatedSeo = [
                        'title' => isset($data['title']) ? $data['title'] : '',
                        'description' => isset($data['description']) ? $data['description'] : '',
                        'keywords' => isset($data['keywords']) ? $data['keywords'] : ''
                    ];
                }
            }
        } else {
            $slug = ltrim($path, '/');
            $slug = str_replace('_', '-', strtolower(trim($slug)));

            // Try blog
            $url = $apiUrl . "/blogs/" . $slug;
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 3);
            $res = curl_exec($ch);
            curl_close($ch);

            if ($res) {
                $data = json_decode($res, true);
                if ($data && (isset($data['title']) || isset($data['seoTitle']))) {
                    $updatedSeo = [
                        'title' => isset($data['seoTitle']) ? $data['seoTitle'] : (isset($data['title']) ? $data['title'] : ''),
                        'description' => isset($data['seoDescription']) ? $data['seoDescription'] : (isset($data['content']) ? strip_tags(substr($data['content'], 0, 150)) : ''),
                        'keywords' => isset($data['seoKeywords']) ? $data['seoKeywords'] : ''
                    ];
                }
            }

            if (!$updatedSeo) {
                // Fetch locations list
                $url = $apiUrl . "/locations";
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_TIMEOUT, 3);
                $res = curl_exec($ch);
                curl_close($ch);

                if ($res) {
                    $locations = json_decode($res, true);
                    $list = [];
                    if (is_array($locations)) {
                        $list = isset($locations['data']) ? $locations['data'] : (isset($locations['locations']) ? $locations['locations'] : $locations);
                    }
                    if (is_array($list)) {
                        foreach ($list as $loc) {
                            if (isset($loc['items']) && is_array($loc['items'])) {
                                foreach ($loc['items'] as $item) {
                                    if (isset($item['slug']) && str_replace('_', '-', strtolower(trim($item['slug']))) === $slug) {
                                        $updatedSeo = [
                                            'title' => isset($item['seoTitle']) ? $item['seoTitle'] : (isset($item['metaTitle']) ? $item['metaTitle'] : (isset($item['title']) ? $item['title'] : '')),
                                            'description' => isset($item['seoDescription']) ? $item['seoDescription'] : (isset($item['metaDescription']) ? $item['metaDescription'] : (isset($item['description']) ? $item['description'] : '')),
                                            'keywords' => isset($item['keywords']) ? $item['keywords'] : ''
                                        ];
                                        break 2;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (!$updatedSeo) {
                // Fetch services list
                $url = $apiUrl . "/services";
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_TIMEOUT, 3);
                $res = curl_exec($ch);
                curl_close($ch);

                if ($res) {
                    $services = json_decode($res, true);
                    $list = [];
                    if (is_array($services)) {
                        $list = isset($services['data']) ? $services['data'] : (isset($services['services']) ? $services['services'] : $services);
                    }
                    if (is_array($list)) {
                        foreach ($list as $srv) {
                            if (isset($srv['items']) && is_array($srv['items'])) {
                                foreach ($srv['items'] as $item) {
                                    if (isset($item['slug']) && str_replace('_', '-', strtolower(trim($item['slug']))) === $slug) {
                                        $updatedSeo = [
                                            'title' => isset($item['seoTitle']) ? $item['seoTitle'] : (isset($item['metaTitle']) ? $item['metaTitle'] : (isset($item['title']) ? $item['title'] : '')),
                                            'description' => isset($item['seoDescription']) ? $item['seoDescription'] : (isset($item['metaDescription']) ? $item['metaDescription'] : (isset($item['description']) ? $item['description'] : '')),
                                            'keywords' => isset($item['keywords']) ? $item['keywords'] : ''
                                        ];
                                        break 2;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if ($updatedSeo) {
            // Re-read file to avoid overwriting edits made during background task
            $seoJson = [];
            if (file_exists('seo-data.json')) {
                $seoJson = json_decode(file_get_contents('seo-data.json'), true);
                if (!is_array($seoJson)) {
                    $seoJson = [];
                }
            }
            $seoJson[$path] = [
                'title' => $updatedSeo['title'],
                'description' => $updatedSeo['description'],
                'keywords' => $updatedSeo['keywords'],
                'fetched_at' => time()
            ];
            file_put_contents('seo-data.json', json_encode($seoJson, JSON_PRETTY_PRINT), LOCK_EX);
        }
    } else {
        echo $html;
    }
    exit;
} else {
    echo "Frontend Build not found. Please upload index.html.";
}
?>
