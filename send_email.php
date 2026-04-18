<?php
// Set headers to allow cross-origin requests if needed, and to return JSON
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Get JSON POST data
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

// Extract required fields
$firstName = isset($data['firstName']) ? trim($data['firstName']) : '';
$lastName  = isset($data['lastName']) ? trim($data['lastName']) : '';
$email     = isset($data['email']) ? trim($data['email']) : '';
$phone     = isset($data['phone']) ? trim($data['phone']) : '';
$message   = isset($data['message']) ? trim($data['message']) : '';

// Basic validation
if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Email recipient
$to = 'admin@jointmt.net';

// Email subject
$subject = "New Website Inquiry from $firstName $lastName";

// Email body
$email_content = "You have received a new message from the website contact form.\n\n";
$email_content .= "Name: $firstName $lastName\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n\n";
$email_content .= "Message:\n$message\n";

// Email headers
$headers = "From: webmaster@jointmt.net\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send the email. Please try again later.']);
}
