CREATE TABLE `sources` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phases` integer NOT NULL,
	`voltage` integer NOT NULL,
	`x1r1` real NOT NULL,
	`x0r0` real NOT NULL,
	`isc3` integer NOT NULL,
	`isc1` integer NOT NULL,
	`resistance` real NOT NULL,
	`frequency` integer NOT NULL,
	`enabled` integer NOT NULL,
	`x` real DEFAULT 0 NOT NULL,
	`y` real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transmission_conductors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`fromPhase` integer NOT NULL,
	`toPhase` integer NOT NULL,
	`bundleNumber` integer NOT NULL,
	`bundleSpacing` integer NOT NULL,
	`isNeutral` integer NOT NULL,
	`typeId` text NOT NULL,
	`lineId` text NOT NULL,
	FOREIGN KEY (`lineId`) REFERENCES `transmission_lines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transmission_lines` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`fromSourceId` text NOT NULL,
	`toSourceId` text,
	FOREIGN KEY (`fromSourceId`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`toSourceId`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transmission_towers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`resistance` integer NOT NULL,
	`distance` integer NOT NULL,
	`geometryId` text NOT NULL,
	`lineId` text NOT NULL,
	FOREIGN KEY (`lineId`) REFERENCES `transmission_lines`(`id`) ON UPDATE no action ON DELETE no action
);
