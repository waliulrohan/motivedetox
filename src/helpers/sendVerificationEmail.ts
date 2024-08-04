import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/AmiResponse";
import VerificationCodeEmail from "../../emails/verificationEmail";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {

        const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [email],
                subject: 'Motive Detox | Verification Code',
                react: VerificationCodeEmail({ verificationCode: verifyCode , recipientName: username }),
              });


        return{
            success: false,
            mesage:'Failed to send ferifiction email'
        }
    } catch (emailSendingError) {
        console.log('Failed to send verification email', emailSendingError);
        return{
            success: false,
            mesage:'Failed to send ferifiction email'
        }
    }
} 