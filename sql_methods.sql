create or replace function comment_increment (row_id int ,count int) 
returns void as
$$
  update posts
  set reply_count = reply_count + count
  where id = row_id
$$ 
language sql;

-- Get posts with likes

CREATE OR REPLACE FUNCTION get_posts_with_likes(request_user_id UUID)
RETURNS TABLE (
    post_id bigint,
    user_id UUID,
    content TEXT,
    image TEXT,
    name TEXT,
    username varchar,
    email TEXT,
    profile_image text,
    likes_count bigint,
    reply_count bigint,
    created_at timestamptz,
    liked BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id as post_id,
        p.user_id AS post_user_id,
        p.content,
        p.image,
        u.name,
        u.username,
        u.email,
        u.profile_image,
        p.likes_count,
        p.reply_count,
        p.created_at,
        EXISTS (
            SELECT 1
            FROM likes as l
            WHERE l.post_id = p.id AND l.user_id::uuid = request_user_id
        ) AS liked
    FROM
        posts as p
    JOIN
        users as u ON p.user_id = u.id;
END;
$$;
