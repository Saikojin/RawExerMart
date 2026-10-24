import { Request, Response } from 'express';
import { equipmentStore } from '../models/dataStore.js';
import { validateCreateEquipment } from '../services/equipmentValidation.js';
import { CreateEquipmentDTO } from '../models/types.js';

export class EquipmentController {
  public getAll(req: Request, res: Response): void {
    try {
      const { category, condition, search, sortBy, featured } = req.query;

      const items = equipmentStore.getAll({
        category: category as string,
        condition: condition as string,
        search: search as string,
        sortBy: sortBy as 'price_asc' | 'price_desc' | 'newest',
        featured: featured ? featured === 'true' : undefined
      });

      res.status(200).json({
        success: true,
        count: items.length,
        data: items
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve equipment listings',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  public getById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const item = equipmentStore.getById(id);

      if (!item) {
        res.status(404).json({
          success: false,
          message: `Equipment with ID "${id}" was not found.`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve equipment item',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  public create(req: Request, res: Response): void {
    try {
      const dto: Partial<CreateEquipmentDTO> = req.body;
      const validation = validateCreateEquipment(dto);

      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Validation failed for listing creation.',
          errors: validation.errors
        });
        return;
      }

      const createdItem = equipmentStore.create(dto as CreateEquipmentDTO);

      res.status(201).json({
        success: true,
        message: 'Equipment listing created successfully.',
        data: createdItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create equipment listing',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  public reset(_req: Request, res: Response): void {
    try {
      equipmentStore.reset();
      res.status(200).json({
        success: true,
        message: 'Equipment store reset to seed data.'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to reset equipment store',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}

export const equipmentController = new EquipmentController();
