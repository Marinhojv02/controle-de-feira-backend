import { Request, Response } from "express";
import { HouseProductsRepo } from "../repository/HouseProductRepo";
import { HouseProduct } from "../model/HouseProduct.Model";
import HouseProductUsecase from "../usecases/HouseProduct.Usecase";

class HouseProductController {
  async create(req: Request, res: Response) {
    try {
      await HouseProductUsecase.create(req.body.product_id, req.body.house_id, req.body.quantity_in_stock, req.body.reorder_point, req.body.recommended_quantity) 

      res.status(201).json({
        status: "Created!",
        message: "Successfully created houseProduct!",
      });
    } catch (err) {
        console.log(err)
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const new_houseProduct = await HouseProductUsecase.findById(id) 

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched houseProduct by id!",
        data: new_houseProduct,
      });
    } catch (err) {
        console.log(err)
        res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const new_houseProduct = await HouseProductUsecase.findAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all houseProduct data!",
        data: new_houseProduct,
      });
    } catch (err) {
        console.log(err)
        res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      await HouseProductUsecase.update(id, req.body.product_id, req.body.house_id, req.body.quantity_in_stock, req.body.reorder_point, req.body.recommended_quantity);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated houseProduct data!",
      });
    } catch (err) {
        console.log(err)
        res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async getLowStock(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const lowStockProducts = await HouseProductUsecase.getLowStock(id);
      
      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched houseProduct low stock products!",
        data:lowStockProducts
      });
    } catch (err) {
        console.log(err)
        res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new HouseProductController()