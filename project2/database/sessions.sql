CREATE TABLE session
    (id INTEGER PRIMARY KEY DEFAULT(random()) NOT NULL,
    session TEXT NOT NULL,
    token TEXT NOT NULL,
    expires INTEGER NOT NULL);
