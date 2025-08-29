import express from 'express';
import {getAllItems,getItemById,createItem,updateItem,deleteItem} from '../controllers/itemsController.js';

const router = express.Router();

// Define routes for item-related endpoints
router.get('/', (req,res)=>{
    res.json({message: 'Items endpoint is working'});
});

router.get('/',getAllItems);
router.get('/:id',getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;