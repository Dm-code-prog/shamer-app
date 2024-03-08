create materialized view team_rp as
select t.id, round(sum(at.met * 70 * ca.time * coalesce(ca.weight_coefficient, 1) * coalesce(at.base_weight, 1)) /
             10) as total_rp
from teams t
         join challenges c on t.id = c.team_id
         join challenge_instances ci on c.id = ci.challenge_id
         join user_stats us on ci.id = us.challenge_instance_id
         join challenge_activities ca on us.challenge_activity_id = ca.id
         join activity_types at on ca.activity_type_id = at.id
group by t.id;

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
