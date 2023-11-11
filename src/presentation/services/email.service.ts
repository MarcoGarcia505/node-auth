import nodemailer, { Transporter } from 'nodemailer'
interface Options {
    to: string,
    subject: string,
    htmlBody: string,
    attachments: []
}
export class EmailService {
    private readonly transporter: Transporter;
    
    constructor(
        private readonly mailerService: string, 
        private readonly mailerEmail: string,
        private readonly senderEmailPassword: string
    ){
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: mailerEmail,
                pass: senderEmailPassword,
            },
        })
    }


    public async sendEmail(options: Options): Promise<boolean> {
        const {attachments = [], htmlBody, subject, to} = options;
        try {
            const send = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })
            return true
        } catch (error) {
            return false;
        }
    }
}