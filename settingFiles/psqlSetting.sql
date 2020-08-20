ALTER USER postgres PASSWORD 'postgres';
CREATE ROLE django_user LOGIN;
ALTER ROLE django_user PASSWORD 'django_user';
ALTER ROLE django_user SET client_encoding = 'UTF8';
ALTER ROLE django_user SET default_transaction_isolation = 'read committed';
CREATE DATABASE protostory;
GRANT ALL PRIVILEGES ON DATABASE protoStory TO django_user;
ALTER ROLE django_user CREATEDB;