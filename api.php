<?php
header('Content-Type: application/json');
$host = "localhost";
$user = "root";
$password = "sua_senha";
$dbname = "sistema_tarefas";

$conn = new mysqli($host, $user, $password, $dbname);

if($conn->connect_error){
    die(json_encode(["erro" => $conn->connect_error]));
}

$acao = $_GET['acao'] ?? '';

if($acao == 'listar'){
    $result = $conn->query("SELECT * FROM tarefas");
    $tarefas = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($tarefas);
}
elseif($acao == 'adicionar'){
    $descricao = $_POST['descricao'];
    $conn->query("INSERT INTO tarefas (descricao) VALUES ('$descricao')");
    echo json_encode(["sucesso" => true]);
}
elseif($acao == 'deletar'){
    $id = $_POST['id'];
    $conn->query("DELETE FROM tarefas WHERE id=$id");
    echo json_encode(["sucesso" => true]);
}
elseif($acao == 'concluir'){
    $id = $_POST['id'];
    $conn->query("UPDATE tarefas SET concluida=1 WHERE id=$id");
    echo json_encode(["sucesso" => true]);
}

$conn->close();
?>
