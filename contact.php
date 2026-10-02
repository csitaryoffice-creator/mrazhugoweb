<?php
declare(strict_types=1);

/*
 * ÉLESÍTÉS ELŐTT:
 * 1. Ellenőrizze a DotRoll tárhelyen, hogy a PHP mail() engedélyezett-e.
 * 2. Ha külső űrlapszolgáltatást használ, az index.html form action értékét cserélje ki.
 */

$recipient = 'klimaszereles1204@gmail.com';
$siteUrl = 'https://klimaszerelo-villanyszerelo.hu/';

function redirectWithState(string $state): void
{
    global $siteUrl;
    header('Location: ' . $siteUrl . '?form=' . rawurlencode($state) . '#kapcsolat', true, 303);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Ez a végpont csak POST kérést fogad.');
}

if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    redirectWithState('config');
}

$honeypot = trim((string)($_POST['website'] ?? ''));
if ($honeypot !== '') {
    redirectWithState('success');
}

$startedAt = filter_var($_POST['form_started_at'] ?? null, FILTER_VALIDATE_INT);
if ($startedAt && (time() - $startedAt < 3 || time() - $startedAt > 86400)) {
    redirectWithState('error');
}

function cleanText(string $value, int $maxLength): string
{
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maxLength)
        : substr($value, 0, $maxLength);
}

$name = cleanText((string)($_POST['name'] ?? ''), 120);
$phone = cleanText((string)($_POST['phone'] ?? ''), 40);
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_SANITIZE_EMAIL);
$city = cleanText((string)($_POST['city'] ?? ''), 100);
$service = cleanText((string)($_POST['service'] ?? ''), 100);
$message = cleanText((string)($_POST['message'] ?? ''), 3000);
$privacy = (string)($_POST['privacy'] ?? '');

if ($name === '' || $phone === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $privacy !== 'accepted') {
    redirectWithState('error');
}

if (!preg_match('/^[0-9+()\/ .-]{7,40}$/', $phone)) {
    redirectWithState('error');
}

if (preg_match_all('/https?:\/\//i', $message) > 3) {
    redirectWithState('error');
}

$subject = 'Új ajánlatkérés a weboldalról';
$body = implode("\n", [
    'Név: ' . $name,
    'Telefonszám: ' . $phone,
    'E-mail: ' . $email,
    'Település: ' . ($city !== '' ? $city : 'nincs megadva'),
    'Szolgáltatás: ' . ($service !== '' ? $service : 'nincs kiválasztva'),
    '',
    'Üzenet:',
    $message !== '' ? $message : 'nincs megadva',
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Weboldal <' . $recipient . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($recipient, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
redirectWithState($sent ? 'success' : 'error');
