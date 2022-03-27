import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from './products/product.module';
import { ShopModule } from './shops/shop.module';
import { MenuModule } from './menu/menu.module';
import { GroupModule } from './groups/group.module';
import { CategoryModule } from './categories/category.module';
import { SubcategoryModule } from './subcategories/subcategory.module';
import { CartModule } from './carts/cart.module';
import { DetailCartModule } from './detailCarts/detailCart.module';
import { OrderModule } from './orders/order.module';
import { AppConfigModule } from 'src/config/app/app.module';
@Module({
  imports: [
    AppConfigModule,
    UserModule,
    AuthModule,
    ProductModule,
    ShopModule,
    MenuModule,
    GroupModule,
    CategoryModule,
    SubcategoryModule,
    CartModule,
    DetailCartModule,
    OrderModule,
  ],
})
export class IndexModule {}
