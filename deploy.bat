:: This batch assumes you have 7z installed and added as path in windows enviromental variables.
npm run build && 7z a fn.zip .\dist\src\* && awslocal lambda create-function ^
  --function-name shopify-lambda ^
  --runtime nodejs18.x ^
  --zip-file fileb://fn.zip ^
  --handler index.handler ^
  --role arn:aws:iam::000000000000:role/lambda-role && awslocal lambda create-function-url-config ^
  --function-name shopify-lambda ^
  --auth-type NONE