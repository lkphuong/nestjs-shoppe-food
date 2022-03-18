import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from './products/product.module';
import { ShopModule } from './shops/shop.module';
@Module({
  imports: [UserModule, AuthModule, ProductModule, ShopModule],
})
export class IndexModule {}
