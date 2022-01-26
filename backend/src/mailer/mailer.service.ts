import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer'
import { SES } from 'aws-sdk'

import { ConfigService } from '../config/config.service'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {}

  private mailer: Pick<Transporter, 'sendMail'> = (() => {
    if (
      this.config.get('smtp.host') &&
      this.config.get('smtp.user') &&
      this.config.get('smtp.password') &&
      this.config.get('smtp.port')
    ) {
      return nodemailer.createTransport({
        host: this.config.get('smtp.host'),
        port: this.config.get('smtp.port'),
        auth: {
          user: this.config.get('smtp.user'),
          pass: this.config.get('smtp.password'),
        },
      } as SMTPTransport.Options)
    }
    if (this.config.get('awsRegion')) {
      return nodemailer.createTransport({
        SES: new SES({
          region: this.config.get('awsRegion'),
        }),
      })
    }
    return {
      sendMail: (options: SendMailOptions) => {
        options = { ...options, from: this.config.get('mailFrom') }
        Logger.log(JSON.stringify(options, null, 2))
        return Promise.resolve(options)
      },
    }
  })()

  sendMail = async (mailOptions: SendMailOptions): Promise<void> => {
    return this.mailer.sendMail({
      ...mailOptions,
      from: this.config.get('mailFrom'),
    })
  }
}
