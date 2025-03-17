<?php
header('Content-Type: application/json');

// Database credentials
$dbHost = 'mysql104.unoeuro.com';
$dbName = 'mobilizr_eu_db';
$dbUser = 'mobilizr_eu';
$dbPass = 'eB25dtz3h6EmGxkcFwAp'; // Replace with your real password

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $description = $_POST['problem-desc'] ?? '';
    $email = $_POST['problem-email'] ?? '';
    $files = $_FILES['problem-files'] ?? null;

    if (empty($description)) {
        throw new Exception('Description is required');
    }

    $filePaths = '';
    if ($files && $files['error'][0] !== UPLOAD_ERR_NO_FILE) {
        $uploadDir = 'uploads/';
        if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);
        $fileNames = [];
        foreach ($files['tmp_name'] as $key => $tmpName) {
            if ($files['error'][$key] === UPLOAD_ERR_OK) {
                $fileName = basename($files['name'][$key]);
                $targetPath = $uploadDir . time() . '_' . $fileName;
                move_uploaded_file($tmpName, $targetPath);
                $fileNames[] = $targetPath;
            }
        }
        $filePaths = implode(', ', $fileNames);
    }

    $stmt = $pdo->prepare("INSERT INTO submissions (form_type, description, email, files) VALUES (?, ?, ?, ?)");
    $stmt->execute(['problem', $description, $email, $filePaths]);

    echo json_encode(['status' => 'success', 'message' => 'Problem submitted']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>