create materialized view team_rp as
select t.id,
       round(sum(((((10 * ui.weight) + (6.25 * ui.height) - (5 * ui.age) + 5) * 1.55 / 24) * at.met * ca.time) /
           10)) as total_rp
from teams t
         join challenges c on t.id = c.team_id
         join challenge_instances ci on c.id = ci.challenge_id
         join user_stats us on ci.id = us.challenge_instance_id
         join user_info ui on us.user_id = ui.user_id
         join challenge_activities ca on us.challenge_activity_id = ca.id
         join activity_types at on ca.activity_type_id = at.id
group by t.id;


drop materialized view team_rp;


-- Create a trigger function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_team_rp()
    RETURNS TRIGGER AS
$$
BEGIN
    REFRESH MATERIALIZED VIEW team_rp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user_stats table to automatically refresh the materialized view
CREATE TRIGGER refresh_team_rp_trigger
    AFTER INSERT
    ON user_stats
    FOR EACH STATEMENT
EXECUTE FUNCTION refresh_team_rp();

drop trigger refresh_team_rp_trigger on user_stats;