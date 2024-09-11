--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS Users (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT    NOT NULL,
  surname TEXT    NOT NULL
);

INSERT INTO Users (id, name, surname) VALUES (1, 'Lucine', 'Draper');
INSERT INTO Users (id, name, surname) VALUES (2, 'Ives', 'Spedding');
INSERT INTO Users (id, name, surname) VALUES (3, 'Hewitt', 'Harse');
INSERT INTO Users (id, name, surname) VALUES (4, 'Roobbie', 'Speenden');
INSERT INTO Users (id, name, surname) VALUES (5, 'Shalne', 'Seide');
INSERT INTO Users (id, name, surname) VALUES (6, 'Letty', 'Clohisey');
INSERT INTO Users (id, name, surname) VALUES (7, 'Idelle', 'Harfleet');
INSERT INTO Users (id, name, surname) VALUES (8, 'Angelle', 'Tarbard');
INSERT INTO Users (id, name, surname) VALUES (9, 'Batsheva', 'Playle');
INSERT INTO Users (id, name, surname) VALUES (10, 'Nedda', 'Lundy');
INSERT INTO Users (id, name, surname) VALUES (11, 'Westbrook', 'Coulson');
INSERT INTO Users (id, name, surname) VALUES (12, 'Emmott', 'Hatton');
INSERT INTO Users (id, name, surname) VALUES (13, 'Nerty', 'Bauckham');
INSERT INTO Users (id, name, surname) VALUES (14, 'Alyce', 'Routledge');
INSERT INTO Users (id, name, surname) VALUES (15, 'Lazaro', 'Grieswood');


CREATE TABLE IF NOT EXISTS Events (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT    NOT NULL,
  date TEXT    NOT NULL,
  max_capacity INTEGER NOT NULL,
  host_id INTEGER REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS User_Events (
  participant_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  FOREIGN KEY (participant_id) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES Events(id)  ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE(participant_id, event_id)
);


INSERT INTO Events (id, name, date, max_capacity, host_id) VALUES (1, 'Photography 1', '10/2/2023', 5, 3);
INSERT INTO Events (id, name, date, max_capacity, host_id) VALUES (2, 'Photography 2', '8/17/2024', 5, 3);
INSERT INTO Events (id, name, date, max_capacity, host_id) VALUES (3, 'Dancing', '3/15/2024', 20, 1);

INSERT INTO User_Events (participant_id, event_id) VALUES (1, 1);
INSERT INTO User_Events (participant_id, event_id) VALUES (2, 1);
INSERT INTO User_Events (participant_id, event_id) VALUES (4, 1);
INSERT INTO User_Events (participant_id, event_id) VALUES (5, 1);
INSERT INTO User_Events (participant_id, event_id) VALUES (6, 1);
INSERT INTO User_Events (participant_id, event_id) VALUES (7, 2);
INSERT INTO User_Events (participant_id, event_id) VALUES (8, 2);
INSERT INTO User_Events (participant_id, event_id) VALUES (9, 2);
INSERT INTO User_Events (participant_id, event_id) VALUES (10, 2);
INSERT INTO User_Events (participant_id, event_id) VALUES (11, 2);
INSERT INTO User_Events (participant_id, event_id) VALUES (1, 3);
INSERT INTO User_Events (participant_id, event_id) VALUES (3, 3);
INSERT INTO User_Events (participant_id, event_id) VALUES (14, 3);
INSERT INTO User_Events (participant_id, event_id) VALUES (15, 3);
INSERT INTO User_Events (participant_id, event_id) VALUES (2, 3);
INSERT INTO User_Events (participant_id, event_id) VALUES (8, 3);
INSERT INTO User_Events (participant_id, event_id) VALUES (7, 3);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE User_Events;
DROP TABLE Users;
DROP TABLE Events;