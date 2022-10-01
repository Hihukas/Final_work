INSERT INTO USERS(id, username, password)
VALUES ('97591abe-5108-4bc2-afaa-6bc6a339619c', 'user',
        '{bcrypt}$2a$10$AsRCsrfh4423vjPr0xKpZeNpYixVcNtDpiGdM5xcIejUXOttH2jcu'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', 'admin',
        '{bcrypt}$2a$10$9Ox9WgR8X5SD04lLSdCwJ.AITH/cAZmcZ9tMkqJUFYSc0krItXT9W');

INSERT INTO ROLES(id, name)
VALUES ('7f74bb02-9f14-43ce-8b28-8c0c889d1558', 'USER'),
       ('25dde1c9-f740-46a7-a598-d62f37126950', 'ADMIN');

INSERT INTO USERS_ROLES(user_id, role_id)
VALUES ('97591abe-5108-4bc2-afaa-6bc6a339619c', '7f74bb02-9f14-43ce-8b28-8c0c889d1558'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', '7f74bb02-9f14-43ce-8b28-8c0c889d1558'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', '25dde1c9-f740-46a7-a598-d62f37126950');