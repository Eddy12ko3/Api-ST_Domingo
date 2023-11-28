import { type Response, type Request } from 'express';
import { authService } from '../services/auth.service';
import { handleHttp } from '../utils/err.handle';

class AuthController {
	private static instance: AuthController;
	public static getInstance(): AuthController {
		if (!AuthController.instance) {
			this.instance = new AuthController();
		}
		return this.instance;
	}

	registerCtrl = async ({ body }: Request, res: Response) => {
		try {
			const { numDocument, password, name, lastname, date_birth, document } = body;
			const responseUser = await authService.registerNewUser({
				numDocument,
				password,
				name,
				lastname,
				date_birth,
				document,
			});
			if (responseUser) {
				res.status(200).json({
					success: 'Registrado correctamente',
				});
			} else {
				res.status(404).json({
					error: 'Error al registrar el usuario',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'Error al registrar el usuario', e.message);
		}
	};

	loginCtrl = async ({ body }: Request, res: Response) => {
		try {
			const { numDocument, password } = body;
			const responseUser = await authService.loginUser({
				numDocument,
				password,
			});
			return res.status(200).json(responseUser);
		} catch (e: any) {
			handleHttp(res, 'Usuario o Contraseña incorrectas', e.message);
		}
	};
}

export const authController = AuthController.getInstance();
