
alter table "public"."todos" drop constraint "todos_user_id_fkey";

alter table "public"."todos" drop constraint "todos_pkey";

ALTER TABLE "public"."todos" DROP COLUMN "todo_id";

ALTER TABLE "public"."todos" ADD COLUMN "todo_id" text;
ALTER TABLE "public"."todos" ALTER COLUMN "todo_id" DROP NOT NULL;

alter table "public"."todos"
    add constraint "todos_pkey" 
    primary key ( "todo_id" );

DROP TABLE "public"."todos";

DROP TABLE "public"."users";
