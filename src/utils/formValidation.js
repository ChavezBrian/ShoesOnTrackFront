export const validateName = (name) => {
    if (name.length < 3 || name.length > 20) {
      return "Name must be between 3 and 20 characters.";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      return "Name must contain only letters.";
    } else {
      return "";
    }
  };

  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Invalid email format.";
    } else {
      return "";
    }
  };
  
  export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
  
    if (!phone) {
      return "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      return "Invalid phone number. It must be 10 digits.";
    } else {
      return "";
    }
  };
  
  export const validateMessage = (message) => {
    if (message.length > 500) {
      return "Message cannot exceed 500 characters.";
    } else {
      return "";
    }
  };