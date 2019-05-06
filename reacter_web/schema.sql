DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS usernetwork;
DROP TABLE IF EXISTS authorship;
DROP TABLE IF EXISTS likes;

CREATE TABLE users (
    handle TEXT UNIQUE PRIMARY KEY,
    password TEXT UNIQUE NOT NULL,
    regular_name TEXT NOT NULL,
    bio TEXT
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    body TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    parent INTEGER,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE authorship (
    author TEXT,
    piece INTEGER,
    FOREIGN KEY (author) REFERENCES users (handle),
    FOREIGN KEY (piece) REFERENCES posts (id),
    PRIMARY KEY (author, piece)
);

CREATE TABLE likes (
    liker TEXT,
    postid INTEGER,
    FOREIGN KEY (liker) REFERENCES users (handle),
    FOREIGN KEY (postid) REFERENCES posts (id),
    PRIMARY KEY (liker, postid)
);

CREATE TABLE usernetwork (
    theFollower TEXT,
    userBeingFollowed TEXT,
    FOREIGN KEY (theFollower) REFERENCES users (handle),
    FOREIGN KEY (userBeingFollowed) REFERENCES users (handle),
    PRIMARY KEY (theFollower, userBeingFollowed)
);
