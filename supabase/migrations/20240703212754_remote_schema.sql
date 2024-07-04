
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."role" AS ENUM (
    'mentor',
    'member'
);

ALTER TYPE "public"."role" OWNER TO "postgres";

CREATE TYPE "public"."status" AS ENUM (
    'active',
    'completed',
    'paused'
);

ALTER TYPE "public"."status" OWNER TO "postgres";

CREATE TYPE "public"."task_priority" AS ENUM (
    'high',
    'medium',
    'low'
);

ALTER TYPE "public"."task_priority" OWNER TO "postgres";

CREATE TYPE "public"."task_status" AS ENUM (
    'open',
    'in progress',
    'completed'
);

ALTER TYPE "public"."task_status" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  insert into public.users (id, name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."hackathons" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "organizer_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "status" "public"."status" NOT NULL
);

ALTER TABLE "public"."hackathons" OWNER TO "postgres";

ALTER TABLE "public"."hackathons" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."hackathons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."project_details" (
    "id" bigint NOT NULL,
    "description" "text" NOT NULL,
    "project_id" bigint,
    "end_date" "date" NOT NULL,
    "start_date" "date" NOT NULL,
    "status" "public"."status" DEFAULT 'active'::"public"."status" NOT NULL,
    "github_url" "text"
);

ALTER TABLE "public"."project_details" OWNER TO "postgres";

ALTER TABLE "public"."project_details" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."project_details_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."project_members" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "project_id" bigint NOT NULL,
    "member_email" "text" NOT NULL,
    "role" "public"."role" NOT NULL
);

ALTER TABLE "public"."project_members" OWNER TO "postgres";

ALTER TABLE "public"."project_members" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."project_members_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."project_resources" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "project_id" bigint,
    "name" "text" NOT NULL,
    "url" "text" NOT NULL,
    "created_by" "uuid" NOT NULL
);

ALTER TABLE "public"."project_resources" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."project_tasks" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "project_id" bigint NOT NULL,
    "title" "text" NOT NULL,
    "created_by" "uuid" NOT NULL,
    "status" "public"."task_status" DEFAULT 'open'::"public"."task_status" NOT NULL,
    "priority" "public"."task_priority" DEFAULT 'high'::"public"."task_priority" NOT NULL
);

ALTER TABLE "public"."project_tasks" OWNER TO "postgres";

ALTER TABLE "public"."project_tasks" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."project_tasks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid",
    "name" "text" NOT NULL
);

ALTER TABLE "public"."projects" OWNER TO "postgres";

ALTER TABLE "public"."projects" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."projects_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE "public"."project_resources" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."resources_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

ALTER TABLE ONLY "public"."hackathons"
    ADD CONSTRAINT "hackathons_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_details"
    ADD CONSTRAINT "project_details_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_members"
    ADD CONSTRAINT "project_members_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_tasks"
    ADD CONSTRAINT "project_tasks_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_resources"
    ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_members"
    ADD CONSTRAINT "unique_id_and_email" UNIQUE ("member_email", "project_id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE INDEX "project_details_project_id_idx" ON "public"."project_details" USING "btree" ("project_id");

CREATE INDEX "project_members_member_email_idx" ON "public"."project_members" USING "btree" ("member_email");

CREATE INDEX "project_members_project_id_idx" ON "public"."project_members" USING "btree" ("project_id");

CREATE INDEX "project_resources_created_by_idx" ON "public"."project_resources" USING "btree" ("created_by");

CREATE INDEX "project_resources_project_id_idx" ON "public"."project_resources" USING "btree" ("project_id");

CREATE INDEX "project_tasks_created_by_idx" ON "public"."project_tasks" USING "btree" ("created_by");

CREATE INDEX "project_tasks_project_id_idx" ON "public"."project_tasks" USING "btree" ("project_id");

CREATE INDEX "projects_created_by_idx" ON "public"."projects" USING "btree" ("created_by");

ALTER TABLE ONLY "public"."project_members"
    ADD CONSTRAINT "project_members_member_email_fkey" FOREIGN KEY ("member_email") REFERENCES "public"."users"("email") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."project_resources"
    ADD CONSTRAINT "project_resources_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."project_tasks"
    ADD CONSTRAINT "project_tasks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."hackathons"
    ADD CONSTRAINT "public_hackathons_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."project_details"
    ADD CONSTRAINT "public_project_details_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."project_members"
    ADD CONSTRAINT "public_project_members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."project_tasks"
    ADD CONSTRAINT "public_project_tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."project_resources"
    ADD CONSTRAINT "public_resources_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable Select by project owners and members" ON "public"."project_tasks" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable Update for project owners" ON "public"."project_details" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("project_details"."project_id" = "projects"."id")))) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("project_details"."project_id" = "projects"."id"))));

CREATE POLICY "Enable delete for project owners" ON "public"."project_details" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("project_details"."project_id" = "projects"."id"))));

CREATE POLICY "Enable delete for project owners" ON "public"."project_members" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("projects"."id" = "project_members"."project_id"))));

CREATE POLICY "Enable delete for project owners" ON "public"."projects" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "created_by"));

CREATE POLICY "Enable delete for project task owner" ON "public"."project_tasks" FOR DELETE TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR (( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("projects"."id" = "project_tasks"."project_id")))));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."project_members" TO "authenticated" USING (true) WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."project_resources" TO "authenticated" USING (true) WITH CHECK (true);

CREATE POLICY "Enable insert for project owners" ON "public"."project_details" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("project_details"."project_id" = "projects"."id"))));

CREATE POLICY "Enable insert for project owners and members" ON "public"."project_tasks" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."users" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for owners and members" ON "public"."projects" FOR SELECT TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR ((( SELECT "auth"."jwt"() AS "jwt") ->> 'email'::"text") = ( SELECT "project_members"."member_email"
   FROM "public"."project_members"
  WHERE ("projects"."id" = "project_members"."project_id")))));

CREATE POLICY "Enable select for owners and members" ON "public"."project_members" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for project owners and members" ON "public"."project_details" FOR SELECT USING (((( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("project_details"."project_id" = "projects"."id"))) OR ((( SELECT "auth"."jwt"() AS "jwt") ->> 'email'::"text") = ( SELECT "project_members"."member_email"
   FROM "public"."project_members"
  WHERE ("project_details"."project_id" = "project_members"."project_id")))));

CREATE POLICY "Enable update for project owner" ON "public"."project_members" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("projects"."id" = "project_members"."project_id"))));

CREATE POLICY "Enable update for project owners" ON "public"."projects" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "created_by"));

CREATE POLICY "Enable update for project task owner" ON "public"."project_tasks" FOR UPDATE TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR (( SELECT "auth"."uid"() AS "uid") = ( SELECT "projects"."created_by"
   FROM "public"."projects"
  WHERE ("projects"."id" = "project_tasks"."project_id")))));

ALTER TABLE "public"."hackathons" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert project" ON "public"."projects" FOR INSERT TO "authenticated" WITH CHECK (true);

ALTER TABLE "public"."project_details" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."project_members" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."project_resources" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."project_tasks" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."hackathons" TO "anon";
GRANT ALL ON TABLE "public"."hackathons" TO "authenticated";
GRANT ALL ON TABLE "public"."hackathons" TO "service_role";

GRANT ALL ON SEQUENCE "public"."hackathons_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."hackathons_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."hackathons_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."project_details" TO "anon";
GRANT ALL ON TABLE "public"."project_details" TO "authenticated";
GRANT ALL ON TABLE "public"."project_details" TO "service_role";

GRANT ALL ON SEQUENCE "public"."project_details_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."project_details_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."project_details_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."project_members" TO "anon";
GRANT ALL ON TABLE "public"."project_members" TO "authenticated";
GRANT ALL ON TABLE "public"."project_members" TO "service_role";

GRANT ALL ON SEQUENCE "public"."project_members_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."project_members_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."project_members_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."project_resources" TO "anon";
GRANT ALL ON TABLE "public"."project_resources" TO "authenticated";
GRANT ALL ON TABLE "public"."project_resources" TO "service_role";

GRANT ALL ON TABLE "public"."project_tasks" TO "anon";
GRANT ALL ON TABLE "public"."project_tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."project_tasks" TO "service_role";

GRANT ALL ON SEQUENCE "public"."project_tasks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."project_tasks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."project_tasks_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";

GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."resources_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."resources_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."resources_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;