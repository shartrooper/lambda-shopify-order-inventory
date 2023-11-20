# Serverless Orders Inventory
### Lambda function for storing shopify placed orders

## Features
- Triggered when an order is placed in your Shopify store. Can quickly try it out with a [test notification](https://github.com/shartrooper/lambda-shopify-order-inventory/blob/master/example/testing-notification.jpg).
- Keeps an in-memory inventory level of all the sold items from the order placed.
- Attempts 3 retries before giving up to the event handling.
- Logs are registered in the LocalStack docker container.
- Test locally with typescript mocha chai.

## Requirements

- Node v18.x+
- Python 3.11+
- Docker (for Localstack container)
- NGROK

## Installation
#### Node dependencies
Install all dependencies
```
npm i
```

### Create Docker container
Pulls localstack nightly build and set a container up and running in the background
```
docker-compose up -d
```

#### Python dependencies
Before start, running a virtual environment is suggested:
```
virtualenv venv
```
In Linux or Mac, activate the new python environment
```
source env_name/bin/activate
```
In Windows
```
.\env_name\Scripts\activate
```
Then install the awslocal cli library
```
pip install awscli-local[ver1]
```
To deactivate environment
```
deactivate
```

# Run Lambda function
There are available both `deploy.bat` (windows) and `deploy.sh` (mac/linux) for quick lambda function deployment.

For manually deployment:

Build a transpiled file from the typescript codebase.
```
npm run build
```
Create a zipfile either manually or running zip con sonsole. 
For windows, you can install [7zip](https://www.7-zip.org/download.html) and add it as a environment variable.
```
7z a fn.zip ./dist/src/*
```
For Linux, you can also install 7zip or add file with zip
```
zip fn.zip ./dist/src/*
```
Afterwards, create the lambda function:
```
awslocal lambda create-function   --function-name shopify-lambda   --runtime nodejs18.x   --zip-file fileb://fn.zip   --handler index.handler   --role arn:aws:iam::000000000000:role/lambda-role
```
And finally, its URL function used to be invoked:

```
awslocal lambda get-function-url-config --function-name shopify-lambda
```
The output will be similar to the following line:
``
{
    "FunctionUrl": "http://3ce05lzdrd9tx1077u7wjxjfrwf2zfre.lambda-url.us-east-1.localhost.localstack.cloud:4566/",
    "FunctionArn": "arn:aws:lambda:us-east-1:000000000000:function:lambda-shopify",
   ....
}
``
Type this line in order to delete the created function.
````
awslocal lambda delete-function --function-name lambda-shopify
````

For more commands, check [Lambda CLI documentation](https://docs.aws.amazon.com/cli/latest/reference/lambda/) 

## How to create a webhook in shopify with a Proxy URL
- Add your lambda function URL to the stack of mapped URLs to host name in `/etc/hosts` without the port.
``ex. 127.0.0.1 	   xxxxxxx.lambda-url.us-east-1.localhost.localstack.cloud``
- Proxy the requests using Apache or NGINX.
- Expose your proxy to internet with either [localTunnel](https://theboroer.github.io/localtunnel-www/) or [ngrok](https://ngrok.com/).
``ex. ngrok http 80`` where 80 could be any Port number.




