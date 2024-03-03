create materialized view user_rp as
select ut.user_id,
       round(sum(at.met * 70 * ca.time * coalesce(ca.weight_coefficient, 1) * coalesce(at.base_weight, 1)) /
             10) as total_rp
from user_stats ut
         left join challenge_activities ca on ut.challenge_activity_id = ca.id
         left join activity_types at on ca.activity_type_id = at.id
group by ut.user_id;



-- Create a trigger function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_user_rp()
    RETURNS TRIGGER AS
$$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_rp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user_stats table to automatically refresh the materialized view
CREATE TRIGGER refresh_user_rp_trigger
    AFTER INSERT
    ON user_stats
    FOR EACH STATEMENT
EXECUTE FUNCTION refresh_user_rp();
