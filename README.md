# StudySphere

##### [ npm i ] in both frontend and backend folder to install all dependencies

### FirstMost Step => [ npm run seed ] in backend folder to seed the roles initially into database
### Roles and Their Permissions

#### OWNER
- Has all permissions:
  - `CREATE_WORKSPACE`
  - `DELETE_WORKSPACE`
  - `EDIT_WORKSPACE`
  - `CHANGE_MEMBER_ROLE`
  - `MANAGE_WORKSPACE_SETTINGS`
  - `ADD_MEMBER`
  - `REMOVE_MEMBER`
  - `CREATE_PROJECT`
  - `EDIT_PROJECT`
  - `DELETE_PROJECT`
  - `DELETE_TASK`
  - `CREATE_TASK`
  - `EDIT_TASK`
  - `VIEW_ONLY`

#### ADMIN
- Can perform the following actions:
  - `ADD_MEMBER`
  - `CREATE_PROJECT`
  - `EDIT_PROJECT`
  - `DELETE_PROJECT`
  - `CREATE_TASK`
  - `EDIT_TASK`
  - `DELETE_TASK`
  - `MANAGE_WORKSPACE_SETTINGS`
  - `VIEW_ONLY`

#### MEMBER
- Has limited permissions:
  - `CREATE_TASK`
  - `EDIT_TASK`
  - `VIEW_ONLY`
  
  
##### [ npm run dev ] in the frontend &&
##### [ npm run dev ] in backend folder &&
##### don't forget to change [ .env.sample ] file to [ .env ] and change the varibles accordingly
#### ✅✅✅
##### [ npm run seed ] in backend folder to seed the roles initially into database

## Schema
![Studysphere_Schema](https://github.com/user-attachments/assets/5730a91f-9fd2-4a0e-8f68-8714dedb73a7)

