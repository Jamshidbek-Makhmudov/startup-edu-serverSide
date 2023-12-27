import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from 'src/customer/customer.service';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
 constructor(private readonly customerService: CustomerService) { }
  
  @ApiOperation({ summary: "saved cards" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('saved-cards')
  @Auth('USER')
  getSavedCustomerCard(@User('customerId') customerId: string) {
    return this.customerService.saveCustomerCard(customerId)
   }


}
