export async function sendSMS(phone: string, message: string) {
  console.log(`SMS to ${phone}: ${message}`);
  alert(`SMS: ${message}`);
}

export async function sendEmail(email: string, subject: string, message: string) {
  console.log(`Email: ${subject} - ${message}`);
  alert(`Email: ${subject}`);
}
