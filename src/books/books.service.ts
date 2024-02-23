import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BooksDocument } from 'src/books/schemas/book.schema';
import { Model } from 'mongoose';
import { BookSearchOptions, ProductQuery, SearchBookDto } from 'src/books/dto/filter-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BooksModel: Model<BooksDocument>,
    ) { }
    
async create(createBookDto: CreateBookDto) {
    return await this.BooksModel.create(createBookDto)
  }

async findAll() {
  return await this.BooksModel.find({}).exec()
  }
async findAlls() {
  return await this.BooksModel.find({}).exec()
  }

/**needs to be developed comming soon */
  async findOneById(id: string) {
  const result = await this.BooksModel.findById(id)
  .then(result => result)
  .catch(err => { 
    throw new HttpException("File not found", HttpStatus.NOT_FOUND)
  })
  return result;
}
  async searchBook(dto: SearchBookDto) {
    const where = {};
    if (dto.title) {
      where['title'] = new RegExp(dto.title, 'i');
    }
    if (dto.category) {
      where['category'] = new RegExp(dto.category, 'i');
    }

    const result = await this.BooksModel.find(where);
    if (!result || result.length === 0) {
      throw new BadRequestException('Book not found');
    }

    return result;
  }
  /**filtering */
  async filterFindBooks(
    search: ProductQuery,
    options?: BookSearchOptions):
     Promise<Book[]> {
     const queryOptions = this.getOptions(options);
     const query = this.getQuery(search);
     return this.BooksModel.find(query, null, queryOptions)
        .exec();;
     
  }

  filterCountBooks(query: ProductQuery): Promise<number> {
    const finalQuery = this.getQuery(query);
    return this.BooksModel.count(finalQuery).exec();
   }
  
  private getOptions(options: BookSearchOptions) {
    const { page, limit, sort } = options;
    let queryOptions = {};

    if (page && limit)
      queryOptions['skip'] = (Number(page) - 1) * Number(limit);

    if (limit)
      queryOptions['limit'] = Number(limit);

    if (sort) queryOptions['sort'] = {
      price: sort
    };

    return queryOptions;
  }
  private getQuery(search: ProductQuery) {
    if (typeof search === 'object') return {};
    return {
      '$or': [
        { title: new RegExp(search.toString(), 'i') },
        { description: new RegExp(search.toString(), 'i') },
      ]
    };
  }

/**needs to be developed comming soon */

async update(id: string, updateBookDto: UpdateBookDto) {
  return await this.BooksModel.findByIdAndUpdate(id, updateBookDto, {new:true})
  }

async remove(id: string) {
    return await this.BooksModel.findByIdAndRemove(id)
  }
}
