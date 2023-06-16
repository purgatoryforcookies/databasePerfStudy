CREATE TABLE users (
    id SERIAL,
    created TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    modified TIMESTAMP WITHOUT TIME ZONE,
    name VARCHAR(150) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(120) NOT NULL,
    address VARCHAR(400) NOT NULL,
    uuid VARCHAR(400) NOT NULL
);

CREATE TABLE log_pods (
    id SERIAL,
    created TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    queyryPodIp VARCHAR(400) NOT NULL,
    serverPodIp VARCHAR(400) NOT NULL
);

CREATE INDEX idx_users_name ON users (name);

INSERT INTO users (name, email, phone, address, uuid)
VALUES ('John Doe', 'john@example.com', '1234567890', '123 Main St', 'abcd1234');