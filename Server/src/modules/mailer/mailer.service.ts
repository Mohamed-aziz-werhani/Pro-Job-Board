import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CustomMailerService {

    constructor() { }

    private initTransporter() {
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    public async sendConfirmationEmail(payload: any) {

        const transporter = this.initTransporter();

        try {

            const mailOptions = {
                from: 'JOB BOARD <gia.romaguera50@ethereal.email>',
                to: payload.applicant_email,
                subject: 'Application Confirmation',
                html: `
                    <h1>Hello ${payload.applicant_name}</h1>
                    <p>You have submitted an application to the Job Board. Please click the link below to view the application. </p>
                `
            };

            return await transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    console.log(error);
            });
        } catch (error) {
            console.log(error);
        }

    }

}