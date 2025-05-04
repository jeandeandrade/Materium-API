import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProdutoModule } from './modules/produto/produto.module';

@Module({
  imports: [UsuarioModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
