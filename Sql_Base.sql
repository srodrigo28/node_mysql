-- Comando para alterar a senha mestre do banco
    ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('123');
-- Comando para criar uma base de dados simples
    create dabase escola;
-- Comando para excluir um banco
    drop database celke
-- Comando completo para criar uma base de dados
    create database celke character set utf8mb4 collate utf8mb4_unicode_ci;
-- Comando para setar database default
    use celke;

-- exemplo 1 Criando tabela
    CREATE TABLE if not exists users1(
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(40) NOT NULL,
        email VARCHAR(50) NOT NULL,
        senha VARCHAR(50) NOT NULL
    );

-- exemplo 2 Criando tabela
    CREATE TABLE if not exists users4(
        id int NOT NULL AUTO_INCREMENT,
        nome VARCHAR(40) NOT NULL,
        email VARCHAR(50) NOT NULL,
        senha VARCHAR(50) NOT NULL,
        PRIMARY KEY(id)
    );

-- exemplo 3 Criando tabela
    CREATE TABLE if not exists users5(
        id int NOT NULL AUTO_INCREMENT,
        nome VARCHAR(40) NOT NULL,
        email VARCHAR(50) NOT NULL,
        senha VARCHAR(50) NOT NULL,
        PRIMARY KEY(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exemplo 4 Criando tabel usando if not exists
    CREATE TABLE if not exists users(
        id int AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(40) NOT NULL,
        email VARCHAR(50),
        senha VARCHAR(50) NOT NULL
    );

-- Drop Table
    -- Drop Table Exemplo 1
    drop table users1;
    -- Drop Table Exemplo 2
    drop table if exists users2;

-- Select
    -- Select Exemplo 1
    SELECT * FROM users;
    -- Select Exemplo 2
    SELECT id, nome, email FROM users;

-- Select ASC
    SELECT * FROM users ORDER BY id ASC;

-- Select DESC
    SELECT * FROM users ORDER BY id DESC;
-- ## Select Like Implementar
-- Select Usando LIMIT
    -- Select Exemplo 1
    SELECT * FROM users LIMIT 3;
    -- Select Exemplo 2
    SELECT * FROM users LIMIT 3 OFFSET 2;

-- Select Usando WHERE
    -- Select Exemplo 1
    SELECT * FROM users WHERE email = 'ana@gmail.com';
    -- Select Exemplo 2
    SELECT * FROM users WHERE id = 1;
    -- Select Exemplo 3
    SELECT * FROM users WHERE email = 'ana@gmail.com' LIMIT 1;

-- Select Usando WHERE E AND OR
    -- Select com 2 condições Email e Nome
    SELECT * FROM users WHERE email = 'ana@gmail.com' AND nome = 'ana1';
    -- Select com 2 condições Email ou Nome
    SELECT * FROM users WHERE email = 'ana@gmail.com' OR nome = 'ana1';

-- Insert
    INSERT INTO users(nome, email, senha) VALUES('bastiao', 'bast@gmail.com', '123');
-- Update WHERE pegando pelo id e modificando
    UPDATE users SET nome = 'ana maria', email = 'anam@oi.com' WHERE id = 5;
-- Delete Apagando registro
    DELETE FROM users WHERE id = 1;
