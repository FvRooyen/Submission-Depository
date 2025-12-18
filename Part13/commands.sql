CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text, 
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('Jan Nel', 'www.blogspace.com/12', 'How to set up a Relational Database');
INSERT INTO blogs (author, url, title) values ('Jan Nel', 'www.blogspace.com/16', 'The basics of MongoDB');