import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
