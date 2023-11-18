import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument,Schema as SchemaMS } from "mongoose"
import { User } from "../../user/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type InstructorDocument = HydratedDocument<Instructor>

@Schema({timestamps: true})
export class Instructor {
	 @ApiProperty({ example: 'insta.com', description: "instructor's social media" })
	@Prop()
	 socialMedia: string;
	 @ApiProperty({ example: 'insta.com', description: "instructor's name" })
	@Prop({ type: SchemaMS.Types.ObjectId, ref: "User" })
	 author: User
	 @ApiProperty({ example: 'false', description: "instructor aproved or not" })
	@Prop({ default: false })
	approved:boolean


}
export const InstructorSchema=SchemaFactory.createForClass(Instructor)