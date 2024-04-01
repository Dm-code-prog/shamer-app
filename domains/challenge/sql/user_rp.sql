create materialized view user_rp as
select us.user_id,
      round( sum(((((10 * ui.weight) + (6.25 * ui.height) - (5 * ui.age) + 5) * 1.55 / 24) * at.met * ca.time) /
           10)) as total_rp
from user_stats us
         left join user_info ui on us.user_id = ui.user_id
         left join challenge_activities ca on us.challenge_activity_id = ca.id
         left join activity_types at on ca.activity_type_id = at.id
group by us.user_id;

drop materialized view if exists user_rp;

-- Create a trigger function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_user_rp()
    RETURNS TRIGGER AS
$$
BEGIN
    REFRESH MATERIALIZED VIEW user_rp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user_stats table to automatically refresh the materialized view
CREATE TRIGGER refresh_user_rp_trigger
    AFTER INSERT
    ON user_stats
    FOR EACH STATEMENT
EXECUTE FUNCTION refresh_user_rp();


drop trigger if exists refresh_user_rp_trigger on user_stats;