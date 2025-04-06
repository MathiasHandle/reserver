CREATE TABLE `event_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `__new_user_events` (
	`participant_id` integer,
	`event_id` integer,
	PRIMARY KEY(`participant_id`, `event_id`),
	FOREIGN KEY (`participant_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_events`("participant_id", "event_id") SELECT "participant_id", "event_id" FROM `user_events`;
--> statement-breakpoint
DROP TABLE `user_events`;
--> statement-breakpoint
ALTER TABLE `__new_user_events` RENAME TO `user_events`;
--> statement-breakpoint
PRAGMA foreign_keys=ON;
--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`max_capacity` integer NOT NULL,
	`host_id` integer NOT NULL,
	`category_id` integer,
	`description` text NOT NULL,
	FOREIGN KEY (`host_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `event_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "name", "date", "max_capacity", "host_id", "category_id", "description") SELECT "id", "name", "date", "max_capacity", "host_id", NULL as category_id, NULL as "description" FROM `events`;
--> statement-breakpoint
DROP TABLE `events`;
--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (1, 'art');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (2, 'culinary');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (3, 'music');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (4, 'outdoors');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (5, 'sports');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (6, 'technology');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (7, 'webinar');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (8, 'workshop');
--> statement-breakpoint
INSERT INTO event_categories (id, name) VALUES (9, 'other');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Paint & Sip Evening', '2024-04-15T18:00:00', 20, 1, 1, 'Join us for a relaxing evening of painting and wine tasting. All materials provided.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Pasta Making Workshop', '2024-04-20T17:00:00', 15, 3, 2, 'Learn to make authentic Italian pasta from scratch with our expert chef.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Jazz in the Park', '2024-05-01T19:30:00', 100, 5, 3, 'Open-air jazz concert featuring local musicians. Bring your own blanket.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Spring Hiking Adventure', '2024-05-05T09:00:00', 25, 7, 4, 'A guided hiking trip through scenic mountain trails. Moderate difficulty level.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Basketball Tournament', '2024-05-10T14:00:00', 40, 9, 5, '5v5 basketball tournament with prizes for winning teams.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Web3 Development Conference', '2024-05-15T10:00:00', 200, 2, 6, 'Full-day conference covering latest trends in blockchain and web3 development.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Digital Marketing Strategies', '2024-05-20T15:00:00', 50, 4, 7, 'Online webinar about effective digital marketing techniques for 2024.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Photography Basics', '2024-05-25T11:00:00', 15, 6, 8, 'Hands-on workshop covering camera basics and composition techniques.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Board Game Night', '2024-06-01T19:00:00', 30, 8, 9, 'Social evening featuring popular board games and snacks.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Summer Coding Bootcamp', '2024-06-05T09:00:00', 25, 10, 6, 'Intensive coding workshop for beginners. Focus on web development.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Yoga in the Garden', '2024-06-10T08:00:00', 20, 12, 4, 'Morning yoga session in our beautiful botanical garden.');
--> statement-breakpoint
INSERT INTO events (name, date, max_capacity, host_id, category_id, description) VALUES ('Rock Band Showcase', '2024-06-15T20:00:00', 150, 14, 3, 'Live performances from local rock bands. Food trucks available.');
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (2, 1);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (3, 1);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (4, 1);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (5, 2);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (6, 2);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (7, 3);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (8, 3);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (9, 3);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (10, 3);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (11, 4);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (12, 4);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (13, 4);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (14, 5);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (15, 5);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (1, 5);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (2, 6);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (3, 6);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (4, 6);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (5, 6);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (6, 7);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (7, 7);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (8, 8);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (9, 8);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (10, 8);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (11, 9);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (12, 9);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (13, 9);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (14, 9);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (15, 10);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (1, 10);
--> statement-breakpoint
INSERT INTO user_events (participant_id, event_id) VALUES (2, 10);