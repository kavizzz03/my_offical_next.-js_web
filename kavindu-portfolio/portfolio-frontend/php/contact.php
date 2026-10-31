<?php
/**
 * contact.php
 * Receives the portfolio contact form and emails it to Kavindu.
 * Hosted at: https://admin.asbfashion.com/Contact/contact.php
 * (the folder name is Contact with a capital C: Linux servers are case-sensitive)
 * Then set NEXT_PUBLIC_CONTACT_URL=https://admin.asbfashion.com/Contact/contact.php in the Next.js project.
 */

declare(strict_types=1);

/* ================= SETTINGS ================= */
$TO_EMAIL   = 'kavindumalshan2003@gmail.com';        // where messages are delivered
$FROM_EMAIL = 'no-reply@asbfashion.com';              // MUST be on the domain of THIS cPanel server (asbfashion.com)
$SITE_NAME  = 'Kavindu Portfolio';
$ALLOWED_ORIGINS = [                                  // websites allowed to call this script
    'https://www.kavindubogahawatte.dev',
    'https://kavindubogahawatte.dev',
    'http://localhost:3000',
];
$MAX_PER_HOUR   = 5;       // messages allowed per visitor IP per hour
$SEND_AUTOREPLY = false;   // true = also send the visitor a short "thanks" email
/* ============================================ */

date_default_timezone_set('Asia/Colombo');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/* ---------- CORS ---------- */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    if (in_array($origin, $ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 86400');
    } elseif (($_SERVER['REQUEST_METHOD'] ?? '') !== 'OPTIONS') {
        respond(403, ['ok' => false, 'error' => 'Origin not allowed.']);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Use POST.']);
}

/* ---------- read the body (JSON or normal form post) ---------- */
$raw  = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
}

/* ---------- spam trap: real visitors never fill this hidden field ---------- */
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

/* ---------- clean and validate ---------- */
function one_line(string $s, int $max): string
{
    $s = strip_tags($s);
    $s = preg_replace('/[\r\n\t]+/', ' ', $s) ?? '';
    $s = trim($s);
    return function_exists('mb_substr') ? mb_substr($s, 0, $max, 'UTF-8') : substr($s, 0, $max);
}

$name    = one_line((string)($data['name'] ?? ''), 100);
$email   = one_line((string)($data['email'] ?? ''), 150);
$message = trim(strip_tags((string)($data['message'] ?? '')));
$message = str_replace(["\r\n", "\r"], "\n", $message);
$message = function_exists('mb_substr') ? mb_substr($message, 0, 5000, 'UTF-8') : substr($message, 0, 5000);

$len = function_exists('mb_strlen') ? 'mb_strlen' : 'strlen';

if ($len($name) < 2) {
    respond(422, ['ok' => false, 'error' => 'Please enter your name.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}
if ($len($message) < 5) {
    respond(422, ['ok' => false, 'error' => 'Please write a short message.']);
}

/* ---------- simple rate limit per IP ---------- */
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/kb_contact_' . md5($ip) . '.json';
$now = time();
$hits = [];
if (is_file($rlFile)) {
    $old = json_decode((string)@file_get_contents($rlFile), true);
    if (is_array($old)) {
        $hits = array_values(array_filter($old, fn($t) => is_int($t) && $t > $now - 3600));
    }
}
if (count($hits) >= $MAX_PER_HOUR) {
    respond(429, ['ok' => false, 'error' => 'Too many messages. Please try again later or email me directly.']);
}
$hits[] = $now;
@file_put_contents($rlFile, json_encode($hits), LOCK_EX);

/* ---------- build the email ---------- */
$encode = fn(string $s): string => '=?UTF-8?B?' . base64_encode($s) . '?=';

$subject = 'New portfolio message from ' . $name;
$when    = date('D, d M Y H:i') . ' (Colombo time)';
$ua      = one_line((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 200);

$body  = "You received a new message from your portfolio website.\n\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Time:    {$when}\n";
$body .= "IP:      {$ip}\n\n";
$body .= "Message:\n----------------------------------------\n{$message}\n----------------------------------------\n\n";
$body .= "Hit Reply to answer {$name} directly.\n";
$body .= "Browser: {$ua}\n";

$safeName = preg_replace('/[^\p{L}\p{N} .\'-]/u', '', $name) ?: 'Visitor';

$headers  = 'From: ' . $encode($SITE_NAME) . " <{$FROM_EMAIL}>\r\n";
$headers .= 'Reply-To: ' . $encode($safeName) . " <{$email}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= 'X-Mailer: PHP/' . PHP_VERSION . "\r\n";

$sent = @mail($TO_EMAIL, $encode($subject), $body, $headers, '-f' . $FROM_EMAIL);

/* ---------- optional "thanks" email to the visitor ---------- */
if ($sent && $SEND_AUTOREPLY) {
    $replyBody  = "Hi {$safeName},\n\nThanks for getting in touch. I received your message and will reply soon.\n\n";
    $replyBody .= "Kavindu Bogahawatte\nIndependent Software Engineer, Colombo\n";
    $replyHead  = 'From: ' . $encode($SITE_NAME) . " <{$FROM_EMAIL}>\r\n";
    $replyHead .= "Reply-To: {$TO_EMAIL}\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    @mail($email, $encode('Thanks for your message'), $replyBody, $replyHead, '-f' . $FROM_EMAIL);
}

/* ---------- backup copy, stored ABOVE public_html so nobody can open it in a browser ---------- */
$root = $_SERVER['DOCUMENT_ROOT'] ?? '';
if ($root !== '') {
    $logFile = dirname($root) . '/kb-contact-messages.log';
    $entry = '[' . date('Y-m-d H:i:s') . '] ' . ($sent ? 'SENT' : 'MAIL FAILED') . " | {$name} <{$email}> | " . str_replace("\n", ' ', $message) . "\n";
    @file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);
}

if ($sent) {
    respond(200, ['ok' => true, 'message' => 'Message sent.']);
}
respond(500, ['ok' => false, 'error' => 'Could not send right now. Please email me directly.']);
