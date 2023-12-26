import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BooksDocument } from 'src/books/schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BooksModel: Model<BooksDocument>) { }
  
async create(createBookDto: CreateBookDto) {
    return await this.BooksModel.create(createBookDto)
  }

async findAll() {
  return await this.BooksModel.find({}).exec()
  }

/**needs to be developed comming soon */
async findOne(id: string) {
    return `This action returns a #${id} book`;
  }

async update(id: string, updateBookDto: UpdateBookDto) {
  return await this.BooksModel.findByIdAndUpdate(id, updateBookDto, {new:true})
  }

async remove(id: string) {
    return await this.BooksModel.findByIdAndRemove(id)
  }
}
