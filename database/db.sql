-- Creamos la tabla de tasks
-- SERIAL -> es para que el campo sea un numero que se incrementa automaticamente
CREATE TABLE IF NOT EXISTS tasks(
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description VARCHAR(200) NOT NULL,
	created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Query para crear un task en la tabla tasks
INSERT INTO tasks(title, description) VALUES ('Task 1', 'Description 1');