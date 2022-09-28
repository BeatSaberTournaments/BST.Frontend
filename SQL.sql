/*
 Navicat Premium Data Transfer

 Source Server         : BST DEV
 Source Server Type    : PostgreSQL
 Source Server Version : 140005
 Source Host           : 192.168.0.69:1200
 Source Catalog        : BST_DEV
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140005
 File Encoding         : 65001

 Date: 29/09/2022 00:40:05
*/


-- ----------------------------
-- Table structure for s_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."s_roles";
CREATE TABLE "public"."s_roles" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "permission" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of s_roles
-- ----------------------------
INSERT INTO "public"."s_roles" VALUES (1, 'Admin(s)', '9', 'The admin role have full functionality on the website. This means they can access every function and are allowed to send GET/POST-requests through the API.');
INSERT INTO "public"."s_roles" VALUES (2, 'Developer(s)', '10', 'The developer role have full functionality on the website. ');
INSERT INTO "public"."s_roles" VALUES (3, 'Moderator(s)', '8', 'The moderators have limited permissions. ');
INSERT INTO "public"."s_roles" VALUES (4, 'Tournament Organizer+', '4', 'The "Tournament Organizer+"-role can be given to users, so they can create and delete their own tournaments. The "+" role allows them to have 3 ongoing matches.');
INSERT INTO "public"."s_roles" VALUES (5, 'Tournament Organizer', '3', 'The "Tournament Organizer"-role can be given to users, so they can create and delete their own tournament. This role only allows for 1 ongoing match.');
INSERT INTO "public"."s_roles" VALUES (6, 'User', '1', 'Default user role');

-- ----------------------------
-- Table structure for t_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_roles";
CREATE TABLE "public"."t_roles" (
  "id" int4 NOT NULL,
  "rolename" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "type" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of t_roles
-- ----------------------------
INSERT INTO "public"."t_roles" VALUES (1, 'Organizer', 'The person who''s "In-charge" of the tournament. Can control everything within the tournament.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (2, 'Admin', 'Sub-role of "Organizer", can control everything apart from deleting the tournament.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (3, 'Map-pooler', 'The people who create map-pools. They can only create, edit, remove and publish map-pools.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (4, 'Coordinator', 'The people who coordinate the matches. They can only access the coordinator-webpanel.', 'tstaff');
INSERT INTO "public"."t_roles" VALUES (5, 'Signed up', 'Player Role. This player is signed up, but not confirmed playing.', 'tplayer');
INSERT INTO "public"."t_roles" VALUES (6, 'Participant', 'Player Role. This player is signed up and confirmed participating.', 'tplayer');

-- ----------------------------
-- Table structure for tournaments
-- ----------------------------
DROP TABLE IF EXISTS "public"."tournaments";
CREATE TABLE "public"."tournaments" (
  "id" int4 NOT NULL,
  "tournamentname" varchar(48) COLLATE "pg_catalog"."default",
  "staff" varchar COLLATE "pg_catalog"."default" DEFAULT ARRAY[]::character varying[],
  "players" varchar COLLATE "pg_catalog"."default" DEFAULT ARRAY[]::character varying[],
  "state" int2,
  "startdate" timestamp(0),
  "enddate" timestamp(6),
  "mappools" varchar COLLATE "pg_catalog"."default" DEFAULT ARRAY[]::character varying[],
  "bracket" varchar COLLATE "pg_catalog"."default" DEFAULT ARRAY[]::character varying[],
  "signupstatus" int2 DEFAULT 0,
  "twitchchannel" varchar(26) COLLATE "pg_catalog"."default" DEFAULT 'BeatSaberTournaments'::character varying,
  "public" bool DEFAULT false,
  "image" varchar(300) COLLATE "pg_catalog"."default" DEFAULT 'https://danesaber.cc/assets/images/logo.png'::character varying
)
;
COMMENT ON COLUMN "public"."tournaments"."id" IS 'Numerical identifier for database use';
COMMENT ON COLUMN "public"."tournaments"."tournamentname" IS 'The tournament name';
COMMENT ON COLUMN "public"."tournaments"."staff" IS 'The staff-team on the tournament';
COMMENT ON COLUMN "public"."tournaments"."players" IS 'Players in the tournament';
COMMENT ON COLUMN "public"."tournaments"."state" IS 'State of the tournament.  
 
0: Not started, 
1: On-going qualifiers, 
2: Live, 
3: Ended ';
COMMENT ON COLUMN "public"."tournaments"."startdate" IS 'Date where Round 1 starts';
COMMENT ON COLUMN "public"."tournaments"."enddate" IS 'Date where tournament it set to end';
COMMENT ON COLUMN "public"."tournaments"."mappools" IS 'Array of map-pools';
COMMENT ON COLUMN "public"."tournaments"."bracket" IS 'Array of bracket';
COMMENT ON COLUMN "public"."tournaments"."signupstatus" IS 'Numerical value for signup-status. 
 
0: Closed, 
1: Open, 
2: Invites only';
COMMENT ON COLUMN "public"."tournaments"."twitchchannel" IS 'Name of the Twitch-channel';
COMMENT ON COLUMN "public"."tournaments"."public" IS 'Boolean to decide if tournament show be shown or not';
COMMENT ON COLUMN "public"."tournaments"."image" IS 'Image URL to the tournament-image';

-- ----------------------------
-- Records of tournaments
-- ----------------------------
INSERT INTO "public"."tournaments" VALUES (1, 'BST Test Tournament', '{''users'': [{''scoresaberids'': [],''roles'': []}', '{''users'': [{''scoresaberids'': [],''status'': []}', 0, '2023-01-01 00:06:40', '2023-02-28 00:06:47', '{}', '{}', 0, 'BeatSaberTournaments', 't', 'https://danesaber.cc/assets/images/logo.png');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "permissions" int2,
  "creationdate" timestamptz(6),
  "scoresaberid" int8,
  "twitch" varchar(255) COLLATE "pg_catalog"."default",
  "discord" varchar(255) COLLATE "pg_catalog"."default",
  "image" varchar COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."users"."id" IS 'Unique user ID';
COMMENT ON COLUMN "public"."users"."username" IS 'Username';
COMMENT ON COLUMN "public"."users"."permissions" IS 'Permission-level';
COMMENT ON COLUMN "public"."users"."creationdate" IS 'Date for signup';
COMMENT ON COLUMN "public"."users"."scoresaberid" IS 'ScoreSaber ID';
COMMENT ON COLUMN "public"."users"."twitch" IS 'Twitch-name';
COMMENT ON COLUMN "public"."users"."discord" IS 'Discord ID';
COMMENT ON COLUMN "public"."users"."image" IS 'Users own image';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'Hawk', 10, '2022-09-28 21:34:25+02', 76561198086326146, 'thanighthawk', '592779895084679188', 'https://danesaber.cc/assets/images/logo.png');
INSERT INTO "public"."users" VALUES (2, 'Hawk2', 10, '2022-09-28 21:34:25+02', 76561198086326147, 'thanighthawk2', '592779895084679188', 'https://danesaber.cc/assets/images/logo.png');

-- ----------------------------
-- Primary Key structure for table s_roles
-- ----------------------------
ALTER TABLE "public"."s_roles" ADD CONSTRAINT "webstaff_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table t_roles
-- ----------------------------
ALTER TABLE "public"."t_roles" ADD CONSTRAINT "t_roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tournaments
-- ----------------------------
ALTER TABLE "public"."tournaments" ADD CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
