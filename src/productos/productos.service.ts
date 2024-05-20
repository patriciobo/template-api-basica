import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto = this.productoRepository.create(createProductoDto);

      await this.productoRepository.save(producto);

      return producto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDTO: PaginationDto) {
    const { limit, offset } = paginationDTO;
    const productos = await this.productoRepository.find({
      take: limit,
      skip: offset,
    });

    return productos;
  }

  async findOne(terminoBusqueda: string) {
    let producto;

    isUUID(terminoBusqueda)
      ? (producto = await this.productoRepository.findOneBy({
          id: terminoBusqueda,
        }))
      : (producto = await this.productoRepository.findOneBy({
          slug: terminoBusqueda,
        }));

    if (!producto)
      throw new NotFoundException(
        `No se encontró el producto que coincida con el termino de búsqueda: ${terminoBusqueda}`,
      );

    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.preload({
      id: id,
      ...updateProductoDto,
    });

    console.log('Producto', producto);
    if (!producto)
      throw new NotFoundException(`No se encontró el producto ${id}`);

    try {
      await this.productoRepository.save(producto);
      return producto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const producto = await this.findOne(id);

    await this.productoRepository.remove(producto);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(`Error al crear producto: ${error}`);
  }
}
