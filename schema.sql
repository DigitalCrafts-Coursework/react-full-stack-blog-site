CREATE TABLE posts (
    id serial primary key,
    title text not null CHECK (title <> ''),
    content text not null CHECK (content <> ''),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id int references posts(id),
    name_ text not null CHECK (name_ <> ''),
    comment text not null CHECK (comment <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);