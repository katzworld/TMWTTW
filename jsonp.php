<!DOCTYPE html>
<html>
<body>
<?php
$api = $_GET["api"];
if (!preg_match('/^http/i', $api)) exit;
$callback = $_GET["callback"];
header('Content-Type: application/javascript');
$data = file_get_contents($api);
echo $callback."(".$data.")";
?>
</body>
</html>
