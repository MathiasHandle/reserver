CREATE TABLE `event_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`max_capacity` integer NOT NULL,
	`host_id` integer NOT NULL,
	`category_id` integer,
	`description` text NOT NULL,
	FOREIGN KEY (`host_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `event_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_events` (
	`participant_id` integer,
	`event_id` integer,
	PRIMARY KEY(`participant_id`, `event_id`),
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
INSERT INTO Users (id, name, surname, email, password) VALUES (1, 'Lucine', 'Draper', 'lucine.d@example.com', 'd0f40fb0930871d19fe7908ba7cf3109:953cdc1722a04207b5f4b4647f8cd11e253daf6f833b5935a1281a69e920207e');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (2, 'Ives', 'Spedding', 'ives.s@example.com', 'eadb17c3ea4654da16d63cddf52ee714:b2e980ee711a7178ed5dffb228e2e1bad64f4a1d9fce63e141399bcfbb9c2b0e');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (3, 'Hewitt', 'Harse', 'hewitt.h@example.com', '20e9ccfc24960141bcccc5b3a013d484:58f189b1de6cf8e880f964960b66eb97439e7493850c76df901de6ee832edacf');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (4, 'Eleanor', 'Wright', 'eleanor.w@example.com', '73371cc5cc95e73fce5408d9f1f94918:3af3ef43c3b52d33c21a6c656b973241991603eff4efad1b4f24582d47534f62');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (5, 'Marcus', 'Bennett', 'marcus.b@example.com', '6cc917709ef6ced0a735a3ebe270e905:c005dfa970a39331400b2afb1c2e2a8cd90de59bcb36f22dbe4c181d9c763f54');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (6, 'Sofia', 'Chen', 'sofia.c@example.com', '3cafc76a7e5333b15c7ad1c346406a46:9b77e960a1ea7519e8ac0487b6bc0148535a926f458addafd1b52040a277f64b');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (7, 'Lucas', 'Martinez', 'lucas.m@example.com', '241b4db67fc19f84b4f14ea857b4cfea:4b56eaf0ca9b7098108be1be3513552cba26f5a9ff451ee63c9e32bf93608b44');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (8, 'Emma', 'Thompson', 'emma.t@example.com', 'c3238f54f6169c98b0ba6780fbe5195c:eb2b330be844d4ac72219055c0b680e4d9d25647746df3928c80a6a4e23dd687');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (9, 'Oliver', 'Anderson', 'oliver.a@example.com', '295d792ba6befa1f68f8f18bca6f04be:16db0436d9cda73d3b5032a4c92e8be045925ca4f0023f7a503c502cfeeddf43');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (10, 'Ava', 'Parker', 'ava.p@example.com', 'caec059f72792eb2a56f0cb1be67f1eb:368ec5f4de27589582ccf992252b208b315346f511527e0d3fc35f6ec057ba55');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (11, 'William', 'Cooper', 'william.c@example.com', '400a00e68bb83a1b4d3477016256a801:159634736c507d891dc8146816963c7f7098fe1f3ac469adfe5a459d56785c1d');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (12, 'Mia', 'Sullivan', 'mia.s@example.com', 'eee187b835319529528489e42ced3c7d:0756351c6dfa1d4a5b428ff60678e209c46172ad37d67812966f1d34d60c16f3');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (13, 'James', 'Reynolds', 'james.r@example.com', 'badab593841cf07075c60e5ad2ec035c:f061aa4b4f219f50dbeae92fb0a4d0a4d31185a533ae0c86f64f5a8588937f21');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (14, 'Charlotte', 'Morgan', 'charlotte.m@example.com', '66a2cd483ca1473f3690d3a4fc5656e9:80d69368176a2cc396ea95932c8340bf99bb6d7fbbeca53b125711fac9e8879b');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (15, 'Benjamin', 'Foster', 'benjamin.f@example.com', '94df4bb65b1d604bc7985ce2fe3af978:6c6d2b835a3e92ad5ec83d5dd4cb2e3b2e8dd7ef9c60c161070c65f3119c3d35');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (16, 'Sophia', 'Hayes', 'sophia.h@example.com', 'd1eb078c687151ce288da24a45c57761:7d0f8ddfd928c8512ac4beaa55e3453caa59d923359b4a17db1200694d70ff8f');
--> statement-breakpoint
INSERT INTO Users (id, name, surname, email, password) VALUES (17, 'John', 'Doe', 'dummy@example.com', '380d818589739f9d30b5bc0e7f304ebd:2c15e342ee9892ea4982347ce9da254f60a1b81ff97455b149e256fa158740ed');

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