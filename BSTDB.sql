CREATE TABLE "apikeys" (
  "id" int2 NOT NULL DEFAULT nextval('apikeys_id_seq'::regclass),
  "key" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
  "owner" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT '["Username","discord_id"]'::character varying,
  "type" int2 NOT NULL DEFAULT 0,
  "expiration_date" timestamptz(6),
  "request_reason" varchar(500) COLLATE "pg_catalog"."default",
  CONSTRAINT "apikeys_pkey" PRIMARY KEY ("id", "key")
);
ALTER TABLE "apikeys" OWNER TO "postgres";
COMMENT ON COLUMN "apikeys"."id" IS 'The ID of the key';
COMMENT ON COLUMN "apikeys"."key" IS 'The UUID';
COMMENT ON COLUMN "apikeys"."owner" IS 'The owner in an array, [Username,ID]';
COMMENT ON COLUMN "apikeys"."type" IS 'What type of key it is. - 0: Revoked, 1: Tournament-API Key, 2: Other, 3: 3rd party, 4: Developer';
COMMENT ON COLUMN "apikeys"."expiration_date" IS 'When the key expires.';
COMMENT ON COLUMN "apikeys"."request_reason" IS 'Why the key was requested.';

CREATE TABLE "banned_mods" (
  "id" int2 NOT NULL DEFAULT nextval('banned_mods_id_seq'::regclass),
  "modname" varchar(255) COLLATE "pg_catalog"."default",
  "dll_name" varchar(255) COLLATE "pg_catalog"."default",
  CONSTRAINT "banned_mods_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "banned_mods" OWNER TO "postgres";

CREATE TABLE "s_roles" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "permission" int2,
  "description" varchar COLLATE "pg_catalog"."default",
  CONSTRAINT "webstaff_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "s_roles" OWNER TO "postgres";

CREATE TABLE "sessions" (
  "id" int4 NOT NULL DEFAULT nextval('sessions_id_seq'::regclass),
  "user_id" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "refresh_token" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "sessions" OWNER TO "postgres";
CREATE UNIQUE INDEX "access_token" ON "sessions" USING btree (
  "refresh_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
COMMENT ON COLUMN "sessions"."id" IS 'The unique ID of the key';
COMMENT ON COLUMN "sessions"."user_id" IS 'The id of the user it belongs to';
COMMENT ON COLUMN "sessions"."refresh_token" IS 'The salted refresh-token';
COMMENT ON COLUMN "sessions"."created_at" IS 'When the session was created. All sessions expires after 4 weeks';

CREATE TABLE "t_roles" (
  "id" int4 NOT NULL,
  "rolename" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "type" varchar(255) COLLATE "pg_catalog"."default",
  CONSTRAINT "t_roles_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "t_roles" OWNER TO "postgres";

CREATE TABLE "users" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "permissions" int2 NOT NULL DEFAULT 0,
  "roles" varchar(300) COLLATE "pg_catalog"."default" DEFAULT '[""]'::character varying,
  "scoresaberdata" varchar(200) COLLATE "pg_catalog"."default" NOT NULL DEFAULT '["0",0,0,"NA"]'::character varying,
  "twitter" varchar(255) COLLATE "pg_catalog"."default",
  "twitch" varchar(255) COLLATE "pg_catalog"."default",
  "previous_tourneys" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT '{"tournaments": [""]}'::character varying,
  "rating" int8 NOT NULL DEFAULT 0,
  "banned" int2 NOT NULL DEFAULT 0,
  "pronouns" int2 NOT NULL DEFAULT 2,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "users" OWNER TO "postgres";
COMMENT ON COLUMN "users"."pronouns" IS '0: He/Him, 1: She/Her, 2: They/Them, 3: Other';

CREATE VIEW "staffview" AS  SELECT users.id,
    users.name,
    users.roles,
    users.scoresaberdata,
    users.twitter,
    users.twitch,
    s_roles.name AS "roleName"
   FROM (users
     JOIN s_roles ON ((users.permissions = s_roles.permission)))
  WHERE (users.permissions >= 8);
ALTER TABLE "staffview" OWNER TO "postgres";

