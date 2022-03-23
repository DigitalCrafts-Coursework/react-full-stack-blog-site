CREATE TABLE posts (
    id serial,
    post_id int primary key not null CHECK (title <> ''),
    title text not null CHECK (title <> ''),
    content text not null CHECK (content <> ''),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    post_id int references posts(post_id),
    name_ text CHECK (name_ <> ''),
    comment text CHECK (comment <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);