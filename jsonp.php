<?php
// Get the API URL and callback function from the query parameters
$apiUrl = $_GET['api'];
$callback = $_GET['callback'];

// Fetch data from the API using cURL
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === false) {
    // Handle errors appropriately, e.g., log the error, send an error response
    die('Error fetching data from API');
}

// Set the content type header to application/javascript
header('Content-Type: application/javascript');

// Echo the callback function with the fetched data
echo "$callback($response)";
?>
