export const handleFormErrors = (formData: any, errorNames: string[]) => {
  const errors: string[] = [];

  errorNames.forEach((errorName) => {
    switch (errorName) {
      case "nameEmpty":
        if (!formData.name) {
          errors.push("Name should not be empty");
        }
        break;
      case "nameString":
        if (typeof formData.name !== "string") {
          errors.push("Name must be a string");
        }
        break;
      case "passwordLength":
        if (formData.password.length < 4) {
          errors.push("Password must be longer than or equal to 4 characters");
        }
        break;
      case "passwordEmpty":
        if (!formData.password) {
          errors.push("Password should not be empty");
        }
        break;
      case "passwordFormat":
        if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
          errors.push("Password must contain only letters and numbers");
        }
        break;
      case "avatarEmpty":
        if (!formData.avatar) {
          errors.push("Avatar should not be empty");
        }
        break;
      case "avatarFormat":
        if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.avatar)) {
          errors.push("Avatar must be a URL address");
        }
        break;
      default:
        break;
    }
  });

  return errors;
};

export const handleTransformUrlImage = (entity: any[]) => {
  return entity.map((item) => JSON.parse(item.replace(/\[|\]/g, "")));
};
