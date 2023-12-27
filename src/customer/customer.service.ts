import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(User.name) private userModel:Model<UserDocument>,
    @InjectStripe() private readonly stripeClient:Stripe,
  ) { }

  /**create customer */
  async createCustomer(userId: string) {
    const user = await this.userModel.findById(userId)
    const { email } = user
    
    const customer = await this.stripeClient.customers.create({
      email: email,
      metadata: {
        customerUID: userId
      }
    })

    const updateUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { $set: { customerId: customer.id } },
      {new:true}
    )

    updateUser.save()
    return customer
  }
  
  /**get customer */
  async getCustomer(userId: string) {
    const user = await this.userModel.findById(userId)
    const { customerId}=user
  
    if (!customerId) {
      return this.createCustomer(userId)
    }
    
    const customer = await this.stripeClient.customers.retrieve(customerId)
    return customer
  }

  /**atach payment method */
  async atachPaymentMethod(paymentMethod: string, userId: string) {
    const customer = await this.getCustomer(userId)
    
    const attachedCard = await this.stripeClient.paymentMethods.attach(paymentMethod, {
      customer: customer.id
    })

    return attachedCard
  }
  
  /**saved customer  card*/
  async saveCustomerCard(customerId: string) {
    if (!customerId) throw new UnauthorizedException()

    const cards = await this.stripeClient.paymentMethods.list({
      customer: customerId,
      limit: 3,
      type:'card',
    })

    return cards.data
   }


}
