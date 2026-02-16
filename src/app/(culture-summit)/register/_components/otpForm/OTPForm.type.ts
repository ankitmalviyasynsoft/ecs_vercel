import { RegisterSchema } from '../registerForm/RegisterForm.type'

export interface OTPContent {
  title: string
  subDescription: string
  otpReceiveMsg: string
  newOneOtpMsg: string
  requestNewOtpMsg: string
  otpCTAText: string
}

export interface OTPFormProps {
  formData: RegisterSchema
  onSuccess: () => void
  onResendOtp?: () => void // Optional if handled internally or passed
  content?: OTPContent
  successMessage?: string
}

export type OTPValues = [string, string, string, string, string, string]
