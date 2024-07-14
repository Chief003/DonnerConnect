const express = require('express');
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

router.get('/api/home', (req, res) => {
  res.json({ message: 'This is a sample API route.' });
  console.log("This is a sample API route.");
});

router.get("/api/access_token", (req, res) => {
  getAccessToken()
    .then((accessToken) => {
      res.json({ message: "😀 Your access token is " + accessToken });
    })
    .catch(console.log);
});

async function getAccessToken() {
  const consumer_key = "QDMQfQhxZDQCS7g670AGwhAfJa14o0bGPbU4eM41VDXEf5Ih";
  const consumer_secret = "NhgAQOPXUkCj5DA2jWpy7M57Ns7AcAotqTBEpsPBqr12h6Rj87nfPpoiKk56l02V";
  const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
}

router.post('/api/stkpush', (req, res) => {
  console.log("STK Push endpoint hit");
  let phoneNumber = req.body.phone;
  const accountNumber = req.body.accountNumber;
  const amount = req.body.amount;

  if (phoneNumber.startsWith("0")) {
    phoneNumber = "254" + phoneNumber.slice(1);
  }

  getAccessToken()
    .then((accessToken) => {
      const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

      axios.post(url, {
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: "174379",
        PhoneNumber: phoneNumber,
        CallBackURL: "https://d4f6-41-90-184-244.ngrok-free.app/api/callback",
        AccountReference: accountNumber,
        TransactionDesc: "Mpesa Daraja API stk push test",
      }, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        console.log(response.data);
        res.status(200).json({
          msg: "Request is successful done ✔✔. Please enter mpesa pin to complete the transaction",
          status: true,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          msg: "Request failed",
          status: false,
        });
      });
    })
    .catch(console.log);
});

router.post("/api/callback", (req, res) => {
  console.log("STK PUSH CALLBACK");
  const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
  const resultCode = req.body.Body.stkCallback.ResultCode;
  const resultDesc = req.body.Body.stkCallback.ResultDesc;
  const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
  const amount = callbackMetadata.Item[0].Value;
  const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
  const transactionDate = callbackMetadata.Item[3].Value;
  const phoneNumber = callbackMetadata.Item[4].Value;

  console.log("MerchantRequestID:", merchantRequestID);
  console.log("CheckoutRequestID:", checkoutRequestID);
  console.log("ResultCode:", resultCode);
  console.log("ResultDesc:", resultDesc);
  console.log("Amount:", amount);
  console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
  console.log("TransactionDate:", transactionDate);
  console.log("PhoneNumber:", phoneNumber);

  var json = JSON.stringify(req.body);
  fs.writeFile("stkcallback.json", json, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("STK PUSH CALLBACK STORED SUCCESSFULLY");
  });
  res.status(200).send("Callback received");
});
router.get('/api/check-status/:checkoutRequestID', (req, res) => {
  const checkoutRequestID = req.params.checkoutRequestID;
  fs.readFile('stkcallback.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ status: false, msg: 'Error reading callback data' });
    } else {
      const callbackData = JSON.parse(data);
      const result = callbackData.Body.stkCallback;
      if (result.CheckoutRequestID === checkoutRequestID) {
        res.status(200).json({ status: result.ResultCode === 0, msg: result.ResultDesc });
      } else {
        res.status(404).json({ status: false, msg: 'Transaction not found' });
      }
    }
  });
});


module.exports = router;
