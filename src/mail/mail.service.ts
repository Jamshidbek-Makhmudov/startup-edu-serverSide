import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as SendGrid from '@sendgrid/mail';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Book, BooksDocument } from 'src/books/schemas/book.schema';
import { Otp, OtpDocument } from 'src/mail/schemas/otp.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { ContactUseDto } from './dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Book.name) private booksModel: Model<BooksDocument>,
    private readonly configService: ConfigService,
    private mailerService: MailerService,
  ) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async sendOtpVerification(email: string, isUser: boolean) {
    if (!email) throw new ForbiddenException('email_is_required');

    if (isUser) {
      const existUser = await this.userModel.findOne({ email });
      if (!existUser) throw new UnauthorizedException('user_not_found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000); //6 digits
    // const salt = await genSalt(10);
    // const hashedOtp = await hash(String(otp), salt);
    const hashedOtp = await bcrypt.hash(String(otp), 7);
    const emailData = {
      to: email,
      subject: 'Verification email',
      //from: 'jamshid.makh94@gmail.com',
      // from: 'studentsmernbootcamp@gmail.com',
      from: 'james@dataprotec.co.kr',
      html: `
        <h1> Action Required: One-Time Verification Code </h1>
      <h2>	You are receiving this email because a request was made for a one-time code that can be used for authentication. </h2>
      <h3>	Please enter the following code for verification: </h3> <h1>	${otp} </h1>
    
      <p>	If you did not request this change, please change your password or use the chat in the website user interface to contact us.</p>
    
      `,
    };
    await this.otpModel.create({ email: email, otp: hashedOtp, expireAt: Date.now() + 3600000 }); //one hour
    await SendGrid.send(emailData);
    return 'Success';
  }

  async verifyOtp(email: string, otpVerification: string) {
    if (!otpVerification) throw new BadRequestException('send_otp_verification');

    const userExistOtp = await this.otpModel.find({ email });
    // from here
    if (userExistOtp.length === 0) {
      throw new BadRequestException('no_otp_found_for_email');
    }

    const latestOtp = userExistOtp[userExistOtp.length - 1];
    if (!latestOtp || !('expireAt' in latestOtp) || !('otp' in latestOtp)) {
      throw new BadRequestException('otp_data_missing');
    }

    const { expireAt, otp } = latestOtp;

    if (expireAt < new Date()) {
      await this.otpModel.deleteMany({ email });
      throw new BadRequestException('expired_code');
    }

    // const { expireAt, otp } = userExistOtp.slice(-1)[0];

    // if (expireAt < new Date()) {
    //   await this.otpModel.deleteMany({ email });
    //   throw new BadRequestException('expired_code');
    // }

    // const validOtp = await compare(otpVerification, otp);
    const validOtp = await bcrypt.compare(otpVerification, otp);
    if (!validOtp) throw new BadRequestException('otp_is_incorrect');

    await this.otpModel.deleteMany({ email });
    return 'Success';
  }

  /**receive books */
  async recieveBooks(bookId: string, userId: string) {
    const user = await this.userModel.findById(userId);
    const book = await this.booksModel.findById(bookId);

    const emailData = {
      to: user.email,
      subject: 'Ordered Book',
      from: 'james@dataprotec.co.kr',
      html: `<h1>Hi dear ${user.fullName ? user.fullName : "Client"}, this is the link for your ordered book please follow the link and download your book.</h1>
      <a href="${book.pdf}">Your ordered book - ${book.title}</a>`,
    };

    await SendGrid.send(emailData);
    return 'Success';
  }
  /**contact us with sendgrid */
  // async contactUs(dto: ContactUseDto) {
    
  //   const emailData = {
  //     to: this.configService.get<string>('MAILDEV_USER'),
  //     subject: 'Contact Us',
  //     from: this.configService.get<string>('SENDGRID_HOST_EMAIL'),
  //     html: `
  //     <div>Name: ${dto.name}</div>
  //     <div>Email: ${dto.email}</div>
  //     <div>Message: ${dto.message}</div>
  //     `,
  //   };

  //   await SendGrid.send(emailData);
  //   return 'Success';
  // }


   /**contact us with mailer */
  async contactUs(dto: ContactUseDto): Promise<void> {
  try {
      await this.mailerService.sendMail({   
      to: this.configService.get<string>('MAILDEV_USER'),
      from: "james@dataprotec.co.kr",
      subject: 'Contact Us',
      template: './contact',
      context: {
        name: dto.name,
        email: dto.email,
        message: dto.message,
      },  
    });
  } catch(error) {
        console.log(error);      
    }
}

}
