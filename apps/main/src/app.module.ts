import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://rabbitmq:5672`],
          queue: 'bus',
          queueOptions: {
            durable: true,
          },
          noAck: true,
        },
      },
    ]),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   // entities: [User],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    // TypeOrmModule.forRootAsync({
    //   useFactory() {
    //     return AppDataSource.options as TypeOrmModuleOptions;
    //   },
    //   async dataSourceFactory(options) {
    //     if (!options) {
    //       throw new Error('Invalid options passed');
    //     }

    //     return (
    //       getDataSourceByName('default') ||
    //       addTransactionalDataSource(new DataSource(options))
    //     );
    //   },
    // }),
  ],
  controllers: [SenderController],
  providers: [SenderService],
})
export class AppModule {}
