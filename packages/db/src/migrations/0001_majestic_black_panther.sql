CREATE TABLE `solution_conductors` (
	`id` text PRIMARY KEY NOT NULL,
	`solutionId` text NOT NULL,
	`conductorId` text NOT NULL,
	`currentIn` integer NOT NULL,
	`currentOut` integer NOT NULL,
	FOREIGN KEY (`solutionId`) REFERENCES `solutions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`conductorId`) REFERENCES `transmission_conductors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `solution_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`solutionId` text NOT NULL,
	`sourceId` text NOT NULL,
	`currentIn` integer NOT NULL,
	`currentOut` integer NOT NULL,
	FOREIGN KEY (`solutionId`) REFERENCES `solutions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sourceId`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `solution_towers` (
	`id` text PRIMARY KEY NOT NULL,
	`solutionId` text NOT NULL,
	`towerId` text NOT NULL,
	`currentIn` integer NOT NULL,
	`currentOut` integer NOT NULL,
	FOREIGN KEY (`solutionId`) REFERENCES `solutions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`towerId`) REFERENCES `transmission_towers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `solutions` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL
);
