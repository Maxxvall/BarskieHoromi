<?php
// public/api/send-order.php
// Small proxy that forwards order text to MAX Bot API.
// IMPORTANT: Replace $BOT_TOKEN with your real bot token on the SERVER.

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// === CONFIGURATION ===
// Replace with your actual values on the server. Keep token server-side.
$BOT_TOKEN = 'f9LHodD0cOIMSX4DVw_tPfc-aJXaHRHwoB8dUO7g6pRw6EedjmM2HbUeLl09A2AuMemf4qaGjEOnN_88nlVD';
$ADMIN_USER_ID = 282124260; // your MAX user id

// Read request body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['text'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing text in request body']);
    exit;
}

// Prepare payload for MAX API
$payload = json_encode([
    'userId' => $ADMIN_USER_ID,
    'text' => $input['text'],
    'format' => 'markdown'
]);

$ch = curl_init('https://platform-api.max.ru/messages');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: ' . $BOT_TOKEN
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Failed to reach MAX API', 'details' => $curlError]);
    exit;
}

http_response_code($httpCode);
echo $response;
