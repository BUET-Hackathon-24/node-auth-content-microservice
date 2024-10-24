class OtpService {
  generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
}

export default new OtpService();
