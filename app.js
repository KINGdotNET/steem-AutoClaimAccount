const { Client, PrivateKey, Asset } = require('dsteem');
const dotnev = require('dotenv');

dotnev.config();

const client = new Client('https://api.steemit.com');

const config = {
  STEEM_ACCOUNT: process.env.STEEM_ACCOUNT,
  ACTIVE_WIF: process.env.ACTIVE_WIF,
  RC_THRESHOLD: process.env.RC_THRESHOLD,
};

const log = (message) => {
  console.log(`${new Date().toString()} - ${message}`);
};

// Returns an account's Resource Credits data
async function getRC(username) {
  return client.call('rc_api', 'find_rc_accounts', { accounts: [username] });
}

const startProcessing = async () => {
  const op = ['claim_account', {
    creator: config.STEEM_ACCOUNT,
    fee: Asset.from('0.000 STEEM'),
    extensions: [],
  }];  

  try {
    // Load account info
    const ac = await getRC(config.STEEM_ACCOUNT);
    if (ac.rc_accounts.length > 0) {
      const rc = Number(ac.rc_accounts[0].rc_manabar.current_mana);
      log(config.STEEM_ACCOUNT + '\'s RC is ' + rc.toString());
      if( rc > config.RC_THRESHOLD * 1000000000000 ) {
        client.broadcast.sendOperations([op], dsteem.PrivateKey.from(config.ACTIVE_WIF))
        .then((res) => {
          console.log(res);
          log('You have successfully claimed a discounted account');
        })
        .catch(err => {
          log(err);
        });
      }
    }
  } catch (e) {
    log(e.message);
  }
};

(async () => {
  log("Process Started ")
  startProcessing();

  // Running `startProcessing` function every 6 hours
  setInterval(startProcessing, 1 * 60 * 60 * 1000);
})();
