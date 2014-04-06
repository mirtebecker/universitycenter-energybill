/*Parse*/

Parse.initialize("xxxx", "xxxx"); // Parse keys
var billingAccount = Parse.Object.extend("billingAccount");

var query = new Parse.Query(billingAccount);

// Column ID keys are stored in this array
var objectIDarray = ["QubGxtroFy", "jgToZnWfOK", "SPxL9OvJeu", "nqhKszIH1W", "xVdINRErR4", "ZJKHfPv8DF", "OZvyapCuic", "MlzM3qYEKq", "96IppwGkLl", "BmMD7iJdXd", "jEEDPj75v6", "acmhz0ulMy", "A00ogp2m8K", "6PnhpfUly1", "2Yjk4iCYnT", "7IbhlwooMu", "JeAunScZZS", "GiZSQpB1Di", "OON1DlNAbP", "fGK58VnWii", "SntNbcxz4d", "opwW0PjhNv", "2F6MeJFIwh", "4ZtA8RbgTs", "v3m1M1zKCC", "BBnEQMO6eW", "9mQhNoccd8", "5wTzTefinx", "q7aQKfS3on", "EfgXoyBrFW", "H0B87Q8YFS", "fsrjIzOixe", "zEd092RViF", "U4wAzlDDQd"];

var users = [];
var thisUser = {};

var foundUser;

var acct, amt, blc;
var roundedAmt;
var name;
var signup;
var totalAllotted = 886.00;

start();

function start() {
	$('#acct-submit').click(function() {
		if ($("#acct-form").val() == '') {
			$('.warning').text("Please enter your account name.");
			$('#acct-form').css('border','1px solid red');	
		} else {
			thisUser.name = $("#acct-form").val();	
			for (i = 0; i < objectIDarray.length; i++) {
				query.get(objectIDarray[i], {
					success: function(billingAccount) {
						acct = billingAccount.get("accountNum");
						
						if(thisUser.name == acct) {
							newBillAmt = billingAccount.get("newBillBalance");
							
							if(newBillAmt != "0" ) {
								console.log("this bill has not been paid");
								amt = billingAccount.get("billAmount");
							} else if (newBillAmt == "0") {
								amt = billingAccount.get("newBillBalance");
							}
							
							
							blc = billingAccount.get("remainingBalance");
							name = billingAccount.get("person");

							
							$("#instructions").css("display","none");
							$("#login").css("display","none");
							
							$(".accountName").text('Hello '+name);
							$(".accountNum").text('Account: '+acct);
							$(".accountBlc").text('Credits: $'+blc.toFixed(2));
							
							$(".amountDueText").text('Your amount due is');
							$(".amountDue").text('$'+amt.toFixed(2));
							
							if(amt > 0){
								$(".payBill").css("display","inline");
							}
							
							$(".payBill").click(function() {
								roundedAmt = parseFloat(blc-amt).toFixed(2);
								console.log(roundedAmt);
								
								$(".accountBlc").text('Credits: $'+roundedAmt);
								
								billingAccount.set("newBillBalance", 0);
								billingAccount.save();
								console.log(roundedAmt);

								billingAccount.set("remainingBalance", blc-amt);
								billingAccount.save();
								
								$("#due").css("display","none");
								$(".payBill").css("display","none");
								
								$('#header1').text("Thank you for your payment of $" + amt +".");
								$('#balance').css("display", "inline").text("Your remaining balance is $" + roundedAmt + ". ");
																
								$("#information").css("display","block");
								
								$("#signup-submit").click(function(){
									if ($("#signup-form").val() == '') {
										$('#signup-form').css('border','1px solid red');	
									} else {
										signup = $("#signup-form").val();
										billingAccount.set("email", signup);
										billingAccount.save();
										console.log(signup);
										$('#signup').append("Thank you. You will receive a new electricity bill in 30 days.");
									}
								});
								
							});
							
						} else {
						/* foundUser = false; */
							/*$('.warning').text("Account name incorrect.");
							$('#acct-form').css('border','1px solid red');*/
						}
						console.log("found: " + foundUser);
					},
					error: function(object, error) {
						console.log("didn't work"); 
					}
				});
			
			}
			
		}	
			
	});

	$('#acct-form').keydown(function(e) {
		if(e.keyCode == 13) {
			$('#acct-submit').trigger('click');
		}
	});
}