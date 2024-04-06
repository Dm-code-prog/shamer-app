CREATE MATERIALIZED VIEW user_rp AS
WITH rp_calc AS (
    SELECT
        us.user_id,
        ROUND( SUM(((((10 * ui.weight) + (6.25 * ui.height) - (5 * ui.age) + 5) * 1.55 / 24) * at.met * ca.time) / 10)) AS total_rp
    FROM user_stats us
             LEFT JOIN user_info ui ON us.user_id = ui.user_id
             LEFT JOIN challenge_activities ca ON us.challenge_activity_id = ca.id
             LEFT JOIN activity_types at ON ca.activity_type_id = at.id
    GROUP BY us.user_id
)
SELECT
    rc.user_id,
    rc.total_rp,
    CASE
        WHEN rc.total_rp BETWEEN 0 AND 99 THEN 'bronze'
        WHEN rc.total_rp BETWEEN 100 AND 699 THEN 'silver'
        WHEN rc.total_rp BETWEEN 700 AND 1599 THEN 'gold'
        WHEN rc.total_rp BETWEEN 1600 AND 2499 THEN 'diamond'
        WHEN rc.total_rp > 2500 THEN 'immortal'
        END AS league
FROM rp_calc rc;

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