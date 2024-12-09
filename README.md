# 01
## AWS Project - Web Hosting S5 SJU 


1. Create S3 bucket
- Name: `<bucket_name>` (Should be globally unique)
- Disable ACLs
- Uncheck Block all public access
- Click on 'Create'
- Upload the frontend files (codes and images)
- Add the following bucket policy:
```
 {
 "Version": "2012-10-17",
 "Statement": [
 {
 "Effect": "Allow",
 "Principal": "*",
 "Action": "s3:GetObject",
 "Resource": "arn:aws:s3:::my-static-website-bucket/*"
 }
 ]
 }
```
- Enable Static Web Hosting

2. Create EC2 instance
- Name: `backendServer`
- AMI: `Ubuntu`
- Instance type: `t2.micro`
- Key Pair: Create new key pair if you don't have one
- Auto-assign public IP: `Enable`

3. Transfer the server.js file from your local computer to EC2 instance
  
4. Install the dependencies required to run server.js

```
 sudo apt install nodejs
 sudo apt install npm

 sudo npm init-y
 sudo npm install express cors mysql2
```

5. Start the server with the following command: `sudo node server.js`

7. Update the script.js in the frontend with the public IP of EC2
