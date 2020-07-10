
CREATE TABLE "public"."users"("user_id" text NOT NULL, "name" text NOT NULL, PRIMARY KEY ("user_id") , UNIQUE ("user_id"));

CREATE TABLE "public"."todos"("todo_id" text NOT NULL, "title" text NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, "created_at" timestamptz NOT NULL DEFAULT now(), "user_id" text NOT NULL, PRIMARY KEY ("todo_id") , UNIQUE ("todo_id"));

alter table "public"."todos" drop constraint "todos_pkey";

ALTER TABLE "public"."todos" DROP COLUMN "todo_id" CASCADE;

ALTER TABLE "public"."todos" ADD COLUMN "todo_id" serial NOT NULL;

alter table "public"."todos"
    add constraint "todos_pkey" 
    primary key ( "todo_id" );

alter table "public"."todos"
           add constraint "todos_user_id_fkey"
           foreign key ("user_id")
           references "public"."users"
           ("user_id") on update restrict on delete restrict;
