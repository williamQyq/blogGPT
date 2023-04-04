# Blog-GPT

### `latest update note`: 04/01/2023
<br/>
This project is designed for individuals seeking to advance their careers to record personal blogs on [blog sharing platform](https://willwows.blog/).
<br />
<br />

## To Begin
1. ### `npm start` 
   Move to the server and client/bloggpt directories and install dependecies.
2. `npm run dev` <br />Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Important Note*
### If `ts-node` is prohibited to run:
* `PowerShell script execution` might is disabled on your system and prevent you to use `ts-node`. To fix this, you can do this by opening PowerShell as an administrator and running the following command:

   `Set-ExecutionPolicy RemoteSigned`

If you use `esm` and path alias in typescript, use custom [loader](https://github.com/TypeStrong/ts-node/discussions/1450); credits to `github/TypeStrong/ts-node/discussions/1450`.



```json
//tsconfig.paths.json

{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@api/*": [
                "lib/api/*"
            ],
            "@models/*": [
                "lib/models/*"
            ],
            "~/*": [
                "*"
            ]
        }
    }
}
```

now you can use:
  ```json
  //package.json

   "scripts": {
      "dev": "node --no-warnings --experimental-specifier-resolution=node --loader ./loader.js index.ts",
      //...
   }
  ```

### Deployment

The server will be deployed to AWS, route53, nginx.

## Contact

* Author: william qiao
* LinkedIn: https://www.linkedin.com/in/yuqing-qiao/
* Github: https://github.com/williamQyq