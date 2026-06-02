<?php
header("Content-Type: application/xml; charset=utf-8");

$apiUrl = "https://api.kreeyadesign.com/api";
$siteUrl = "https://kreeyadesign.com";
$today = date('Y-m-d');

function fetchJson($url) {
    if (function_exists('curl_version')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'SitemapGenerator/1.0');
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    } else {
        $response = @file_get_contents($url);
        return json_decode($response, true);
    }
}

function normalizeRouteSlug($value) {
    $val = strtolower(trim($value));
    $val = str_replace('_', '-', $val);
    return $val;
}

function getItems($res) {
    if (is_array($res)) {
        if (isset($res['data'])) return $res['data'];
        if (isset($res['locations'])) return $res['locations'];
        if (isset($res['services'])) return $res['services'];
        return $res;
    }
    return [];
}

// 1. Static Pages
$urls = [
    ["loc" => "$siteUrl/", "lastmod" => "2025-03-18", "changefreq" => "weekly", "priority" => "1.0"],
    ["loc" => "$siteUrl/contact-us", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.8"],
    ["loc" => "$siteUrl/about-us", "lastmod" => $today, "changefreq" => "monthly", "priority" => "0.8"],
    ["loc" => "$siteUrl/category/blogs", "lastmod" => "2025-03-18", "changefreq" => "weekly", "priority" => "0.8"],
    ["loc" => "$siteUrl/portfolio-beyekls", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.7"],
    ["loc" => "$siteUrl/portfolio-nectar", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.7"],
    ["loc" => "$siteUrl/portfolio-coinpay", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.7"],
    ["loc" => "$siteUrl/portfolio-daccord", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.7"],
    ["loc" => "$siteUrl/policy", "lastmod" => "2025-03-18", "changefreq" => "yearly", "priority" => "0.5"],
    ["loc" => "$siteUrl/disclaimer", "lastmod" => "2025-03-18", "changefreq" => "yearly", "priority" => "0.5"],
    ["loc" => "$siteUrl/landing-page", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.7"]
];

// 2. Fetch locations, services & blogs from live API
$locationsRes = fetchJson("$apiUrl/locations");
$servicesRes = fetchJson("$apiUrl/services");
$blogsRes = fetchJson("$apiUrl/blogs");

$locations = getItems($locationsRes);
$services = getItems($servicesRes);
$blogs = getItems($blogsRes);

if (is_array($locations)) {
    foreach ($locations as $loc) {
        $items = isset($loc['items']) ? $loc['items'] : [];
        foreach ($items as $item) {
            if (isset($item['slug']) && !empty($item['slug'])) {
                $slug = normalizeRouteSlug($item['slug']);
                $urls[] = [
                    "loc" => "$siteUrl/$slug",
                    "lastmod" => $today,
                    "changefreq" => "weekly",
                    "priority" => "0.9"
                ];
            }
        }
    }
}

if (is_array($services)) {
    foreach ($services as $serv) {
        $items = isset($serv['items']) ? $serv['items'] : [];
        foreach ($items as $item) {
            if (isset($item['slug']) && !empty($item['slug'])) {
                $slug = normalizeRouteSlug($item['slug']);
                $urls[] = [
                    "loc" => "$siteUrl/$slug",
                    "lastmod" => $today,
                    "changefreq" => "weekly",
                    "priority" => "0.9"
                ];
            }
        }
    }
}

if (is_array($blogs)) {
    foreach ($blogs as $blog) {
        if (isset($blog['slug']) && !empty($blog['slug'])) {
            $slug = normalizeRouteSlug($blog['slug']);
            $urls[] = [
                "loc" => "$siteUrl/$slug",
                "lastmod" => $today,
                "changefreq" => "weekly",
                "priority" => "0.9"
            ];
        }
    }
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;
foreach ($urls as $url) {
    echo '  <url>' . PHP_EOL;
    echo '    <loc>' . htmlspecialchars($url['loc']) . '</loc>' . PHP_EOL;
    echo '    <lastmod>' . $url['lastmod'] . '</lastmod>' . PHP_EOL;
    echo '    <changefreq>' . $url['changefreq'] . '</changefreq>' . PHP_EOL;
    echo '    <priority>' . $url['priority'] . '</priority>' . PHP_EOL;
    echo '  </url>' . PHP_EOL;
}
echo '</urlset>' . PHP_EOL;
?>
