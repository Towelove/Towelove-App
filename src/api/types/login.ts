/**
 * AuthLoginRequest
 */
export interface IRequestLogin {
  email?: null | string;
  phoneNumber?: null | string;
  /**
   * 第三方平台校验码
   */
  thirdPartyCode?: null | string;
  /**
   * qq wx phone email
   */
  type?: null | string;
  /**
   * 系统验证码
   */
  verifyCode?: null | string;
}
export interface reStockUser {
  avatar?: null | string;
  email?: null | string;
  emailVerifyCode?: null | string;
  Id?: number | null;
  nickName?: null | string;
  password?: null | string;
  phone?: null | string;
  phoneVerifyCode?: null | string;
  sex?: null | string;
}
/**
 * AuthLoginRequest
 */
export interface IRequestRegister {
  email?: null | string;
  phoneNumber?: null | string;
  /**
   * 第三方平台校验码
   */
  thirdPartyCode?: null | string;
  /**
   * qq wx phone email
   */
  type?: null | string;
  /**
   * 系统验证码
   */
  verifyCode?: null | string;
}