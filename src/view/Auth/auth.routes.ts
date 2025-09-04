// routes/auth.routes.ts
import { Router } from 'express';
import AuthController from '../../controller/Auth/auth.controller';


const router = Router();

// Ruta para login (pública)
router.post('/auth/login', AuthController.login);

// Ruta para registro (pública)
router.post('/auth/register', AuthController.register);

// Ruta para refrescar token (pública)
router.post('/auth/refresh', AuthController.refreshToken);

// Ruta para verificar token (pública)
router.get('/auth/verify', AuthController.verifyToken);

router.get('/auth/usuario-actual', AuthController.obtenerUsuarioPorToken);

export default router;