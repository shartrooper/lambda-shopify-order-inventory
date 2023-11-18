#!/bin/bash

# Step 1: Run npm build
npm run build

# Step 2: Create a zip file
zip -r fn.zip ./dist/src/*

# Step 3: Create Lambda function
awslocal lambda create-function \
  --function-name shopify-lambda \
  --runtime nodejs18.x \
  --zip-file fileb://fn.zip \
  --handler index.handler \
  --role arn:aws:iam::000000000000:role/lambda-role

# Step 4: Configure Lambda function URL
awslocal lambda create-function-url-config \
  --function-name shopify-lambda \
  --auth-type NONE