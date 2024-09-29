import { Body, Controller, Post } from '@nestjs/common';
import { CustomMailerService } from './mailer.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({ version: '1', path: 'mailes' })
@ApiTags('Mails MGMT')
export class MailerController {

    constructor(
        private readonly mailerService: CustomMailerService,
    ) { }

    @Post('send-confirmation-email')
    async sendConfirmationEmail(
        @Body() payload: any
    ) {
        return await this.mailerService.sendConfirmationEmail(payload);
    }
}
