INSERT INTO marketing.workspaces (id, name, owner_user_id, plan, status)
VALUES ('a0000000-0000-0000-0000-000000000001', 'TAI Engineering', null, 'starter', 'active')
ON CONFLICT (id) DO NOTHING;