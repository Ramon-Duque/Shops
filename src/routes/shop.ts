import { Request, Router } from "express";

import { Shop } from "../models/shop";
const routes = Router();



const shops: Shop[] = [
    { id: 111, name: "Pepper's Pizza", rating: 4.5 },
    { id: 222, name: "Clive's Chives", rating: 3.4 },
    { id: 333, name: "Betty's Brews", rating: 4.3 },
    { id: 444, name: "Sylvester's Shoes", rating: 3.8 },
    { id: 555, name: "Teddy's Tunes", rating: 4.7 }
];

const getId = (req: Request): number => Number.parseInt(req.params.id);

let tempShops = shops



routes.get('/shops', (req, res) => {
    const minRating = parseInt(req.query.minRating as string);

    let tempShops = shops

    if (minRating) {
        tempShops = tempShops.filter((shops) => {
           return shops.rating >= minRating
        })
    }

    res.status(202)
    res.json(tempShops)
})

routes.get('/shops/:id', (req, res) => {
    const id = getId(req);

    const indexOfItem = shops.findIndex((Shop) => Shop.id === id);
    if (indexOfItem >= 0) {
        res.status(200).json(shops[indexOfItem]);
      } else {
        res.status(404)
        res.json({error: `Shop not found: ${id}`})
        
        
      }


})

export default routes;