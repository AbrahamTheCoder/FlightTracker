import { Router } from "express";
import { login } from "../../controllers/user.login.controller";
import { signup } from "../../controllers/user.signup.controller";

const userRoute = Router();
const ROUTE = "/user";

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags: [Users]
 *     summary: Route to sign a user up
 *     description: Only a user can be signed up with email/password combination.
 *     requestBody:
 *      description: The credentials of the parent, phoneNumber is optional
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - isTermsAndConditionsAccepted
 *           properties:
 *             email:
 *               type: string
 *               example: test@example.com
 *             password:
 *               type: string
 *               example: paco.Paco0
 *             isTermsAndConditionsAccepted:
 *               type: boolean
 *               example: true
 *             username:
 *               type: string
 *               example: 'Paco.User'
 *     responses:
 *      '400 already registered email':
 *        description: El correo electrónico ya está registrado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "error"
 *                message:
 *                  type: string
 *                  example: "Este correo electrónico ya está registrado"
 *      '400 terms and conditions':
 *        description: Los Términos y Condiciones no han sido aceptados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "error"
 *                message:
 *                  type: string
 *                  example: "Los Términos y Condiciones no han sido aceptados"
 *      '400 weak password':
 *        description: Contraseña no es lo suficientemente fuerte
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "error"
 *                message:
 *                  type: string
 *                  example: "Contraseña no es lo suficientemente fuerte"
 *      '200':
 *        description: A JSON Web Token (JWT). This JWT has to be stored somewhere in our client. This JWT token allows the user to make authorized-only requests.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiJ9.V2UgbmVlZCB0byBmaW5kIHRoZSBlbWFpbCBmcm9tIHVuZGVmaW5lZCB3aXRoIHBhc3N3b3JkOiB1bmRlZmluZWQgaW4gdGhlIERC.BzMG93H01c6iqAvR2mNDcfFU3_a1oDWYDVXSeNOey-o
 *                isEmailPinSent:
 *                  type: boolean
 *                  example: true
 *                userInfo:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      example: 'test@example.com'
 *                    isEmailVerified:
 *                      type: boolean
 *                      example: false
 *                    username:
 *                      type: string
 *                      example: 'Paco.User'
 */

userRoute.post(`${ROUTE}/signup`, signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [Users]
 *     summary: Route to authenticate a user
 *     description: We use the JWT approach to accomplish this. Our clients should store the JWT on their any local storage.
 *     requestBody:
 *       description: The credentials of the already created user
 *       content:
 *        application/json:
 *          schema:
 *           type: object
 *           required:
 *            - email
 *            - password
 *           properties:
 *             email:
 *               type: string
 *               example: test@example.com
 *             password:
 *               type: string
 *               example: paco.Paco0
 *
 *     responses:
 *      '200':
 *        description: An Jason Web Token (JWT). This JWT has to be stored somewhere in our client. This JWT token allows the user to make authorized-only requests.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiJ9.V2UgbmVlZCB0byBmaW5kIHRoZSBlbWFpbCBmcm9tIHVuZGVmaW5lZCB3aXRoIHBhc3N3b3JkOiB1bmRlZmluZWQgaW4gdGhlIERC.BzMG93H01c6iqAvR2mNDcfFU3_a1oDWYDVXSeNOey-o
 *                userInfo:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      example: 'test@example.com'
 *                    isEmailVerified:
 *                      type: boolean
 *                      example: false
 *                    username:
 *                      type: string
 *                      example: 'Paco.User'
 */
userRoute.post(`${ROUTE}/login`, login);

export default userRoute;
