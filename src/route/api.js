import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";

const userRouter = new express.Router();

// User API
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.getUser);
userRouter.patch('/api/users/current', userController.updateUser);
userRouter.delete('/api/users/logout', userController.logout);

// Contact API
userRouter.post('/api/contacts', contactController.createContact);
userRouter.get('/api/contacts/:contactId', contactController.getContact);
userRouter.put('/api/contacts/:contactId', contactController.updateContact);
userRouter.delete('/api/contacts/:contactId', contactController.removeContact);
userRouter.get('/api/contacts', contactController.searchContact);

// Address API
userRouter.post('/api/contacts/:contactId/addresses', addressController.createAddress);
userRouter.get('/api/contacts/:contactId/addresses/:addressId', addressController.getAddress);
userRouter.put('/api/contacts/:contactId/addresses/:addressId', addressController.updateAddress);
userRouter.delete('/api/contacts/:contactId/addresses/:addressId', addressController.removeAddress);
userRouter.get('/api/contacts/:contactId/addresses', addressController.listAddress);

export { userRouter };