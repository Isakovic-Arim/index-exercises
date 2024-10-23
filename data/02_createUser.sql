CREATE USER subject
IDENTIFIED BY subject
DEFAULT tablespace USERS
TEMPORARY tablespace temp
quota unlimited ON USERS;

grant connect to subject;
grant resource to subject;
grant create session to subject;

COMMIT;

exit;