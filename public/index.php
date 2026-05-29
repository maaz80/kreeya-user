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

// 3. Normal users (or fallback if proxy fails) serve standard React SPA index.html
if (file_exists('index.html')) {
    require_once('index.html');
} else {
    echo "Frontend Build not found. Please upload index.html.";
}
?>
