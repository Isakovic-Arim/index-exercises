BEGIN
for uo in (select * from user_objects order by object_type desc)
    LOOP
BEGIN
case lower(uo.OBJECT_TYPE)
            when 'table' then EXECUTE IMMEDIATE 'drop table ' || uo.OBJECT_NAME || ' cascade constraints';
when 'view'  then EXECUTE IMMEDIATE 'drop view ' || uo.OBJECT_NAME;
when 'package body' then EXECUTE IMMEDIATE 'drop package body ' || uo.OBJECT_NAME;
when 'package' then EXECUTE IMMEDIATE 'drop package ' || uo.OBJECT_NAME;
when 'procedure' then EXECUTE IMMEDIATE 'drop procedure ' || uo.OBJECT_NAME;
when 'function' then EXECUTE IMMEDIATE 'drop function ' || uo.OBJECT_NAME;
when 'sequence' then EXECUTE IMMEDIATE 'drop sequence ' || uo.OBJECT_NAME;
when 'trigger' then EXECUTE IMMEDIATE 'drop trigger ' || uo.OBJECT_NAME;
else NULL;
END CASE;
EXCEPTION WHEN OTHERS THEN dbms_output.put_line(SQLERRM);
END;
END LOOP;
END;

