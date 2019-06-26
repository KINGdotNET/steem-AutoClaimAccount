# steem-AutoCreateAccount
Automatically claim post HF20 Steem blockchain discounted accounts  

This bot is built to regularly check your available Resource Credits (RC) and claim for an account creation ticket if your RC is above a predifined threshold.

### How to Use

- Clone the repository
- Make sure you have latest LTS or greater version of Node JS installed
- Go inside the cloned folder and command `npm install`
- Rename `.env.example` to `.env` and add your Steem username and active  WIF
- Now command `npm start`

By default, the RC threshold is set 30 billion. Current account creation cost is around 11 billion RC.
You can easily change the RC threshold in the `.env` configuration file.

To run the bot continuously in background please use [PM2](https://pm2.io/). Generate `ecosystem.config.js` file with `pm2 init` command, add environment variables in the file.

When you are done start the bot with following command.

`pm2 start ecosystem.config.js --env production`

### Technologies
- Node JS
- dSteem

### Contributing

Feel free to fork the repo and make changes. If you have any suggestions or want to report bugs, please create an issue.
