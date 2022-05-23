# TinderLike

For stating of application run `npm ci or npm i` and after run `npm start`

For emulated of errors from backend about 30 percentage of answers of requests has been done with errors, witch i'm process using by material snackbar   

REST contract:

GET 'api/users' - get users for evaluation, with answer UserModel[], for example about 15 records
@return UserModel[]

POST 'api/like/{id}' - create my like for user with {id} and with body { liked: boolean }
@return { matched: boolean }

PUT 'api/like/{id}' - update my like for user with {id}

