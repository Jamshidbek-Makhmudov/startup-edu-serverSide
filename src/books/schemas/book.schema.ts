import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";
import { BookCategory } from "src/books/dto/schema.dto";

export type BooksDocument = HydratedDocument<Book>

@Schema({timestamps:true})
export class Book { 
	@ApiProperty({ example: 'Advanced IT', description: "Title for Books" })
	@Prop()
	title: string
	
	@ApiProperty({ example: '10', description: "price" })
	@Prop()
	price: number
	
	@ApiProperty({ example: 'Image', description: "Image" })
	@Prop()
	image: string
	
	@ApiProperty({ example: 'pdf', description: "pdf" })
	@Prop()
	pdf: string
	
	@ApiProperty({ example: 'IT', description: "category" })
	@Prop({ enum: BookCategory, default: BookCategory.programming })
	category:string
}

 export const BookSchema=SchemaFactory.createForClass(Book)



