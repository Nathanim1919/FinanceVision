export function emailValidation(email) {
  return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ? null
    : "Invalid email";
}

export function usernameValidation(username){
    return username.length >= 3?null:"Username must be atleast 3 characters long";
}

export function passswordValidation(password) {
  const hasLowerCase = /[a-z]/g.test(password);
  const hasLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/g.test(password);
  const hasDigit = /\d/g.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\ ]/g.test(
    password
  );

  const isValidate = hasLowerCase && hasLength && hasUpperCase && hasDigit && hasSpecialCharacter;
  return {
    isValidate,
    hasDigit,
    hasLength,
    hasLowerCase,
    hasUpperCase,
    hasSpecialCharacter,
  };
}