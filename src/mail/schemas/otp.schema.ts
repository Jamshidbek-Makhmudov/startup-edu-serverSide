import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true })
export class Otp {
  @ApiProperty({ example: 'user@examle.com', description: "user's email" })
  @Prop()
  email: string;
  @ApiProperty({ example: '123456', description: 'otp code' })
  @Prop()
  otp: string;
  @ApiProperty({ example: 'after an hour', description: 'expire date' })
  @Prop()
  expireAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
