import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'materium_super_seguro',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
