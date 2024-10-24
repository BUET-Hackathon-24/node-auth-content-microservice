class ValidatorService {
  static validateEmail(email: string) {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
  static validatePhoneNumber(phone_number: string) {
    return phone_number.match(/^01\d{9}$/);
  }
}

export default ValidatorService;
