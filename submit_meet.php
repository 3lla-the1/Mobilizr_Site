<?php
header('Content-Type: application/json');

// Database credentials (from Simply.com MySQL section)
$dbHost = 'mysql104.unoeuro.com';
$dbName = 'mobilizr_eu_db';
$dbUser = 'mobilizr_eu'; // Replace with your MySQL username
$dbPass = 'eB25dtz3h6EmGxkcFwAp'; // Replace with your MySQL password

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get JSON input from the request
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract data
    $name = $input['meet-name'] ?? '';
    $email = $input['meet-email'] ?? '';
    $phone = $input['meet-phone'] ?? '';
    $timeSlots = json_encode(array_filter([
        $input['meet-time1'] ?? '',
        $input['meet-time2'] ?? '',
        $input['meet-time3'] ?? ''
    ])); // Store time slots as JSON
    $notes = $input['meet-notes'] ?? '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($input['meet-time1'])) {
        throw new Exception('Missing required fields');
    }

    // Insert into database
    $stmt = $pdo->prepare("INSERT INTO submissions (form_type, name, email, phone, time_slots, notes) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->execute(['meet', $name, $email, $phone, $timeSlots, $notes]);
    // Success response
    echo json_encode(['status' => 'success', 'message' => 'Submission received']);
} catch (Exception $e) {
    // Error response
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>

