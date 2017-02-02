## Instructions to Buy an Expanse Bond using the EBS

### Run Parity for Expanse

- Exit existing Parity node if it is running by right clicking the Parity icon in the system tray and selecting exit
- Open a command prompt in the Parity.exe file location
- run parity.exe ui --chain expanse

### Set up and fund an Expanse Account

- Parity should have opened a new browser tab at http://127.0.0.1:8180/#/accounts
- Click the "New Account" button to either generate or import an Expanse account
- Send at least 101 EXP to the new account, 100 EXP for the bond and 1 EXP for fees (you probably don't need 1 EXP but that should cover it)

### Set up the EBS Contract in Parity

- Click the "Contracts" tab
- Click "Watch Contract"
- Select "Custom Contract" then click Next
- Paste 0x88acbc37b80ea9f7692baf3eb2390c8a34f02457 as the network address for the contract
- Enter a descriptive name such as "EXP EBS"
- Paste the abi (don't include the wrapping single quotes) from: https://raw.githubusercontent.com/expanse-org/bond-dapp/master/contracts/live-contracts/Bonds.abi.js
- Click "Add Contract"

### Fund the contract 

- Click the "Accounts" tab
- Click the Account from which you want to buy a bond
- Click the "Transfer" button
- Click in the Recipient address field and you should be able to clcik the "EXP EBS" contract
- Enter 100 ETH to transfer
- Click Send and wait for the transaction to get at least confirmation

### Verify that the EBS has your funds

- Click the "Contracts" tab and the "EXP EBS" contract
- Click the address field of the "users" function and click the account that funded the EXP EBS contract
- Click the "QUERY" button and you should see a 100 ETH balance (click the red slider button to convert to ETH from wei)

### Buy a bond

- Note the "nBonds" value for future verification (in my case it was 2)
- Click the "Execute" button at the top of the contract window
- Be sure that the funding account is selected as the from account
- Select the "buy" function to execute
- Enter 1 in the "_multiplier" field (be sure that the unit toggle button is red indicating wei)
- Click the "advanced sending options" checkbox
- Click "Next"
- Enter 252000 in the gas field
- Click "POST TRANSACTION" and wait for the transaction to confirm

### Verify you are the owner of the bond

- Click the Accounts tab, back the contracts tab then click the EXP EBS contract
- Note the nBonds value
- Enter that value in the "bonds" query and click "QUERY"
- You should see that you are the owner of the bond# you entered
- It is possible that more bonds were created so you may have to query the bonds query multiple times to see your owned bonded (e.g if nBonds = 877 then try 876, 875, 843 etc until you find yours)
- I could not figure out a way to look up bond ownership using the account address

