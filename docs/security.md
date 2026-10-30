# Supabase security notes

Project: `aarit-portfolio` (`upknvaoegkagbrktkufd`).

## Who can write content

`market_posts`, `guides`, `resources` and files in the `resources` storage
bucket can be created, edited and deleted only by accounts listed in
`private.admins`. Policies call `private.is_admin()`. The `private` schema is
not exposed over the REST API.

The public (anon) role can read published rows and insert into `leads` only.

Applied 2026-10-30 as migration `restrict_content_writes_to_admins`. Before it,
any signed-in account could edit or delete all content, and sign-ups were not
restricted.

### Adding another admin

In the Supabase SQL editor:

```sql
insert into private.admins (user_id)
select id from auth.users where email = 'new-admin@example.com';
```

## Dashboard settings to keep on

- Authentication → Providers → Email: turn **off** "Allow new users to sign up"
  unless you need it. Admin rights no longer depend on it, but it keeps the
  user list clean.
- Authentication → Password security: turn **on** leaked password protection.
