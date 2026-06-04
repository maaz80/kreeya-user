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
    ["loc" => "$siteUrl/contact-us", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.9"],
    ["loc" => "$siteUrl/about-us", "lastmod" => $today, "changefreq" => "monthly", "priority" => "0.9"],
    ["loc" => "$siteUrl/category/blogs", "lastmod" => "2025-03-18", "changefreq" => "weekly", "priority" => "0.9"],
    ["loc" => "$siteUrl/portfolio-beyekls", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.9"],
    ["loc" => "$siteUrl/portfolio-nectar", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.9"],
    ["loc" => "$siteUrl/portfolio-coinpay", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.9"],
    ["loc" => "$siteUrl/portfolio-daccord", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.9"],
    ["loc" => "$siteUrl/privacy-policy", "lastmod" => "2025-03-18", "changefreq" => "yearly", "priority" => "0.9"],
    ["loc" => "$siteUrl/disclaimer", "lastmod" => "2025-03-18", "changefreq" => "yearly", "priority" => "0.9"],
    ["loc" => "$siteUrl/landing-page", "lastmod" => "2025-03-18", "changefreq" => "monthly", "priority" => "0.9"]
];

// 2. Fetch locations, services, blogs & portfolios from live API
$locationsRes = fetchJson("$apiUrl/locations");
$servicesRes = fetchJson("$apiUrl/services");
$blogsRes = fetchJson("$apiUrl/blogs");
$portfoliosRes = fetchJson("$apiUrl/portfolios");

$locations = getItems($locationsRes);
$services = getItems($servicesRes);
$blogs = getItems($blogsRes);
$portfolios = getItems($portfoliosRes);

if (is_array($locations)) {
    foreach ($locations as $loc) {
        $items = isset($loc['items']) ? $loc['items'] : [];
        foreach ($items as $item) {
            if (isset($item['slug']) && !empty($item['slug'])) {
                $slug = normalizeRouteSlug($item['slug']);
                $urlData = [
                    "loc" => "$siteUrl/$slug",
                    "lastmod" => $today,
                    "changefreq" => "weekly",
                    "priority" => "0.9"
                ];
                if (isset($item['image']) && !empty($item['image'])) {
                    $title = isset($item['title']) ? $item['title'] : (isset($item['hero']['title']) ? $item['hero']['title'] : '');
                    $caption = isset($item['description']) ? $item['description'] : (isset($item['hero']['description']) ? $item['hero']['description'] : '');
                    $urlData["image"] = [
                        "loc" => $item['image'],
                        "title" => $title,
                        "caption" => $caption
                    ];
                }
                $urls[] = $urlData;
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
                $urlData = [
                    "loc" => "$siteUrl/$slug",
                    "lastmod" => $today,
                    "changefreq" => "weekly",
                    "priority" => "0.9"
                ];
                if (isset($item['image']) && !empty($item['image'])) {
                    $title = isset($item['title']) ? $item['title'] : (isset($item['hero']['title']) ? $item['hero']['title'] : '');
                    $caption = isset($item['description']) ? $item['description'] : (isset($item['hero']['description']) ? $item['hero']['description'] : '');
                    $urlData["image"] = [
                        "loc" => $item['image'],
                        "title" => $title,
                        "caption" => $caption
                    ];
                }
                $urls[] = $urlData;
            }
        }
    }
}

if (is_array($blogs)) {
    foreach ($blogs as $blog) {
        if (isset($blog['slug']) && !empty($blog['slug'])) {
            $slug = normalizeRouteSlug($blog['slug']);
            $urlData = [
                "loc" => "$siteUrl/$slug",
                "lastmod" => $today,
                "changefreq" => "weekly",
                "priority" => "0.9"
            ];
            if (isset($blog['image']) && !empty($blog['image'])) {
                $title = isset($blog['title']) ? $blog['title'] : '';
                $caption = isset($blog['alt']) ? $blog['alt'] : (isset($blog['title']) ? $blog['title'] : '');
                $urlData["image"] = [
                    "loc" => $blog['image'],
                    "title" => $title,
                    "caption" => $caption
                ];
            }
            $urls[] = $urlData;
        }
    }
}

if (is_array($portfolios)) {
    foreach ($portfolios as $portfolio) {
        if (isset($portfolio['name']) && !empty($portfolio['name'])) {
            $slug = normalizeRouteSlug(str_replace(' ', '-', strtolower($portfolio['name'])));
            $urlData = [
                "loc" => "$siteUrl/$slug",
                "lastmod" => $today,
                "changefreq" => "weekly",
                "priority" => "0.9"
            ];
            if (isset($portfolio['cards'][0]['image']) && !empty($portfolio['cards'][0]['image'])) {
                $title = isset($portfolio['title']) ? $portfolio['title'] : $portfolio['name'];
                $caption = isset($portfolio['description']) ? $portfolio['description'] : '';
                $urlData["image"] = [
                    "loc" => $portfolio['cards'][0]['image'],
                    "title" => $title,
                    "caption" => $caption
                ];
            }
            $urls[] = $urlData;
        }
    }
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . PHP_EOL;
echo '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . PHP_EOL;
foreach ($urls as $url) {
    echo '  <url>' . PHP_EOL;
    echo '    <loc>' . htmlspecialchars($url['loc']) . '</loc>' . PHP_EOL;
    echo '    <lastmod>' . $url['lastmod'] . '</lastmod>' . PHP_EOL;
    echo '    <changefreq>' . $url['changefreq'] . '</changefreq>' . PHP_EOL;
    echo '    <priority>' . $url['priority'] . '</priority>' . PHP_EOL;
    if (isset($url['image']) && !empty($url['image'])) {
        echo '    <image:image>' . PHP_EOL;
        echo '      <image:loc>' . htmlspecialchars($url['image']['loc']) . '</image:loc>' . PHP_EOL;
        if (!empty($url['image']['title'])) {
            echo '      <image:title>' . htmlspecialchars($url['image']['title']) . '</image:title>' . PHP_EOL;
        }
        if (!empty($url['image']['caption'])) {
            echo '      <image:caption>' . htmlspecialchars($url['image']['caption']) . '</image:caption>' . PHP_EOL;
        }
        echo '    </image:image>' . PHP_EOL;
    }
    echo '  </url>' . PHP_EOL;
}
echo '</urlset>' . PHP_EOL;
?>
