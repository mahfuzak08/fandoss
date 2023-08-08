var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  auth: {
    user: 'fandossofficial@gmail.com',
    pass: '3E94CAF7AA35761741412A865030EA922727'
  }
});

function sendEmail(to, subject, otp){
	var mailOptions = {
	  from: 'fandossofficial@gmail.com',
	  to: to,
	  subject: subject ? subject : 'Sending Email from FanDoss',
	  html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>
    <title>
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <style type="text/css">body, html {
      margin: 0px;
      padding: 0px;
      -webkit-font-smoothing: antialiased;
      text-size-adjust: none;
      width: 100% !important;
    }
      table td, table {
      }
      #outlook a {
        padding: 0px;
      }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
        line-height: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      @media only screen and (max-width: 480px) {
         table tr td table.edsocialfollowcontainer {width: auto !important;} table, table tr td, table td {
          width: 100% !important;
        }
        img {
          width: inherit;
        }
        .layer_2 {
          max-width: 100% !important;
        }
        .edsocialfollowcontainer table {
          max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
          padding: 10px !important;
        }
      }
    </style>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
  </head><body style="padding:0; margin: 0;background: #efefef">
    <table style="height: 100%; width: 100%; background-color: #efefef;" align="center">
      <tbody>
        <tr>
          <td id="dbody" data-version="2.31" valign="top" style="width: 100%; height: 100%; padding-top: 30px; padding-bottom: 30px; background-color: #efefef;">
            <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
            <table class="layer_1" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
              <tbody>
                <tr>
                  <td class="drow" align="center" valign="top" style="background-color: #efefef; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 300px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td class="edtext" valign="top" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; direction: ltr; box-sizing: border-box;">
                              <p style="text-align: left; font-size: 9px; margin: 0px; padding: 0px;">This text will show up next to the subject line in some email clients.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 300px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td class="edtext" valign="top" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; direction: ltr; box-sizing: border-box;">
                              <p style="text-align: right; font-size: 9px; margin: 0px; padding: 0px;"> Unable to view? Read it 
                                <a href="{view}" style="font-size: 9px; color: #828282; font-family: Helvetica, Arial, sans-serif; text-decoration: none;">Online</a></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr><td class="drow" valign="top" align="center" style="background-color: #efefef; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edimg" style="padding: 20px; box-sizing: border-box; text-align: center;"><img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/shapes_logo.png" alt="Obraz" style="border-width: 0px; border-style: none; max-width: 400px; width: 100%;" width="400"></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr>
                <tr>
                  <td class="drow" align="center" valign="top" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td class="emptycell" valign="top" style="padding: 20px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" align="center" valign="top" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td class="edtext" valign="top" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; direction: ltr; box-sizing: border-box;">
                              <p class="style1" style="margin: 0px; padding: 0px; color: #616262; font-size: 28px; font-family: Helvetica, Arial, sans-serif;">One more&nbsp;
                                <span style="color: #05a49a;">step...</span>
                              </p>
                              <p style="margin: 0px; padding: 0px;"><h3>Your OTP is:&nbsp;${otp}</h3></p><p style="margin: 0px; padding: 0px;">Please verify your account.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                
                
                <tr>
                  <td class="drow" align="center" valign="top" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td class="edimg" valign="top" style="padding: 0px; box-sizing: border-box; text-align: center;">
                              <img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/shapes_header1.png" alt="Image" style="border-width: 0px; border-style: none; max-width: 600px; width: 100%;" width="600">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" align="center" valign="top" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td class="edtext" valign="top" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; direction: ltr; box-sizing: border-box;">
                              <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">Need some help? Feel free to 
                                <a href="#" style="color: #828282; font-size: 14px; font-family: Helvetica, Arial, sans-serif; text-decoration: none;">contact us</a>.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" align="center" valign="top" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td class="emptycell" valign="top" style="padding: 10px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" align="center" valign="top" style="background-color: #efefef; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td class="edtext" valign="top" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 14px; font-family: Helvetica, Arial, sans-serif; direction: ltr; box-sizing: border-box;">
                              <p style="text-align: center; font-size: 10px; margin: 0px; padding: 0px;">If you no longer wish to receive mail from us, you can 
                                <a href="{unsubscribe}" style="background-color: initial; font-size: 10px; color: #828282; font-family: Helvetica, Arial, sans-serif; text-decoration: none;">Unsubscribe</a> 
                                <br>{accountaddress}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
  </body></html>`
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
}

sendEmail('mahfuzak08@gmail.com', 'Test Email from elastice mail', '644974')