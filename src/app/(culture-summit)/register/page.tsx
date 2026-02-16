import { getRegisterYourInterest } from '@/service/culture-summit/register/getRegister'
import RegisterForm from './_components/registerForm/RegisterForm.component'
import { RecaptchaProvider } from '@/providers/recapcha/RecaptchaProvider.context'

export default async function Page() {
  // Todo : Remove any here
  const registerData: any = await getRegisterYourInterest({})
  return (
    <>
      <RecaptchaProvider>
        <RegisterForm data={registerData?.data} />
      </RecaptchaProvider>
    </>
  )
}
