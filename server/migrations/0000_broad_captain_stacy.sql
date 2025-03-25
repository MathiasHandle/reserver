CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`max_capacity` integer NOT NULL,
	`host_id` integer,
	FOREIGN KEY (`host_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_events` (
	`participant_id` integer,
	`event_id` integer,
	PRIMARY KEY(`event_id`, `event_id`),
	FOREIGN KEY (`participant_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `emailUniqueIndex` ON `users` (lower("email"));



------------------- DATA

--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (1, 'Lucine', 'Draper', 'lucine.d@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (2, 'Ives', 'Spedding', 'ives.s@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (3, 'Hewitt', 'Harse', 'hewitt.h@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (4, 'Eleanor', 'Wright', 'eleanor.w@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (5, 'Marcus', 'Bennett', 'marcus.b@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (6, 'Sofia', 'Chen', 'sofia.c@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (7, 'Lucas', 'Martinez', 'lucas.m@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (8, 'Emma', 'Thompson', 'emma.t@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (9, 'Oliver', 'Anderson', 'oliver.a@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (10, 'Ava', 'Parker', 'ava.p@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (11, 'William', 'Cooper', 'william.c@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (12, 'Mia', 'Sullivan', 'mia.s@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (13, 'James', 'Reynolds', 'james.r@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (14, 'Charlotte', 'Morgan', 'charlotte.m@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (15, 'Benjamin', 'Foster', 'benjamin.f@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (16, 'Sophia', 'Hayes', 'sophia.h@example.com', 'QWxJ3eOR23FvwkNMnv8k+F2eod1Qp/+Sf04wKH/px7o=');