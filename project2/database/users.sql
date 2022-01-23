CREATE TABLE user
    (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL);

CREATE TABLE session
    (id INTEGER PRIMARY KEY DEFAULT(random()) NOT NULL,
    session TEXT NOT NULL,
    token TEXT NOT NULL,
    expires INTEGER NOT NULL);  
